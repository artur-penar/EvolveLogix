import React from "react";
import "./TrainingSessionHeader.css";

const TrainingSessionHeader = ({
  description,
  trainingSessionDate,
  handleTrainingDataChange,
  comment,
  setComment,
}) => {
  const startCharCode = "A".charCodeAt(0);
  const endCharCode = "G".charCodeAt(0);
  const trainingOptions = [];

  for (let i = startCharCode; i <= endCharCode; i++) {
    trainingOptions.push(`Training ${String.fromCharCode(i)}`);
  }

  return (
    <div className="ats-header-select-container">
      <div className="ats-header-select-group">
        <label className="ats-header-select-label">Tag:</label>
        <select
          className="ats-header-select-control form-control"
          name="description"
          value={description}
          onChange={handleTrainingDataChange}
        >
          {trainingOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="ats-header-select-group">
        <label className="ats-header-select-label">Date:</label>
        <input
          className="ats-header-select-control form-control"
          name="date"
          type="date"
          value={trainingSessionDate}
          onChange={handleTrainingDataChange}
        />
      </div>
      <div className="ats-header-select-group">
        <label className="ats-header-select-label">Comment:</label>
        <textarea
          className="ats-header-select-control form-control"
          name="comment"
          type="text"
          value={comment}
          onChange={setComment}
          placeholder="Add a comment"
        />
      </div>
    </div>
  );
};

export default TrainingSessionHeader;
