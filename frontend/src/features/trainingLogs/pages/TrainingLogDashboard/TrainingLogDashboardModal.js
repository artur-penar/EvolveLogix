import React, { useState } from "react";
import Modal from "react-modal";
import "./TrainingLogDashboardModal.css";
import ViewTrainingSessionModal from "./ViewTrainingSessionModal";

Modal.setAppElement("#root");

const TrainingLogDashboardModal = ({
  isOpen,
  closeModal,
  trainingSessionData,
  handleEdit,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
        onRequestClose={closeModal}
        contentLabel="Event Details"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button className="react-modal-button" onClick={handleViewButtonClick}>
          View
        </button>
        <button className="react-modal-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="react-modal-button">Delete</button>
        <button className="react-modal-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
      <ViewTrainingSessionModal
        isOpen={isViewModalOpen}
        selectedTraining={trainingSessionData}
        closeModal={closeViewModal}
      />
    </div>
  );
};

export default TrainingLogDashboardModal;
