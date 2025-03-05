import { toast } from "react-toastify"

const successToast = (message) => {
  toast.success(message, {
    position: "top-right",
    className:
      "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg shadow-purple-500/10",
    bodyClassName: "text-gray-100 font-medium",
    progressClassName: "bg-gradient-to-r from-purple-500 to-blue-500",
  })
}

const errorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    className:
      "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg shadow-purple-500/10",
    bodyClassName: "text-gray-100 font-medium",
    progressClassName: "bg-gradient-to-r from-purple-500 to-blue-500",
  })
}

const infoToast = (message) => {
  toast.info(message, {
    position: "top-right",
    className:
      "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg shadow-purple-500/10",
    bodyClassName: "text-gray-100 font-medium",
    progressClassName: "bg-gradient-to-r from-purple-500 to-blue-500",
  })
}

export { successToast, errorToast, infoToast }
