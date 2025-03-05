import { React, useState, useMemo } from "react"
import SideBarItem from "./SideBarItem"

const SideBar = ({ allSnippets, activeFilter, setActiveFilter }) => {
  const [openItem, setOpenItem] = useState(null)

  const tags = useMemo(
    () => [...new Set(allSnippets.flatMap((snippet) => snippet.tags))].sort(),
    [allSnippets]
  )

  const languages = useMemo(
    () => [...new Set(allSnippets.map((snippet) => snippet.language))].sort(),
    [allSnippets]
  )

  const collections = useMemo(
    () =>
      [
        ...new Set(allSnippets.flatMap((snippet) => snippet.inCollections)),
      ].sort(),
    [allSnippets]
  )

  const handleFilterChange = (filterType, value) => {
    if (activeFilter?.type === filterType && activeFilter?.value === value) {
      // Clear filter if clicking the same item
      setActiveFilter(null)
    } else {
      // Set new filter
      setActiveFilter({ type: filterType, value })
    }
  }
  return (
    <aside className="fixed left-0 h-full w-56 p-4 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setActiveFilter(null)}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors font-semibold ${
              !activeFilter
                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                : "hover:bg-gray-700/50"
            }`}
          >
            All Snippets
          </button>
        </li>

        <SideBarItem
          title="Tags"
          options={tags}
          filterType="tag"
          isOpen={openItem === "Tags"}
          setOpenItem={setOpenItem}
          onItemClick={handleFilterChange}
          activeFilter={activeFilter}
        />
        <SideBarItem
          title="Languages"
          options={languages}
          filterType="language"
          isOpen={openItem === "Languages"}
          setOpenItem={setOpenItem}
          onItemClick={handleFilterChange}
          activeFilter={activeFilter}
        />
        <SideBarItem
          title="Collections"
          options={collections}
          filterType="collection"
          isOpen={openItem === "Collections"}
          setOpenItem={setOpenItem}
          onItemClick={handleFilterChange}
          activeFilter={activeFilter}
        />
      </ul>
    </aside>
  )
}

export default SideBar
