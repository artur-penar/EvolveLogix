import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMesocycle,
  createMacrocycle,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import FormGroup from "./FormGroup";
import "./CreateNewCycle.css";

const CreateNewCycle = ({
  selectedMacrocycle,
  setAddCycleStatus,
  setIsCreateCycleVisible,
}) => {
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
    if (!mesocycleStartDate && cycleType === "Mesocycle") {
      // Check only Mesocycle start date because Macrocycle start date is not required YET
      newWarning.mesocycleStartDate = "Start date required!";
    }
    setWarnings(newWarning);
    return Object.keys(newWarning).length === 0;
  };

  const handleError = (error) => {
    console.log("Handle error:", error);
    if (error.non_field_errors) {
      const newWarning = {};
      newWarning.mesocycleStartDate =
        error.non_field_errors[0] + "Check Mesocycles duration!";
      setWarnings(newWarning);
    }
  };

  const handleSuccess = () => {
    console.log("Success but what to do?");
    setAddCycleStatus("Cycle added successfully");
  };

  const availableCycleOptions = !selectedMacrocycle
    ? ["Macrocycle"]
    : ["Macrocycle", "Mesocycle"];

  const handleNameChange = (e) => {
    setCycleName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setCycleType(e.target.value);
    // Reset warnings
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

  const handleSubmit = async () => {
    try {
      let response;
      if (cycleType === "Macrocycle") {
        response = await dispatch(
          createMacrocycle({
            name: cycleName,
            training_log_id: selectedTrainingLogId,
          })
        ).unwrap();
      } else {
        response = await dispatch(
          addMesocycle({
            name: cycleName,
            macrocycle: selectedMacrocycle,
            start_date: mesocycleStartDate,
            duration: Number(mesocycleDuration) + 1,
          })
        ).unwrap();
      }
      setIsCreateCycleVisible(false);
      dispatch(updateUpdateTrigger());
      handleSuccess();
    } catch (error) {
      handleError(error);
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
        <FormGroup
          id="type"
          label="Cycle"
          type="select"
          value={cycleType}
          options={availableCycleOptions}
          handleChange={handleTypeChange}
        />
        <FormGroup
          id="name"
          label="Name"
          type="text"
          value={cycleName}
          handleChange={handleNameChange}
          inputRef={nameInputRef}
          warning={warnings.cycleName}
        />

        {cycleType === "Mesocycle" && (
          <>
            <FormGroup
              id="start-date"
              label="Start date"
              type="date"
              value={mesocycleStartDate}
              handleChange={handleStartDateChange}
              inputRef={dateInputRef}
              warning={warnings.mesocycleStartDate}
            />

            <FormGroup
              id="duration"
              label="Duration"
              type="select"
              value={mesocycleDuration}
              options={[...Array(12).keys()].map((number, i) => number)}
              handleChange={handleDurationChange}
            />

            <FormGroup
              id="end-date"
              label="End date"
              type="date"
              value={mesocycleEndDate}
              readOnly={true}
            />
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
