import axios from "axios"
import { React, useState, useEffect, useMemo, useRef } from "react"
import { useAuth } from "../contexts/AuthProvider"
import SnippetCard from "../components/SnippetCard"
import SideBar from "../components/SideBar"
import { useNavigate } from "react-router-dom"
import { successToast, errorToast } from "../utils/toast"

const Snippets = () => {
  const navigate = useNavigate()
  const [allSnippets, setAllSnippets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState(null)
  const [sortConfig, setSortConfig] = useState({
    field: "createdOn",
    direction: "desc",
  })
  const [showSortMenu, setShowSortMenu] = useState(false)
  const sortRef = useRef(null)
  const { user } = useAuth()

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

  const handleDeleteSnippet = async (snippetID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this snippet? This action cannot be undone."
    )

    if (!confirmDelete) return
    try {
      const response = await axios.post(
        "http://localhost:5000/deleteSnippet",
        { snippetID },
        { withCredentials: true }
      )
      if (response.data.success) {
        setAllSnippets((prev) =>
          prev.filter((snippet) => snippet._id !== snippetID)
        )
        navigate("/snippets", { replace: true })
        successToast("Snippet Deleted Successfully")
      }
    } catch (error) {
      errorToast("Failed To Delete Snippet")
      console.error("Error deleting snippet", error)
    }
  }

  const handleEditSnippet = (snippetData) => {
    navigate("/snippet/details", {
      state: { snippet: snippetData, editMode: true },
    })
  }

  const handleShareSnippet = (snippetID) => {
    alert(`Share snippet with ID: ${snippetID}`)
  }

  const collections = useMemo(() => {
    const uniqueCollections = new Set(
      allSnippets.flatMap((s) => s.inCollections || [])
    )
    return [...uniqueCollections].sort()
  }, [allSnippets])

  const filteredSnippets = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim()
    let filtered = allSnippets

    if (activeFilter) {
      filtered = filtered.filter((snippet) => {
        switch (activeFilter.type) {
          case "tag":
            return snippet.tags.includes(activeFilter.value)
          case "language":
            return snippet.language === activeFilter.value
          case "collection":
            return snippet.inCollections.includes(activeFilter.value)
          default:
            return true
        }
      })
    }

    if (lowerQuery) {
      filtered = filtered.filter((snippet) => {
        const searchFields = [
          snippet.title,
          snippet.language,
          snippet.content,
          ...snippet.tags,
          ...snippet.inCollections,
        ]
          .join(" ")
          .toLowerCase()
        return searchFields.includes(lowerQuery)
      })
    }

    return filtered
  }, [allSnippets, activeFilter, searchQuery])

  const sortedSnippets = useMemo(() => {
    if (!sortConfig) return filteredSnippets

    return [...filteredSnippets].sort((a, b) => {
      let valueA, valueB
      switch (sortConfig.field) {
        case "title":
          valueA = a.title.toLowerCase()
          valueB = b.title.toLowerCase()
          break
        case "createdOn":
        case "lastEditedOn":
          valueA = new Date(a[sortConfig.field])
          valueB = new Date(b[sortConfig.field])
          break
        case "language":
          valueA = a.language.toLowerCase()
          valueB = b.language.toLowerCase()
          break
        default:
          valueA = a[sortConfig.field]
          valueB = b[sortConfig.field]
      }

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredSnippets, sortConfig])

  useEffect(() => {
    if (user) getSnippets()
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortMenu(false)
      }
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") setShowSortMenu(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div className="flex justify-center min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <SideBar
        allSnippets={allSnippets}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="ml-56 pt-8 px-8 w-full relative z-10">
        {/* Action Bar */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold 
            hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:shadow-purple-500/30"
            onClick={() =>
              navigate("/snippet/details", {
                state: { snippet: null, editMode: true },
              })
            }
          >
            ✨ Create New Snippet
          </button>

          {/* Search Input */}
          <div className="flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 
              backdrop-blur-sm placeholder-gray-400"
            />
          </div>

          {/* Sort Controls */}
          <div ref={sortRef} className="flex items-center gap-2">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-all flex items-center gap-2"
                onClick={() => setShowSortMenu(!showSortMenu)}
                onMouseEnter={() => setShowSortMenu(true)}
                onMouseLeave={() => setShowSortMenu(false)}
              >
                <span>Sort by: {sortConfig.field}</span>
                <span
                  className={`transition-transform ${
                    showSortMenu ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showSortMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-purple-500/10 z-20"
                  onMouseEnter={() => setShowSortMenu(true)}
                  onMouseLeave={() => setShowSortMenu(false)}
                >
                  <div className="p-2 space-y-1">
                    {["title", "createdOn", "lastEditedOn", "language"].map(
                      (field) => (
                        <button
                          key={field}
                          onClick={() => {
                            setSortConfig((prev) => ({ ...prev, field }))
                            setShowSortMenu(false)
                          }}
                          className={`w-full px-4 py-2 text-left rounded-lg ${
                            sortConfig.field === field
                              ? "bg-purple-500/20"
                              : "hover:bg-gray-700/50"
                          }`}
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() =>
                setSortConfig((prev) => ({
                  ...prev,
                  direction: prev.direction === "asc" ? "desc" : "asc",
                }))
              }
              className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-all"
            >
              {sortConfig.direction === "asc" ? "↑ ASC" : "↓ DESC"}
            </button>
          </div>
        </div>
        {/* </div> */}

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {isLoading ? (
            <div className="col-span-full text-center py-24 animate-pulse">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-2xl">
                Loading Snippets...
              </span>
            </div>
          ) : sortedSnippets.length > 0 ? (
            sortedSnippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                options={{
                  handleEditSnippet,
                  handleDeleteSnippet,
                  handleShareSnippet,
                }}
                collections={collections}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-2xl">
                No Snippets Found
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Snippets
