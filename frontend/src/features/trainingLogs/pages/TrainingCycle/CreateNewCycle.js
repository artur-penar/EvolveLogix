import React from "react";
import "./CreateNewCycle.css";

const CreateNewCycle = () => {
  return (
    <div className="new-cycle-container">
      <h4 className="header-container">Create new cycle</h4>
      <div className="form-container">
        <div className="form-group">
          <p>Cycle:</p>
          <select className="form-control">
            {["Macrocycle", "Mesocycle"].map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p>Name:</p>
          <input type="text" min="0" className="form-control"></input>
        </div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default CreateNewCycle;
