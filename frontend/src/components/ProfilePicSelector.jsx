import React from "react"

const ProfilePicSelector = ({ selected, onSelect }) => {
  const images = Array.from({ length: 8 }, (_, i) => `${i + 1}.png`)

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
      {images.map((img) => (
        <button
          key={img}
          onClick={() => onSelect(img)}
          className={`relative aspect-square rounded-full overflow-hidden border-2 ${
            selected === img
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
      ))}
    </div>
  )
}

export default ProfilePicSelector