import React from "react";

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
    <div className="ats-training-session-header">
      <label>Training tag</label>
      <select
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
      <label>Date:</label>
      <input
        name="date"
        type="date"
        value={trainingSessionDate}
        onChange={handleTrainingDataChange}
      />
      <label>Comment:</label>
      <input name="comment" type="text" value={comment} onChange={setComment} />
    </div>
  );
};

export default TrainingSessionHeader;
