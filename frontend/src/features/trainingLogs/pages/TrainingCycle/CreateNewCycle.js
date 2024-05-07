import React from "react";
import "./CreateNewCycle.css";

const CreateNewCycle = () => {
  return (
    <div className="cnc-container">
      <h4 className="cnc-header-container">Create new cycle</h4>
      <div className="cnc-form-container">
        <div className="cnc-form-group">
          <label for="cycle">Cycle:</label>
          <select id="cycle" className="form-control">
            {["Macrocycle", "Mesocycle"].map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="cnc-form-group">
          <label for="name">Name:</label>
          <input id="name" type="text" className="form-control"></input>
        </div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default CreateNewCycle;
