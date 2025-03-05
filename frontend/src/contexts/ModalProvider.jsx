import { React, useState, createContext, useContext } from "react"

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  const openModal = (data = {}) => {
    setModalData(data)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setModalData(null)
  }

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}
