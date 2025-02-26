import { React, useState, useMemo } from "react"
import SideBarItem from "./SideBarItem"

const SideBar = ({ allSnippets, selectedFilters, setSelectedFilters }) => {
  const [openItem, setOpenItem] = useState(null)
  const tags = useMemo(() => {
    const uniqueTags = new Set(allSnippets.flatMap((snippet) => snippet.tags))
    return [...uniqueTags].sort()
  }, [allSnippets])

  const languages = useMemo(() => {
    const uniqueLanguages = new Set(
      allSnippets.map(
        (snippet) =>
          // snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)
          snippet.language
      )
    )
    return [...uniqueLanguages].sort()
  }, [allSnippets])

  const collections = useMemo(() => {
    const uniqueCollections = new Set(
      allSnippets.flatMap((snippet) => snippet.inCollections)
    )
    return [...uniqueCollections].sort()
  }, [allSnippets])

  const handleFilterChange = (filterType, value) => {
    if (filterType === "tag") {
      setSelectedFilters({
        tag: filterType === value ? null : value,
        language: null,
        collection: null,
      })
    } else if (filterType === "language") {
      setSelectedFilters({
        tag: null,
        language: filterType === value ? null : value,
        collection: null,
      })
    } else if (filterType === "collection") {
      setSelectedFilters({
        tag: null,
        language: null,
        collection: filterType === value ? null : value,
      })
    }

    // Toggle filter
    // setSelectedFilters((prev) => ({
    //   ...prev,
    //   [filterType]: prev[filterType] === value ? null : value,
    // }))
  }

  return (
    <aside className="fixed left-0 h-full w-56 p-4 bg-yellow-300">
      <ul className="space-y-4">
        <div className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <button
            onClick={() =>
              setSelectedFilters({
                tag: null,
                language: null,
                collection: null,
              })
            }
          >
            All Snippets
          </button>
        </div>
        <SideBarItem
          title="Tags"
          options={tags}
          isOpen={openItem === "Tags"}
          setOpenItem={setOpenItem}
          onItemClick={(tag) => handleFilterChange("tag", tag)}
        />
        <SideBarItem
          title="Languages"
          options={languages}
          isOpen={openItem === "Languages"}
          setOpenItem={setOpenItem}
          onItemClick={(lang) => handleFilterChange("language", lang)}
        />
        <SideBarItem
          title="Collections"
          options={collections}
          isOpen={openItem === "Collections"}
          setOpenItem={setOpenItem}
          onItemClick={(coll) => handleFilterChange("collection", coll)}
        />
        {/* <SideBarItem
          title="Saved"
          isOpen={openItem === "Saved"}
          setOpenItem={setOpenItem}
        /> */}
      </ul>
    </aside>
  )
}

export default SideBar
