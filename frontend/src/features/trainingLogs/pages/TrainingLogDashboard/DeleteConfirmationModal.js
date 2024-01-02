import Modal from "react-modal";

Modal.setAppElement("#root");
const DeleteConfirmationModal = ({
  isOpen,
  handleDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Delete Confirmation"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <h2>Are you sure you want to delete this training session?</h2>
        <button
          className="react-modal-button"
          onClick={() => {
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
    </div>
  );
};

export default DeleteConfirmationModal;
