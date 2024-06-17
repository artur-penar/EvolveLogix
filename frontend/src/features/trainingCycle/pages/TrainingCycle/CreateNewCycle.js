import React, { useEffect, useState } from "react";
import "./CreateNewCycle.css";
import { useDispatch } from "react-redux";
import {
  addMesocycle,
  createMacrocycle,
} from "features/trainingCycle/trainingCycle";

const CreateNewCycle = ({ selectedMacrocycle }) => {
  const dispatch = useDispatch();
  const [cycleName, setCycleName] = useState("");
  const [cycleType, setCycleType] = useState("Macrocycle");
  const [mesocycleStartDate, setMesocycleStartDate] = useState("");
  const [mesocycleEndDate, setMesocycleEndDate] = useState("");
  const [mesocycleDuration, setMesocycleDuration] = useState(0);

  const handleNameChange = (e) => {
    setCycleName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setCycleType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setMesocycleStartDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    setMesocycleDuration(e.target.value);
  };

  useEffect(() => {
    // Function calculate end date based on start date AND duration in weeks
    // (mesocycleDuration)
    const calculateEndDate = () => {
      const startDate = new Date(mesocycleStartDate);
      const endDate = new Date(
        startDate.getTime() +
          (Number(mesocycleDuration) + 1) * 7 * 24 * 60 * 60 * 1000
      );
      const formattedEndDate = endDate.toISOString().split("T")[0];
      setMesocycleEndDate(formattedEndDate);
    };

    if (mesocycleStartDate && mesocycleDuration) {
      calculateEndDate();
    }
  }, [mesocycleStartDate, mesocycleDuration]);

  const handleSubmit = () => {
    if (cycleType === "Macrocycle") {
      dispatch(createMacrocycle(cycleName));
    } else {
      dispatch(
        addMesocycle({
          name: cycleName,
          macrocycle: selectedMacrocycle,
          start_date: mesocycleStartDate,
          duration: Number(mesocycleDuration) + 1,
        })
      );
    }
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

        {cycleType === "Mesocycle" && (
          <>
            <div className="cnc-form-group">
              <label for="name">Start date:</label>
              <input
                id="name"
                type="date"
                className="form-control"
                value={mesocycleStartDate}
                onChange={handleStartDateChange}
              ></input>
            </div>

            <div className="cnc-form-group">
              <label>Duration: </label>
              <select
                className="form-control"
                value={mesocycleDuration}
                onChange={handleDurationChange}
              >
                {[...Array(12).keys()].map((number, i) => (
                  <option key={i} value={number}>
                    {number + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="cnc-form-group">
              <label for="name">End date:</label>
              <input
                id="name"
                type="date"
                className="form-control"
                value={mesocycleEndDate}
                readOnly
              ></input>
            </div>
            <div
              style={{
                width: "340px",
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
              }}
            >
              <p style={{ color: "#666", lineHeight: "1.5" }}>
                The Mesocycle is related with the currently selected Macrocycle!
              </p>
            </div>
          </>
        )}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateNewCycle;
