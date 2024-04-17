import React from "react";
import "./CreateNewCycle.css";

const CreateNewCycle = () => {
  return (
    <div className="new-cycle-container">
      <h4 className="header-container">Create new cycle</h4>
      <div className="cycle-form-container">
        <div className="cycle-form-group">
          <label for="cycle">Cycle:</label>
          <select id="cycle" className="cycle-form-control">
            {["Macrocycle", "Mesocycle"].map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="cycle-form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            className="cycle-form-control"
          ></input>
        </div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default CreateNewCycle;
