import axios from "axios"
import { React, useState, useEffect, useMemo } from "react"
import { useAuth } from "../contexts/AuthProvider"
import { useModal } from "../contexts/ModalProvider"
import SnippetModal from "../components/SnippetModal"
import SnippetCard from "../components/SnippetCard"
import SideBar from "../components/SideBar"

// import { infoToast } from "../utils/toast"
// import { useNavigate } from "react-router-dom"

const Snippets = () => {
  // const navigate = useNavigate()

  const [allSnippets, setAllSnippets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    tag: null,
    language: null,
    collection: null,
  })
  const { user } = useAuth()
  const { isModalOpen, openModal } = useModal()

  const getSnippets = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/getSnippets", {
        user,
      })
      if (response.data.success) {
        setAllSnippets(response.data.allSnippets)
      }
    } catch (error) {
      console.error("Error fetching snippets", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSnippet = async (index) => {
    try {
      const snippetID = allSnippets[allSnippets.length - index - 1]._id
      const response = await axios.post(
        "http://localhost:5000/deleteSnippet",
        { snippetID },
        { withCredentials: true }
      )
      if (response.data.success) {
        setAllSnippets((prev) =>
          prev.filter((snippet) => snippet._id !== snippetID)
        )
      }
    } catch (error) {
      console.log("error aaya")
    }
  }

  const handleEditSnippet = (index) => {
    openModal(allSnippets[allSnippets.length - index - 1])
  }

  const handleShareSnippet = (index) => {
    alert(
      `Share snippet with ID: ${
        allSnippets[allSnippets.length - index - 1]._id
      }`
    )
  }

  const collections = useMemo(() => {
    const uniqueCollections = new Set(
      allSnippets
        .filter((snippet) => snippet.inCollections)
        .flatMap((snippet) => snippet.inCollections)
    )
    return [...uniqueCollections].sort()
  }, [allSnippets])

  const options = {
    handleEditSnippet,
    handleDeleteSnippet,
    handleShareSnippet,
  }

  const handleCreateNew = async () => {
    openModal()
  }

  const handleSearch = () => {
    alert("Search is pressed")
  }

  const handleFilter = () => {
    alert("Filter is pressed")
  }

  const handleGetOne = async (snippetID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getOneSnippet",
        { snippetID },
        { withCredentials: true }
      )
      if (response.data.success) {
        console.log(response.data.snippet)
      }
    } catch (error) {
      console.error(error)
    }
  }

  let filteredSnippets = allSnippets

  if (selectedFilters.tag) {
    filteredSnippets = allSnippets.filter((snippet) =>
      snippet.tags.includes(selectedFilters.tag)
    )
  }
  if (selectedFilters.language) {
    filteredSnippets = allSnippets.filter(
      (snippet) => snippet.language === selectedFilters.language
    )
  }
  if (selectedFilters.collection) {
    filteredSnippets = allSnippets.filter((snippet) =>
      snippet.inCollections.includes(selectedFilters.collection)
    )
  }

  useEffect(() => {
    if (user) getSnippets()
  }, [user, isModalOpen])

  return (
    <div className="flex justify-center">
      <SideBar
        allSnippets={allSnippets}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="ml-56 pt-4">
        <div className="flex flex-wrap justify-center gap-5 ">
          <button
            className="px-6 py-3 bg-border text-text font-medium rounded-md hover:bg-primary hover:text-text transition-all duration-300"
            onClick={handleCreateNew}
          >
            Create New Snippet
          </button>
          <button
            className="px-6 py-3 bg-border text-text font-medium rounded-md hover:bg-primary hover:text-text transition-all duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-6 py-3 bg-border text-text font-medium rounded-md hover:bg-primary hover:text-text transition-all duration-300"
            onClick={handleFilter}
          >
            Filter
          </button>
          <button onClick={() => handleGetOne("67b87ea6f250ca95b893389e")}>
            Get One
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-white">
          {isLoading ? (
            <h1 className="m-48 text-3xl text-center">Loading Snippets...</h1>
          ) : filteredSnippets.length !== 0 ? (
            filteredSnippets
              .toReversed()
              .map((snippet, index) => (
                <SnippetCard
                  key={index}
                  snippet={snippet}
                  options={options}
                  index={index}
                  collections={collections}
                />
              ))
          ) : (
            <h1 className="m-48 text-3xl text-center">
              No Snippets to display
            </h1>
          )}
        </div>
      </div>

      {isModalOpen ? <SnippetModal /> : null}
    </div>
  )
}

export default Snippets
