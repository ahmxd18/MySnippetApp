import React from "react"

const ProfilePage = () => {
  // Sample user data (you will typically fetch this from an API)
  const user = {
    username: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    password: "********", // Never display raw password, this is just for the example
    createdAt: "2022-07-18T12:34:56Z",
    avatar: "🦸‍♂️", // Use an emoji for simplicity, you could replace this with an image or SVG
  }

  // Formatting date
  const formattedDate = new Date(user.createdAt).toLocaleDateString()

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex items-center space-x-4">
        <div className="text-6xl">{user.avatar}</div> {/* Avatar Emoji */}
        <div>
          <h1 className="text-3xl font-semibold">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>
            Email:{" "}
            <span className="font-medium text-gray-900">{user.email}</span>
          </p>
          <p>
            Joined:{" "}
            <span className="font-medium text-gray-900">{formattedDate}</span>
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            readOnly
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* Button to edit profile (optional) */}
      <div className="mt-6 flex justify-center">
        <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
