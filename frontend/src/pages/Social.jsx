import { motion } from "framer-motion"
import { React, useState, useEffect } from "react"
import SnippetCard from "../components/SnippetCard" // Your existing component
import { HiSearch, HiSortAscending, HiUserCircle } from "react-icons/hi"
import { useAuth } from "../contexts/AuthProvider"
import axios from "axios"
// import { successToast } from "../utils/toast.js"

const Social = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ field: "date", dir: "desc" })
  const { user, isLoading: authLoading } = useAuth()
  const [snippets, setSnippets] = useState([])

  const fetchPublicSnippets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getPublicSnippets",
        {
          params: {
            limit: 12, // Get 12 snippets
            // limit: 3, // Get 3 snippets
            exclude: user, // Exclude current user's snippets
          },
        }
      )
      setSnippets(response.data.snippets)
    } catch (error) {
      console.error("Error fetching random snippets:", error)
    }
  }
  useEffect(() => {
    if (!authLoading) fetchPublicSnippets()
  }, [user, authLoading])

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-float">
            Community Snippets
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
            Explore and share code snippets with developers worldwide
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-xl">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-400 transition-all flex items-center gap-2">
                <HiSortAscending className="text-purple-400" />
                <span>Sort</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Snippets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16"
        >
          {snippets.map((snippet, index) => (
            <motion.div
              key={snippet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SnippetCard
                snippet={snippet}
                options={{
                  handleEditSnippet: null, // Disable edit for public snippets
                  handleDeleteSnippet: null, // Disable delete
                  handleShareSnippet: (id) => alert(`Share: ${id} `),
                  handleCopySnippet: (id) => alert(`Copy: ${id} `),
                }}
                collections={[]}
                // Add author information
                additionalContent={{
                  author: snippet.author,
                  likes: snippet.likes,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {snippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-24"
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-2xl">
              No public snippets found
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Social
