import React from "react";

const TrainingSessionHeader = ({
  description,
  trainingSessionDate,
  setTrainingSessionDate,
  comment,
  setComment,
}) => {
  return (
    <div className="ats-training-session-header">
      <h4>Name: {description}</h4>
      <label>Date:</label>
      <input
        name="date"
        type="date"
        value={trainingSessionDate}
        onChange={setTrainingSessionDate}
      />
      <label>Comment:</label>
      <input name="comment" type="text" value={comment} onChange={setComment} />
    </div>
  );
};

export default TrainingSessionHeader;
