import React from "react";

const TrainingSessionHeader = ({
  description,
  trainingSessionDate,
  comment,
  setComment,
}) => {
  return (
    <div className="ats-training-session-header">
      <h4>Name: {description}</h4>
      <label>Date:</label>
      <input type="date" value={trainingSessionDate} />
      <label>Comment:</label>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default TrainingSessionHeader;
