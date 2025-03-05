import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineCamera,
} from "react-icons/hi"

const Profile = () => {
  const { user, setUser, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    profilePic: "1.png",
    currentPassword: "",
    newPassword: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showPicSelector, setShowPicSelector] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        name: formData.name,
        profilePic: formData.profilePic,
        userID: user,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      }
      const response = await axios.post(
        "http://localhost:5000/auth/update",
        userData,
        { withCredentials: true }
      )
      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
        }))
        setIsEditing(false)
        setShowPicSelector(false)
      }
    } catch (error) {
      const message = error.response?.data?.msg || "Update failed"
      console.error("Update error:", message)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      )
      if (response.data.success) {
        setUser(null)
        navigate("/login")
      }
    } catch (error) {
      console.error("Logout Failed", error)
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/users/${user}`,
        { withCredentials: true }
      )
      setFormData({
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
        profilePic: response.data.user.profilePic || "1.png",
        currentPassword: "",
        newPassword: "",
      })
    } catch (error) {
      console.error("Error", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePicSelect = (filename) => {
    setFormData({ ...formData, profilePic: filename })
    setShowPicSelector(false)
  }

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login")
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user) fetchUserDetails()
  }, [user])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 max-w-md relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-purple-500/10">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src={`/profile-pics/${formData.profilePic}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowPicSelector(!showPicSelector)}
                    className="absolute bottom-0 right-0 p-2 bg-gray-800/80 rounded-full hover:bg-purple-500/80 transition-colors"
                  >
                    <HiOutlineCamera className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {formData.username}
            </h1>
            {showPicSelector && (
              <div className="mt-4 animate-fade-in-up">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  {Array.from({ length: 8 }, (_, i) => `${i + 1}.png`).map(
                    (img) => (
                      <button
                        key={img}
                        onClick={() => handlePicSelect(img)}
                        className={`relative aspect-square rounded-full overflow-hidden border-2 ${
                          formData.profilePic === img
                            ? "border-purple-400 scale-105"
                            : "border-gray-600 hover:border-purple-300"
                        } transition-all`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                        <img
                          src={`/profile-pics/${img}`}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Edit Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <div className="flex items-center bg-gray-900/20 rounded-lg p-3 border border-gray-700">
                <HiOutlineUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent focus:outline-none text-gray-100"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="flex items-center bg-gray-900/20 rounded-lg p-3 border border-gray-700 opacity-75">
                <HiOutlineMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={formData.email}
                  className="w-full bg-transparent focus:outline-none text-gray-100"
                  disabled
                />
              </div>
            </div>

            {isEditing && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Current Password
                  </label>
                  <div className="flex items-center bg-gray-900/20 rounded-lg p-3 border border-gray-700">
                    <HiOutlineLockClosed className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full bg-transparent focus:outline-none text-gray-100"
                      placeholder="Required for password changes"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    New Password
                  </label>
                  <div className="flex items-center bg-gray-900/20 rounded-lg p-3 border border-gray-700">
                    <HiOutlineLockClosed className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full bg-transparent focus:outline-none text-gray-100"
                      placeholder="Leave blank to keep current"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:scale-105 transition-transform"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:scale-105 transition-transform"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600/50 hover:bg-red-600/70 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
