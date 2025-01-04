import React from "react"

const Card = ({ title, description }) => {
  return (
    <div className="bg-secondary shadow-lg rounded-lg p-6 border border-border hover:shadow-xl cursor-pointer hover:bg-border transform hover:scale-105 transition-all duration-300">
      <div>
        <h2 className="font-heading text-xl font-bold text-text mb-2">
          {title}
        </h2>
      </div>
      <div>
        <p className="font-body text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default Card
