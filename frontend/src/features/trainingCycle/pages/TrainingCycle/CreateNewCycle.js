import React, { useState } from "react";
import "./CreateNewCycle.css";

const CreateNewCycle = () => {
  const [cycleName, setCycleName] = useState("");
  const [cycleType, setCycleType] = useState("Macrocycle");

  const handleNameChange = (e) => {
    setCycleName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setCycleType(e.target.value);
  };

  const handleSubmit = () => {
    console.log(cycleType, cycleName);
  };
  return (
    <div className="cnc-container">
      <h4 className="cnc-header-container">Create new cycle</h4>
      <div className="cnc-form-container">
        <div className="cnc-form-group">
          <label for="cycle">Cycle:</label>
          <select
            id="cycle"
            className="form-control"
            value={cycleType}
            onChange={handleTypeChange}
          >
            {["Macrocycle", "Mesocycle"].map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="cnc-form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={cycleName}
            onChange={handleNameChange}
          ></input>
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateNewCycle;
