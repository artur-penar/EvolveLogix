import { useEffect } from "react";

const useDeleteModalState = (deleteMessage, setIsDeleteModalOpen) => {
  useEffect(() => {
    setIsDeleteModalOpen(deleteMessage !== "");
  }, [deleteMessage]);
};

export default useDeleteModalState;
