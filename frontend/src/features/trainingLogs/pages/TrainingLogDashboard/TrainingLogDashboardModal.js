import React, { useState } from "react";
import Modal from "react-modal";
import "./TrainingLogDashboardModal.css";

Modal.setAppElement("#root");

const TrainingLogDashboardModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Details"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button>View</button>
      <button>Edit</button>
      <button>Delete</button>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default TrainingLogDashboardModal;
