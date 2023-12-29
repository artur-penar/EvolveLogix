import React, { useEffect } from "react";

const TrainingLogNameField = ({ logName }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="name">
        Name:
        <p>{logName}</p>
      </label>
    </div>
  );
};

export default TrainingLogNameField;
