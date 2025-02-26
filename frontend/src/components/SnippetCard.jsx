import React, { useState } from "react"
import { useAuth } from "../contexts/AuthProvider"
import {
  HiOutlineShare,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineTag,
  HiOutlineUserCircle,
  HiClipboardList,
} from "react-icons/hi"
import axios from "axios"

const SnippetCard = ({ snippet, options, index, collections }) => {
  const { user } = useAuth()
  const [showDropDown, setShowDropDown] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")

  const trimmedContent =
    snippet.content.length > 300
      ? snippet.content.slice(0, 300) + "..."
      : snippet.content

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
      setShowDropDown(false)
      if (response.data.success) {
        console.log("Collection added to snippet")
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

  return (
    <div className="relative group bg-secondary shadow-lg rounded-lg p-2 border border-border hover:shadow-xl cursor-pointer hover:bg-border transform hover:scale-105 transition-all duration-300">
      {/* Title & Meta Info */}
      <div className="mb-1 flex justify-between items-start">
        <div>
          <h2 className="font-heading text-lg font-bold text-text truncate">
            {snippet.title}
          </h2>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
            <span>{snippet.language}</span>
          </div>
        </div>

        {/* Dates & Profile (Hidden Until Hovered) */}
        <div className="text-[10px] text-gray-500 flex flex-col items-end space-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-center w-32 gap-1 ">
            <p>Created:</p>
            <p>{new Date(snippet.createdOn).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-center w-32 gap-0.5">
            <p>Edited:</p>
            <p>{new Date(snippet.lastEditedOn).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-center w-32 gap-1">
            <HiOutlineUserCircle className="text-gray-600 h-4 w-4" />
            <p className="ml-1">{user.slice(0, 5)}</p>
          </div>
        </div>
      </div>

      {/* Snippet Content */}
      <div className="relative flex-grow overflow-hidden h-52 border border-gray-400 rounded p-2 text-gray-700 text-xs bg-white">
        <p className="whitespace-pre-wrap">{trimmedContent}</p>
      </div>

      {/* Shadow effect for content overflow */}
      {snippet.content.length > 300 && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
      )}

      {/* Tags */}
      <div className="flex items-center gap-1 mt-2">
        <HiOutlineTag className="text-gray-500 h-3 w-3" />
        <div className="flex flex-wrap gap-1">
          {snippet.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-1 py-0.5 bg-gray-100 text-black text-[10px] rounded"
            >
              {tag.slice(0, 15)}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="px-1 py-0.5 bg-gray-200 text-gray-600 text-[10px] rounded">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-1 right-1 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="shadow-md bg-secondary rounded-lg flex items-center justify-center p-1 hover:p-2"
          onClick={() => options.handleEditSnippet(index)}
        >
          <HiOutlinePencil className="h-3 w-3 text-gray-700 hover:h-4 hover:w-4 transition-all" />
        </button>
        <button
          className="shadow-md bg-secondary rounded-lg flex items-center justify-center p-1 hover:p-2"
          onClick={() => options.handleDeleteSnippet(index)}
        >
          <HiOutlineTrash className="h-3 w-3 text-red-500 hover:h-4 hover:w-4 transition-all" />
        </button>
        <button
          className="shadow-md bg-secondary rounded-lg flex items-center justify-center p-1 hover:p-2"
          onClick={() => options.handleShareSnippet(index)}
        >
          <HiOutlineShare className="h-3 w-3 text-blue-500 hover:h-4 hover:w-4 transition-all" />
        </button>

        {/* This is the button for Collections */}
        <button
          className="shadow-md bg-secondary rounded-lg flex items-center justify-center p-1 hover:p-2 transition-all"
          onClick={() => setShowDropDown(!showDropDown)}
        >
          <HiClipboardList className="h-3 w-3 text-blue-500 hover:h-4 hover:w-4 transition-all" />
        </button>
        {showDropDown && (
          <div className="absolute -right-10 mt-2 w-48 bg-white border rounded shadow-md p-2">
            {collections.length > 0 ? (
              collections.map((collection, index) => (
                <div
                  key={index}
                  onClick={() => handleAddToCollections(collection)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {collection}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No collections found</div>
            )}
            <div className="mt-2 border-t pt-2">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="New Collection"
                className="w-full p-1 border rounded"
              />
              <button
                onClick={handleCreateAndAddCollection}
                className="mt-1 p-1 bg-green-500 text-white rounded"
              >
                Create & Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SnippetCard
