import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMesocycle,
  createMacrocycle,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import "./CreateNewCycle.css";

const CreateNewCycle = ({ selectedMacrocycle, setIsCreateCycleVisible }) => {
  const dispatch = useDispatch();
  const [cycleName, setCycleName] = useState("");
  const [cycleType, setCycleType] = useState("Macrocycle");
  const [mesocycleStartDate, setMesocycleStartDate] = useState("");
  const [mesocycleEndDate, setMesocycleEndDate] = useState("");
  const [mesocycleDuration, setMesocycleDuration] = useState(0);
  const [warnings, setWarnings] = useState({});
  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const selectedTrainingLogId = useSelector((state) =>
    state.log.selectedTrainingLog ? state.log.selectedTrainingLog.id : null
  );

  const validateForm = () => {
    const newWarning = {};
    if (!cycleName) {
      newWarning.cycleName = "Name required!";
    }
    if (!mesocycleStartDate) {
      newWarning.mesocycleStartDate = "Start date required!";
    }
    setWarnings(newWarning);
    return Object.keys(newWarning).length === 0;
  };

  const availableCycleOptions = !selectedMacrocycle
    ? ["Macrocycle"]
    : ["Macrocycle", "Mesocycle"];

  const handleNameChange = (e) => {
    setCycleName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setCycleType(e.target.value);
    setWarnings({});
  };

  const handleStartDateChange = (e) => {
    setMesocycleStartDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    setMesocycleDuration(e.target.value);
  };

  useEffect(() => {
    if (warnings.cycleName) {
      nameInputRef.current.focus();
    } else if (warnings.mesocycleStartDate) {
      dateInputRef.current.focus();
    }
  }, [warnings]);

  useEffect(() => {
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
      dispatch(
        createMacrocycle({
          name: cycleName,
          training_log_id: selectedTrainingLogId,
        })
      );
    } else {
      dispatch(
        addMesocycle({
          name: cycleName,
          macrocycle: selectedMacrocycle,
          start_date: mesocycleStartDate,
          duration: Number(mesocycleDuration) + 1,
        })
      );
      setIsCreateCycleVisible(false);
      dispatch(updateUpdateTrigger());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <div className="cnc-container">
      <h4 className="cnc-header-container">Create new cycle</h4>
      <div className="cnc-form-container">
        <div className="cnc-form-group">
          <div className="cnc-form-group-row">
            <label htmlFor="cycle">Cycle:</label>
            <select
              id="cycle"
              className="form-control"
              value={cycleType}
              onChange={handleTypeChange}
            >
              {availableCycleOptions.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="cnc-form-group">
          <div className="cnc-form-group-row">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              ref={nameInputRef}
              className="form-control"
              value={cycleName}
              onChange={handleNameChange}
            ></input>
          </div>
          {warnings.cycleName && (
            <p className="warning-message">{warnings.cycleName}</p>
          )}
        </div>

        {cycleType === "Mesocycle" && (
          <>
            <div className="cnc-form-group">
              <div className="cnc-form-group-row">
                <label htmlFor="name">Start date:</label>
                <input
                  id="name"
                  type="date"
                  ref={dateInputRef}
                  className="form-control"
                  value={mesocycleStartDate}
                  onChange={handleStartDateChange}
                ></input>
              </div>
              {warnings.mesocycleStartDate && (
                <p className="warning-message">{warnings.mesocycleStartDate}</p>
              )}
            </div>

            <div className="cnc-form-group">
              <div className="cnc-form-group-row">
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
            </div>
            <div className="cnc-form-group">
              <div className="cnc-form-group-row">
                <label htmlFor="name">End date:</label>
                <input
                  id="name"
                  type="date"
                  className="form-control"
                  value={mesocycleEndDate}
                  readOnly
                ></input>
              </div>
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

      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateNewCycle;
