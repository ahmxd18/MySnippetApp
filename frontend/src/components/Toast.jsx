import React from "react"
import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg shadow-purple-500/10"
      bodyClassName="text-gray-100 font-medium"
      progressClassName="bg-gradient-to-r from-purple-500 to-blue-500"
      style={{
        width: "auto",
        minWidth: "300px",
        maxWidth: "500px",
      }}
    />
  )
}

export default Toast
