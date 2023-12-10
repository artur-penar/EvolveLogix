import Modal from "react-modal";

Modal.setAppElement("#root");

const DeleteInfoModal = ({
  isOpen,
  setIsDeleteModalOpen,
  setMainModalIsOpen,
  deleteMessage,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <h2>{deleteMessage}</h2>
        <button
          className="react-modal-button"
          onClick={() => {
            setIsDeleteModalOpen(false);
            setMainModalIsOpen(false);
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default DeleteInfoModal;
