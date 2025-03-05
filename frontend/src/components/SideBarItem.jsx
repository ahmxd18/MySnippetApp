import { React } from "react"

const SideBarItem = ({
  title,
  options,
  filterType,
  isOpen,
  setOpenItem,
  onItemClick,
  activeFilter,
}) => {
  return (
    <li className="border-b border-gray-700/30 pb-2">
      <button
        onClick={() => setOpenItem(isOpen ? null : title)}
        className="w-full px-4 py-3 text-left rounded-lg hover:bg-gray-700/50 transition-colors flex justify-between items-center"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-1 animate-fade-in-up overflow-y-auto max-h-40 scrollbar-hide">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onItemClick(filterType, option)}
              className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all ${
                activeFilter?.type === filterType &&
                activeFilter?.value === option
                  ? "bg-gradient-to-r from-purple-600 to-blue-600"
                  : "hover:bg-gray-700/30"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </li>
  )
}
export default SideBarItem
