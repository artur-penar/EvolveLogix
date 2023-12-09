import React, { useEffect } from "react";

const TrainingLogNameField = ({ logName, setLogName, logNames }) => {
  useEffect(() => {
    setLogName(logNames[0])
  }, [logNames, setLogName]);
  console.log(logName);

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="name">
        Name:
        <select
          className="form-control"
          value={logName}
          onChange={(e) => {
            setLogName(e.target.value);
            console.log(e.target.value);
          }}
        >
          {logNames.map((logNameItem, index) => (
            <option key={index} value={logNameItem}>
              {logNameItem}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TrainingLogNameField;
