import React from "react"

const Card = ({ title, description, options, ind }) => {
  return (
    <div className="relative group bg-secondary shadow-lg rounded-lg p-6 border border-border hover:shadow-xl cursor-pointer hover:bg-border transform hover:scale-105 transition-all duration-300">
      <div>
        <h2 className="font-heading text-xl font-bold text-text mb-2">
          {title}
        </h2>
      </div>
      <div>
        <p className="font-body text-gray-600">{description}</p>
      </div>
      {options && options.length > 0 && (
        <div className="absolute top-0 right-0 flex flex-col space-y-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {options.map(({ icon: Icon, action }, index) => (
            <span
              className="shadow-lg bg-secondary rounded-lg flex items-center justify-center p-1 "
              key={index}
              onClick={() => {
                action(ind)
              }}
            >
              <Icon className="h-3 w-3 text-gray-700 hover:h-6 hover:w-6 transition-all" />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Card
