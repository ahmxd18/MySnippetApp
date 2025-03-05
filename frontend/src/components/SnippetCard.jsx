import React, { useState, useRef, useEffect } from "react"
import {
  HiOutlineShare,
  HiOutlineTrash,
  HiOutlinePencil,
  HiClipboardList,
  HiHeart,
  HiOutlineHeart,
  HiDuplicate,
} from "react-icons/hi"
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { successToast } from "../utils/toast"
// import { successToast } from "../utils/toast"

const SnippetCard = ({ snippet, options, collections }) => {
  const { user } = useAuth()
  const [showDropDown, setShowDropDown] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [likes, setLikes] = useState(snippet.likes?.length || 0)
  const [hasLiked, setHasLiked] = useState(
    user && snippet.likes?.some((like) => like.toString() === user.toString())
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const isOwner = user && snippet.userID === user
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const trimmedContent =
    snippet.content.length > 300
      ? snippet.content.slice(0, 300) + "..."
      : snippet.content

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          setShowDropDown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Like handler
  const handleLike = async () => {
    try {
      setIsAnimating(true)
      const response = await axios.post(
        "http://localhost:5000/likeSnippet",
        {
          snippetID: snippet._id,
          userID: user,
        },
        { withCredentials: true }
      )
      if (response.data.success) {
        setLikes(response.data.likeCount)
        setHasLiked(!hasLiked)
      }
    } catch (error) {
      console.error("Error updating like:", error)
      // Revert UI state if API call fails
      setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
      setHasLiked(!hasLiked)
    } finally {
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  // Copy/Fork handler
  const handleCopySnippet = async (id) => {
    // try {
    //   await axios.post("/api/snippets", {
    //     title: `Copy of ${snippet.title}`,
    //     language: snippet.language,
    //     content: snippet.content,
    //     userId: user._id,
    //   })
    // } catch (error) {
    //   console.error("Error copying snippet:", error)
    // }
    alert(`Copy ${id}`)
  }

  // Existing collection handlers...
  const handleAddToCollections = async (collectionName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addSnippetToCollection",
        {
          userID: user,
          snippetID: snippet._id,
          collectionName,
        }
      )
      if (response.data.success) {
        setShowDropDown(false)
      }
    } catch (error) {
      console.error("Error adding to collection", error)
    }
  }

  const handleCreateAndAddCollection = async () => {
    if (!newCollectionName.trim()) return
    if (collections.includes(newCollectionName)) {
      alert("Collection already exists.")
      return
    }
    await handleAddToCollections(newCollectionName)
    setNewCollectionName("")
  }

  const filteredCollections = collections.filter((collection) =>
    collection.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSnippetClick = () => {
    navigate(`/snippet/details`, { state: { snippet } })
  }

  return (
    <div className="relative group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up">
      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        {/* Like Button */}
        {!isOwner && (
          <div className="relative">
            <motion.div
              className="flex items-center gap-1"
              animate={{ scale: isAnimating ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <button
                onClick={handleLike}
                className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-pink-500/20 hover:border-pink-400 transition-all duration-200 hover:scale-110"
              >
                {hasLiked ? (
                  <HiHeart className="h-4 w-4 text-pink-500" />
                ) : (
                  <HiOutlineHeart className="h-4 w-4 text-pink-400" />
                )}
              </button>
            </motion.div>
            {likes > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {likes}
              </span>
            )}
          </div>
        )}

        {/* Copy/Fork Button */}
        {options.handleCopySnippet && (
          <button
            onClick={() => options.handleCopySnippet(snippet._id)}
            className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-green-500/20 hover:border-green-400 transition-all duration-200 hover:scale-110"
          >
            <HiDuplicate className="h-4 w-4 text-green-400" />
          </button>
        )}

        {/* Conditional Action Buttons */}
        {options.handleEditSnippet && (
          <button
            className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200 hover:scale-110"
            onClick={() => options.handleEditSnippet(snippet)}
          >
            <HiOutlinePencil className="h-4 w-4 text-purple-400" />
          </button>
        )}

        {options.handleDeleteSnippet && (
          <button
            className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 hover:scale-110"
            onClick={() => options.handleDeleteSnippet(snippet._id)}
          >
            <HiOutlineTrash className="h-4 w-4 text-red-400" />
          </button>
        )}

        {options.handleAddToCollections && (
          <div className="relative">
            <button
              ref={buttonRef}
              className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 hover:scale-110 relative"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <HiClipboardList className="h-4 w-4 text-blue-400" />
              {snippet.inCollections?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                  {snippet.inCollections.length}
                </span>
              )}
            </button>

            {showDropDown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-purple-500/10 animate-fade-in-up z-20"
              >
                <div className="p-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                  <input
                    type="text"
                    placeholder="Search collections..."
                    className="w-full px-3 py-2 mb-2 bg-gray-900/20 border border-gray-700 rounded-lg text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {filteredCollections.length > 0 ? (
                    filteredCollections.map((collection) => (
                      <div
                        key={collection}
                        onClick={() => handleAddToCollections(collection)}
                        className={`p-2 text-sm rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                          snippet.inCollections.includes(collection)
                            ? "bg-purple-500/20 border border-purple-400/50"
                            : "hover:bg-gray-700/50"
                        }`}
                      >
                        <span>{collection}</span>
                        {snippet.inCollections.includes(collection) && (
                          <span className="text-purple-400">✓</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-400">
                      No collections found
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-700 p-2 space-y-2">
                  <div className="text-xs text-gray-400 font-medium">
                    Create New Collection
                  </div>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Collection name"
                    className="w-full px-3 py-2 bg-gray-900/20 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleCreateAndAddCollection}
                    className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-sm rounded-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <span>Create & Add</span>
                    <HiClipboardList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          className="p-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 hover:scale-110"
          onClick={() => options.handleShareSnippet?.(snippet._id)}
        >
          <HiOutlineShare className="h-4 w-4 text-blue-400" />
        </button>
      </div>

      <div onClick={handleSnippetClick} className="cursor-pointer">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold truncate bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {snippet.title}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-900/50 text-purple-400 text-xs rounded-full">
              {snippet.language}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(snippet.createdOn).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Content Preview */}
        <div className="relative h-40 overflow-hidden rounded-lg border border-gray-700 bg-gray-900/30">
          <pre className="p-3 text-sm font-mono text-gray-300 overflow-auto">
            <code>{trimmedContent}</code>
          </pre>
          {snippet.content.length > 300 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/90 to-transparent" />
          )}
        </div>

        {/* Tags & Additional Content */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          {snippet.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-900/50 text-blue-400 text-xs rounded-full hover:bg-purple-500/20 transition-colors"
            >
              #{tag.slice(0, 12)}
            </span>
          ))}
          {snippet.tags.length > 4 && (
            <span className="px-2 py-1 bg-gray-900/50 text-gray-400 text-xs rounded-full">
              +{snippet.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SnippetCard
