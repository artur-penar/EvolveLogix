import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ViewTrainingSessionModal = ({ isOpen, selectedTraining, closeModal }) => {
  console.log(selectedTraining);
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <h2>View Training Modal</h2>
      {selectedTraining && (
        <>
          <p>Date: {selectedTraining.date}</p>
          <p>Comment: {selectedTraining.comment}</p>
          {selectedTraining.exercises.map((exercise, index) => (
            <React.Fragment key={index}>
              <p>
                Nr: {exercise.order}. {exercise.exercise}
              </p>
              {exercise.sets.map((set, index) => (
                <p key={index}>
                  {set.set_number}. {set.weight} x {set.repetitions}
                </p>
              ))}
            </React.Fragment>
          ))}
        </>
      )}
      <button className="react-modal-button" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default ViewTrainingSessionModal;
