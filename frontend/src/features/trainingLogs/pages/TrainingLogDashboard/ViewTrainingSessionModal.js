import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ViewTrainingSessionModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <h2>View Training Modal</h2>
      <button className="react-modal-button" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default ViewTrainingSessionModal;
