import React, { useState } from "react";
import Modal from "react-modal";
import ViewTrainingSessionModal from "./ViewTrainingSessionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "./TrainingLogDashboardModal.css";

Modal.setAppElement("#root");

const TrainingLogDashboardModal = ({
  isOpen,
  trainingSessionData,
  handleEdit,
  handleDelete,
  setMainModalIsOpen,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTrainingSessionComplete, setIsTrainingSessionComplete] =
    useState(false);

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleViewButtonClick = () => {
    setIsViewModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Event Details"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          className="react-modal-button"
          onClick={() =>
            setIsTrainingSessionComplete(!isTrainingSessionComplete)
          }
        >
          Mark as {isTrainingSessionComplete ? "Incomplete" : "Complete"}
        </button>
        <button className="react-modal-button" onClick={handleViewButtonClick}>
          View
        </button>
        <button className="react-modal-button" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="react-modal-button"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
        <button
          className="react-modal-button"
          onClick={() => setMainModalIsOpen(false)}
        >
          Close
        </button>
      </Modal>
      <ViewTrainingSessionModal
        isOpen={isViewModalOpen}
        selectedTraining={trainingSessionData}
        closeModal={closeViewModal}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TrainingLogDashboardModal;
