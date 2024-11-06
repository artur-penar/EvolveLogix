import Modal from "react-modal";

Modal.setAppElement("#root");

const DeleteInfoModal = ({ isOpen, deleteMessage, setDeleteMessage }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Delete Confirmation"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <h2 style={{ textAlign: "center" }}>{deleteMessage}</h2>
        <button
          className="react-modal-button"
          onClick={() => setDeleteMessage("")}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default DeleteInfoModal;
