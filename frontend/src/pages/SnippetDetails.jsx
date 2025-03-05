import { React, useEffect, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import {
  HiOutlineShare,
  HiOutlineTrash,
  HiOutlinePencil,
  HiDuplicate,
  HiSave,
  HiX,
  HiHeart,
  HiOutlineHeart,
  HiOutlineUsers,
} from "react-icons/hi"
import { useAuth } from "../contexts/AuthProvider"
import axios from "axios"
import { motion } from "framer-motion"
import { successToast, errorToast } from "../utils/toast"

const SnippetDetails = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const snippet = location.state?.snippet
  const isNewSnippet = !location.state?.snippet

  const [isEditing, setIsEditing] = useState(location.state?.editMode || false)
  const [editedTitle, setEditedTitle] = useState(snippet?.title || "")
  const [editedContent, setEditedContent] = useState(snippet?.content || "")
  const [editedTags, setEditedTags] = useState(snippet?.tags || [])
  const [editedIsPublic, setEditedIsPublic] = useState(
    snippet?.isPublic || false
  )
  const [editedLanguage, setEditedLanguage] = useState(
    snippet?.language || "javascript"
  )
  const [isSaving, setIsSaving] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [likedByUsers, setLikedByUsers] = useState([])
  const [likes, setLikes] = useState(snippet?.likes?.length || 0)
  const [hasLiked, setHasLiked] = useState(
    !!user && snippet?.likes?.some((id) => id.toString() === user.toString())
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [showLikedBy, setShowLikedBy] = useState(false)

  const [name, setName] = useState("Unknown")
  const [username, setUsername] = useState("user")
  const [profilePic, setProfilePic] = useState("default.png")

  const checkOwnership = useCallback(() => {
    setIsOwner(!!(user && snippet?.userID === user))
  }, [user, snippet])

  const handleLike = async () => {
    if (!user) return
    try {
      setIsAnimating(true)
      const response = await axios.post(
        "http://localhost:5000/likeSnippet",
        {
          snippetID: snippet?._id,
          userID: user,
        },
        { withCredentials: true }
      )
      if (response.data.success) {
        setLikes(response.data.likeCount)
        setHasLiked((prev) => !prev)
      }
    } catch (error) {
      console.error("Error updating like:", error)
      setHasLiked((prev) => !prev)
      setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
    } finally {
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handleTagsInput = (e) => {
    const inputValue = e.target.value.trim()
    if ((e.key === "Enter" || e.key === " ") && inputValue) {
      if (!editedTags.includes(inputValue)) {
        setEditedTags((prev) => [...prev, inputValue])
      }
      setNewTag("")
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setEditedTags(editedTags.filter((tag) => tag !== tagToRemove))
  }

  const getLikedByUsers = async () => {
    if (!isOwner || !snippet?.likes?.length) return
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/getLikedByUsers",
        {
          params: { userIDs: snippet?.likes.join(",") },
          withCredentials: true,
        }
      )
      if (response.data.success) {
        setLikedByUsers(response.data.likedByUsers)
      }
    } catch (error) {
      console.error("Error fetching liked users:", error)
    }
  }

  const handleSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert("Title and content are required")
      return
    }
    setIsSaving(true)
    try {
      const endpoint = isNewSnippet
        ? "http://localhost:5000/createSnippet"
        : "http://localhost:5000/updateSnippet"

      const method = isNewSnippet ? "post" : "put"

      const snippetData = {
        title: editedTitle,
        content: editedContent,
        tags: editedTags,
        isPublic: editedIsPublic,
        language: editedLanguage,
        ...(isNewSnippet && { userID: user }),
      }

      const response = await axios[method](
        endpoint,
        { snippetData, snippetID: snippet?._id },
        { withCredentials: true }
      )

      if (response.data.success) {
        const action = isNewSnippet ? "created" : "updated"
        successToast(`Snippet ${action} successfully`)

        navigate(`/snippet/details`, {
          state: { snippet: response.data.snippet, editMode: false },
          replace: true,
        })
        if (!isNewSnippet) {
          setIsEditing(false)
        }
      }
    } catch (error) {
      console.error("Error saving snippet:", error)
      alert("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    if (isNewSnippet) {
      navigate("/snippets")
      return
    }
    setEditedTitle(snippet?.title || "")
    setEditedContent(snippet?.content || "")
    setEditedTags(snippet?.tags || [])
    setEditedIsPublic(snippet?.isPublic || false)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (isNewSnippet) return
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this snippet? This action cannot be undone."
    )

    if (!confirmDelete) return
    try {
      const snippetID = snippet._id
      const response = await axios.post(
        "http://localhost:5000/deleteSnippet",
        { snippetID },
        { withCredentials: true }
      )
      if (response.data.success) {
        successToast("Snippet Deleted Successfully")
        navigate("/snippets", { replace: true })
      }
    } catch (error) {
      errorToast("Failed To Delete Snippet")
      console.error("Error deleting snippet", error)
    }
  }

  const getSnippetUser = async () => {
    if (!user || isOwner) return
    try {
      const response = await axios.get("http://localhost:5000/snippetUser", {
        params: { userID: snippet?.userID },
        withCredentials: true,
      })

      if (response.data.success) {
        setName(response.data.name || "Unknown")
        setUsername(response.data.username || "user")
        setProfilePic(response.data.profilePic || "default.png")
      }
    } catch (error) {
      console.error("Error fetching user", error)
      setName("Unknown")
      setUsername("user")
      setProfilePic("default.png")
    }
  }

  useEffect(() => {
    const fetchLikedUsers = async () => {
      if (showLikedBy && isOwner && snippet?.likes?.length) {
        try {
          const response = await axios.get(
            "http://localhost:5000/auth/getLikedByUsers",
            {
              params: { userIDs: snippet?.likes.join(",") },
              withCredentials: true,
            }
          )
          if (response.data.success) {
            setLikedByUsers(response.data.likedByUsers)
          }
        } catch (error) {
          console.error("Error fetching liked users:", error)
        }
      }
    }

    fetchLikedUsers()
  }, [showLikedBy, isOwner, snippet?.likes])

  useEffect(() => {
    checkOwnership()
  }, [checkOwnership])

  useEffect(() => {
    if (!snippet && !isNewSnippet) {
      navigate("/snippets", { replace: true })
    }
  }, [snippet, navigate, isNewSnippet])

  useEffect(() => {
    setIsOwner(!!(user && snippet?.userID === user))
  }, [user, snippet])

  useEffect(() => {
    setIsEditing(location.state?.editMode || false)
  }, [location.state])

  useEffect(() => {
    getSnippetUser()
  }, [user, snippet, isOwner])

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="w-full px-8 py-20 relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  autoFocus
                  onChange={(e) =>
                    e.target.value.length <= 100 &&
                    setEditedTitle(e.target.value)
                  }
                  maxLength={100}
                  className="text-2xl font-bold bg-transparent text-white w-full p-2 border-b border-gray-600"
                />
              ) : (
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {editedTitle}
                </h1>
              )}
              <div className="mt-2 flex items-center gap-4">
                {isEditing ? (
                  <select
                    value={editedLanguage}
                    onChange={(e) => setEditedLanguage(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-400 mt-1">{editedLanguage}</p>
                )}
                {isEditing && (
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={editedIsPublic}
                      onChange={(e) => setEditedIsPublic(e.target.checked)}
                      className="rounded text-purple-500"
                    />
                    Public
                  </label>
                )}
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                {!isNewSnippet && !isOwner && (
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{ scale: isAnimating ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <button
                      onClick={handleLike}
                      className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-pink-500/20 hover:border-pink-400 transition-all"
                    >
                      {hasLiked ? (
                        <HiHeart className="h-5 w-5 text-pink-500" />
                      ) : (
                        <HiOutlineHeart className="h-5 w-5 text-pink-400" />
                      )}
                    </button>
                    <span className="text-sm text-pink-400">{likes}</span>
                  </motion.div>
                )}
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 p-2 bg-green-500/20 border border-green-400 rounded-lg hover:bg-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <HiSave className="text-green-400 h-5 w-5" />
                          {isNewSnippet ? "Create" : "Save"}
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 bg-gray-700/50 border border-gray-700 rounded-lg hover:bg-gray-600/50 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {isOwner && (
                      <>
                        <button
                          onClick={() => setShowLikedBy(!showLikedBy)}
                          className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all"
                        >
                          <HiOutlineUsers className="text-purple-400 h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all"
                        >
                          <HiOutlinePencil className="text-purple-400 h-5 w-5" />
                        </button>
                        <button
                          className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-red-500/20 hover:border-red-400 transition-all"
                          onClick={handleDelete}
                        >
                          <HiOutlineTrash className="text-red-400 h-5 w-5" />
                        </button>
                        <button className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all">
                          <HiOutlineShare className="text-blue-400 h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                )}
                {!isOwner && !isNewSnippet && (
                  <button className="p-2 bg-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-green-500/20 hover:border-green-400 transition-all">
                    <HiDuplicate className="text-green-400 h-5 w-5" />
                  </button>
                )}
              </div>
              {!isOwner && (
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400">
                    <img
                      src={`/profile-pics/${profilePic}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-sm text-gray-400">@{username}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showLikedBy && isOwner && (
            <div className="px-6 py-4 border-b border-gray-700">
              <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <h3 className="text-sm font-semibold text-purple-400 mb-2">
                  Liked by ({likes}):
                </h3>
                {likedByUsers.length === 0 ? (
                  <p className="text-gray-400 text-sm">No likes yet</p>
                ) : (
                  <div className="space-y-2">
                    {likedByUsers.map((usr) => (
                      <div
                        key={usr.username} // Ensure this is unique for each user
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400">
                          <img
                            src={`/profile-pics/${usr.profilePic}`}
                            alt={usr.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-white">{usr.name}</p>
                          <p className="text-xs text-gray-400">
                            @{usr.username}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-6">
            <CodeMirror
              value={editedContent}
              extensions={[
                editedLanguage === "javascript" ? javascript() : python(),
              ]}
              theme="dark"
              readOnly={!isEditing}
              onChange={
                isEditing ? (value) => setEditedContent(value) : undefined
              }
              height="calc(100vh - 300px)"
              className="rounded-lg overflow-hidden border border-gray-700 scrollbar-hide"
            />
          </div>

          <div className="p-6 border-t border-gray-700 text-sm text-gray-400 space-y-2">
            {isEditing ? (
              <div>
                <label className="block mb-2">Tags (press Enter to add):</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedTags.map((tag) => (
                    <span
                      key={tag} // Ensure this is unique for each tag
                      className="inline-flex items-center px-2 py-1 bg-gray-700/50 text-purple-400 rounded-full text-xs"
                    >
                      #{tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 hover:text-purple-200"
                      >
                        <HiX className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagsInput}
                  placeholder="Add a new tag"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg"
                />
              </div>
            ) : (
              <p>
                <strong>Tags:</strong>{" "}
                {editedTags.map((tag) => (
                  <span
                    key={tag} // Unique key for each tag
                    className="inline-block px-2 py-1 bg-gray-700/50 text-purple-400 rounded-full text-xs mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </p>
            )}
            {!isNewSnippet && (
              <>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(snippet?.createdOn).toLocaleDateString()}
                </p>
                <p>
                  <strong>Last Edited:</strong>{" "}
                  {new Date(snippet?.lastEditedOn).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SnippetDetails
