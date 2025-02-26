import { React } from "react"

const SideBarItem = ({ title, options, isOpen, setOpenItem, onItemClick }) => {
  const handleClick = () => {
    setOpenItem(isOpen ? null : title)
  }

  return (
    <li className="relative">
      <div
        className="hover:bg-gray-700 p-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <span>{title}</span>
      </div>
      <div
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mt-1 bg-gray-800 text-white rounded-md shadow-md w-full ${isOpen ? 'block' : 'hidden'}">
          {options?.map((option, index) => (
            <li
              key={index}
              onClick={() => onItemClick?.(option)}
              className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default SideBarItem
