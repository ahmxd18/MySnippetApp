import Card from "../components/Card"
import { UserContext } from "../contexts/UserContext"
import { HiPencilAlt, HiTrash, HiShare } from "react-icons/hi"
import { useContext, useEffect } from "react"
import { infoToast } from "../utils/toast"
import { useNavigate } from "react-router-dom"

const Snippets = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleEditSnippet = (index) => {
    alert("Edit is pressed")
  }
  const handleDeleteSnippet = (index) => {
    alert("Delete is pressed")
  }
  const handleShareSnippet = (index) => {
    alert("Share is pressed")
  }

  const options = [
    { icon: HiPencilAlt, action: handleEditSnippet },
    { icon: HiTrash, action: handleDeleteSnippet },
    { icon: HiShare, action: handleShareSnippet },
  ]

  useEffect(() => {
    if (!user?.name) {
      infoToast("Please login to your account")
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center h-full pt-10">
      <aside className="fixed left-0 h-full w-56 p-4 bg-yellow-300 ">
        <div className="flex flex-col space-y-4">
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">
              <span>All Snippets</span>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">
              <span>Collection 1</span>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">
              <span>Collection 2</span>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">
              <span>Collection 3</span>
            </li>
          </ul>
        </div>
      </aside>
      <div className="ml-56 pt-4">
        <h2 className="text-2xl font-heading text-gray-800 mb-3 text-center">
          All Snippets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white">
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              title={`Snippet ${index + 1}`}
              description={`Content of Snippet`}
              options={options}
              ind={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Snippets
