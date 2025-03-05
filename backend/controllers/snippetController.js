import mongoose from "mongoose"
import Snippet from "../models/Snippet.js"
import User from "../models/User.js"

export const createSnippet = async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      isPublic,
      language,
      userID,
      // createdOn,
      // lastEditedOn,
    } = req.body.snippetData

    const newSnippet = new Snippet({
      title,
      content,
      tags,
      isPublic,
      language,
      userID,
      // likes: 0,
      // inCollections: [],
      // createdOn,
      // lastEditedOn,
    })
    await newSnippet.save()
    return res.status(201).json({
      success: true,
      message: "New Snippet Created",
      snippet: newSnippet,
    })
  } catch (error) {
    console.error("Error creating snippet:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateSnippet = async (req, res) => {
  const { title, content, tags, isPublic, language } = req.body.snippetData
  const snippetID = req.body.snippetID
  try {
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      snippetID,
      {
        title,
        content,
        tags,
        isPublic,
        language,
        lastEditedOn: new Date(),
      },
      { new: true }
    )

    if (!updatedSnippet)
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" })
    res.status(200).json({
      success: true,
      message: "Snippet Updated",
      snippet: updatedSnippet,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getSnippets = async (req, res) => {
  const { user } = req.body
  try {
    const allSnippets = await Snippet.find({ userID: user })
    return res
      .status(200)
      .json({ success: true, message: "All Snippets Retrieved", allSnippets })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getOneSnippet = async (req, res) => {
  const { snippetID } = req.body
  try {
    const snippet = await Snippet.findById(snippetID)
    return res
      .status(200)
      .json({ success: true, message: "Snippet Retrieved", snippet })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// export const getSnippetDetails = async (req, res) => {
//   try {
//     const snippet = await Snippet.findById(req.params.id)
//     if (!snippet) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Snippet not found" })
//     }
//     res.status(200).json({ success: true, snippet })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ success: false, message: "Internal server error" })
//   }
// }

export const deleteSnippet = async (req, res) => {
  const { snippetID } = req.body
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(snippetID)
    if (!deletedSnippet) {
      return res
        .status(404)
        .json({ success: false, messgae: "Snippet not found" })
    }
    return res
      .status(200)
      .json({ success: true, message: "Snippet Deleted", deletedSnippet })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const addSnippetToCollection = async (req, res) => {
  const { userID, snippetID, collectionName } = req.body
  if (!userID || !snippetID || !collectionName) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Parameters" })
  }
  try {
    const snippet = await Snippet.findOne({ _id: snippetID, userID })
    if (!snippet) {
      return res
        .status(400)
        .json({ success: false, message: "Snippet not found" })
    }
    if (!snippet.inCollections.includes(collectionName)) {
      snippet.inCollections.push(collectionName)
      await snippet.save()
    }
    res.json({
      success: true,
      message: "Snippet added to collection successfully",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const getPublicSnippets = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const excludeUserID = mongoose.Types.ObjectId.createFromHexString(
      req.query.exclude
    )

    const matchStage = {
      isPublic: true,
      ...(excludeUserID && { userID: { $ne: excludeUserID } }),
    }

    const publicSnippets = await Snippet.aggregate([
      { $match: matchStage },
      { $sample: { size: limit } },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0, // Exclude sensitive fields
          "user.email": 0,
        },
      },
    ])

    res.status(200).json({
      success: true,
      message: "Random public snippets retrieved",
      snippets: publicSnippets,
    })
  } catch (error) {
    console.error("Error", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const toggleSnippetLike = async (req, res) => {
  try {
    const { snippetID, userID } = req.body
    const snippet = await Snippet.findById(snippetID)
    if (!snippet)
      return res
        .status(404)
        .json({ success: false, messgae: "Snippet not found" })
    const userIndex = snippet.likes.indexOf(userID)
    if (userIndex === -1) {
      snippet.likes.push(userID)
    } else {
      snippet.likes.splice(userIndex, 1)
    }
    const updatedSnippet = await snippet.save()
    res.status(200).json({
      success: true,
      likes: updatedSnippet.likes,
      likeCount: updatedSnippet.likes.length,
    })
  } catch (error) {
    console.error("Error", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getSnippetUser = async (req, res) => {
  try {
    const userID = req.query.userID
    const userData = await User.findById(userID).select(
      "name username profilePic"
    )
    if (!userData)
      return res.status(404).json({ success: false, message: "User not Found" })

    if (!userData.name || !userData.username || !userData.profilePic)
      return res.status(404).json({
        success: false,
        message: "User does not have Name or Username or ProfilePic",
      })

    res.status(200).json({
      success: true,
      name: userData.name,
      username: userData.username,
      profilePic: userData.profilePic,
    })
  } catch (error) {
    console.error("Error", error)
    res.status(500).json({ success: false, message: error.message })
  }
}
