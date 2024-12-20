import { useEffect } from "react";

/**
 * Custom hook that manages the state of a delete modal based on the delete message.
 *
 * @param {string} deleteMessage - The message that triggers the delete modal. If the message is not empty, the modal will be open.
 * @param {Function} setIsDeleteModalOpen - Function to set the state of the delete modal. Should be a state setter function from useState.
 */
const useDeleteModalState = (deleteMessage, setIsDeleteModalOpen) => {
  useEffect(() => {
    setIsDeleteModalOpen(deleteMessage !== "");
  }, [deleteMessage]);
};

export default useDeleteModalState;
