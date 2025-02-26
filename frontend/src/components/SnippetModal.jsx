import { React, useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import Select from "react-select"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import { useModal } from "../contexts/ModalProvider"
import { useAuth } from "../contexts/AuthProvider"
import axios from "axios"

const SnippetModal = () => {
  const { isModalOpen, closeModal, modalData } = useModal()
  const { user } = useAuth()

  // const [isUpdating, setIsUpdating] = useState(false)
  // if (modalData._id) {
  //   setIsUpdating(true)
  // }

  const isUpdating = Boolean(modalData?._id)

  if (!isModalOpen) {
    return null
  }

  const languageOptions = [
    { value: "javascript", label: "JavaScript", mode: javascript() },
    { value: "python", label: "Python", mode: python() },
  ]
  const [snippetTitle, setSnippetTitle] = useState(modalData.title || "")
  const [snippetContent, setSnippetContent] = useState(modalData.content || "")
  const [isPublic, setIsPublic] = useState(modalData.isPublic || false)
  const [snippetTags, setSnippetTags] = useState(modalData.tags || [])
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions.find(
      (lang) => lang.value === modalData.language || languageOptions[0]
    )
  )

  const handleTagsInput = (e) => {
    const inputValue = e.target.value.trim()
    if ((e.key === "Enter" || e.key === " ") && inputValue) {
      if (!snippetTags.includes(inputValue)) {
        setSnippetTags((prev) => [...prev, inputValue])
      }
      e.target.value = ""
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setSnippetTags(snippetTags.filter((tag) => tag !== tagToRemove))
  }

  const handleVisibilityToggle = () => {
    setIsPublic((prev) => !prev)
  }

  const handleSave = async () => {
    try {
      const snippetData = {
        title: snippetTitle,
        content: snippetContent,
        tags: snippetTags,
        language: selectedLanguage.value,
        isPublic,
        // createdOn: new Date(),
        lastEditedOn: new Date(),
        // userID: user,
      }

      if (!isUpdating) {
        snippetData.createdOn = new Date()
        snippetData.userID = user
      }
      const url = isUpdating
        ? `http://localhost:5000/updateSnippet/${modalData._id}`
        : `http://localhost:5000/createSnippet`

      const method = isUpdating ? "put" : "post"

      const response = await axios[method](
        url,
        { snippetData },
        { withCredentials: true }
      )
      // if (isUpdating) {
      // response = await axios.put(
      //   `http://localhost:5000/updateSnippet/${modalData._id}`,
      //   { snippetData },
      //   { withCredentials: true }
      // )
      // alert("Here gies update api")
      // } else {
      //   snippetData.createdOn = new Date()
      //   response = await axios.post(
      //     "http://localhost:5000/createSnippet",
      //     { snippetData },
      //     { withCredentials: true }
      //   )
      // }
      // console.log(response.data.snippet)
      if (response.data.success) {
        console.log(isUpdating ? "Snippet Updated" : "Snippet Created")
        closeModal()
      }
    } catch (error) {
      console.error(error)
      console.log(
        isUpdating ? "Failed to Update Snippet" : "Failed to create snippet"
      )
    }
  }

  // useEffect(() => {
  //   console.log("hi")
  // }, [closeModal])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-h-[93vh] overflow-y-auto relative">
        <h1 className="text-xl font-bold text-center">
          {modalData.title ? "Update" : "Create"} Snippet
        </h1>
        <button
          onClick={closeModal}
          className="p-1 h-6 w-6 bg-red-500 rounded-full absolute top-2 right-2 text-xs font-bold "
        >
          X
        </button>
        <div className="flex justify-start gap-5 items-center mb-2">
          {/* Title Input */}
          <input
            type="text"
            autoFocus
            placeholder="Snippet Title"
            value={snippetTitle}
            onChange={(e) => setSnippetTitle(e.target.value)}
            className="w-[65%] p-2 font-bold border rounded"
          />

          {/* Language Dropdown */}
          <Select
            placeholder="Select Lang"
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            options={languageOptions}
          />

          <button
            onClick={handleVisibilityToggle}
            className="p-2 rounded-full text-xl bg-gray-200 hover:bg-gray-300 transition-all"
          >
            {isPublic ? <HiOutlineEye /> : <HiOutlineEyeOff />}
          </button>
        </div>

        {/* Code Editor */}
        <CodeMirror
          placeholder="Snippet Content..."
          value={snippetContent}
          onChange={(value) => setSnippetContent(value)}
          extensions={selectedLanguage ? [selectedLanguage.mode] : []}
          className="border rounded mb-3 w-full h-[300px] overflow-scroll "
        />
        <div className="mb-3">
          <input
            type="text"
            onKeyDown={handleTagsInput}
            placeholder="Type a tag and press Enter or Space"
            className="w-full p-2 border rounded"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {snippetTags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(tag)}
                  className="text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2 mt-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isUpdating ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SnippetModal
