import { toast } from "react-toastify"

const successToast = (message) => {
  toast.success(message, { position: "top-right" })
}
const errorToast = (message) => {
  toast.error(message, { position: "top-right" })
}
const infoToast = (message) => {
  toast.info(message, { position: "top-right" })
}

export { successToast, errorToast, infoToast }
