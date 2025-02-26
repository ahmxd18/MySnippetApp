import Snippet from "../models/Snippet.js"
export const createSnippet = async (req, res) => {
  const {
    title,
    content,
    tags,
    isPublic,
    language,
    createdOn,
    lastEditedOn,
    userID,
  } = req.body.snippetData

  try {
    const newSnippet = new Snippet({
      title,
      content,
      tags,
      isPublic,
      likes: 0,
      inCollections: [],
      language,
      createdOn,
      lastEditedOn,
      userID,
    })
    await newSnippet.save()
    return res.status(201).json({
      success: true,
      message: "New Snippet Created",
      snippet: newSnippet,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateSnippet = async (req, res) => {
  const { title, content, tags, language, isPublic } = req.body.snippetData
  const snippetID = req.params.id
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
