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
  const [warnings, setWarnings] = useState({});
  const nameInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const selectedTrainingLogId = useSelector((state) =>
    state.log.selectedTrainingLog ? state.log.selectedTrainingLog.id : null
  );

  const availableCycleOptions = !selectedMacrocycle
    ? ["Macrocycle"]
    : ["Macrocycle", "Mesocycle"];

  const [formState, setFormState] = useState({
    cycleName: "",
    cycleType: "Macrocycle",
    mesocycleStartDate: "",
    mesocycleEndDate: "",
    mesocycleDuration: 0,
  });

  const {
    cycleName,
    cycleType,
    mesocycleStartDate,
    mesocycleEndDate,
    mesocycleDuration,
  } = formState;

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

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
      setFormState({ ...formState, mesocycleEndDate: formattedEndDate });
      console.log("End date:", formattedEndDate);
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
          id="cycleType"
          label="Cycle"
          type="select"
          value={cycleType}
          options={availableCycleOptions}
          handleChange={handleFormChange}
        />
        <FormGroup
          id="cycleName"
          label="Name"
          type="text"
          value={cycleName}
          handleChange={handleFormChange}
          inputRef={nameInputRef}
          warning={warnings.cycleName}
        />

        {cycleType === "Mesocycle" && (
          <>
            <FormGroup
              id="mesocycleStartDate"
              label="Start date"
              type="date"
              value={mesocycleStartDate}
              handleChange={handleFormChange}
              inputRef={dateInputRef}
              warning={warnings.mesocycleStartDate}
            />

            <FormGroup
              id="mesocycleDuration"
              label="Duration"
              type="select"
              value={mesocycleDuration}
              options={[...Array(12).keys()].map((number, i) => number)}
              handleChange={handleFormChange}
            />

            <FormGroup
              id="mesocycleEndDate"
              label="End date"
              type="date"
              value={mesocycleEndDate}
              readOnly={true}
            />
            <div className="cnc-info-container">
              <p>
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
