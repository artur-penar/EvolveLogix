import { useState } from "react";
import Modal from "react-modal";
import DeleteInfoModal from "./DeleteInfoModal";

Modal.setAppElement("#root");
const DeleteConfirmationModal = ({
  isOpen,
  handleDelete,
  setIsDeleteModalOpen,
  setMainModalIsOpen,
  deleteMessage,
}) => {
  const [isDeleteInfoModalOpen, setIsDeleteInfoModalOpen] = useState(false);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <h2>Are you sure you want to delete this training session?</h2>
        <button
          className="react-modal-button"
          onClick={() => {
            setIsDeleteInfoModalOpen(true);
            setIsDeleteModalOpen(false);
            handleDelete();
          }}
        >
          Delete
        </button>
        <button
          className="react-modal-button"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>
      <DeleteInfoModal
        isOpen={isDeleteInfoModalOpen}
        setIsDeleteModalOpen={setIsDeleteInfoModalOpen}
        deleteMessage={deleteMessage}
        setMainModalIsOpen={setMainModalIsOpen}
      />
    </div>
  );
};

export default DeleteConfirmationModal;
