import React, { useState } from "react";
import "./TrainingCycleForm.css";
import DateInput from "./components/DateInput";
import SelectInput from "./components/SelectInput";
import CreateNewCycle from "./CreateNewCycle";
import CycleTimeline from "./CycleTimeline";

const TrainingCycleForm = ({
  macrocycle,
  macrocycleStartDate,
  macrocycleEndDate,
  macrocycles,
  mesocycle,
  mesocycles,
  phase,
  phases,
  phasesData,
  trainingDays,
  mesocycleDurationInWeeks,
  mesocycleStartDate,
  mesocycleEndDate,
  phaseStartDate,
  phaseEndDate,
  phaseDurationInWeeks,
  handleInputChange,
  selectedMacrocycleId,
}) => {
  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);
  const handleCreateNewCycleClick = () => {
    setIsCreateCycleVisible((prevState) => !prevState);
  };
  return (
    <div className="tcf-parent-container">
      <div className="tcf-select-group-container">
        <h4>Macrocycle</h4>
        <div className="tcf-select-container">
          <div className="flex-column">
            <SelectInput
              name="macrocycle"
              label="Name"
              value={macrocycle}
              options={macrocycles}
              handleChange={handleInputChange}
            />
          </div>
          <div className="flex-column">
            <DateInput label="Start date:" value={macrocycleStartDate} />
            <DateInput label="End date:" value={macrocycleEndDate} />
          </div>
        </div>
      </div>
      <div className="tcf-select-group-container">
        <h4>Mesocycle</h4>
        <div className="tcf-select-container">
          <div className="flex-column">
            <SelectInput
              name="mesocycle"
              label="Name"
              value={mesocycle}
              options={mesocycles}
              handleChange={handleInputChange}
            />
            <SelectInput
              name="mesocycleDurationInWeeks"
              label="Duration in weeks"
              value={mesocycleDurationInWeeks}
              options={[...Array(11).keys()]}
              handleChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className="flex-column">
            <DateInput label="Start date:" value={mesocycleStartDate} />
            <DateInput label="End date:" value={mesocycleEndDate} />
          </div>
        </div>
      </div>
      <div className="tcf-button-container">
        <button className="tcf-button" onClick={handleCreateNewCycleClick}>
          {isCreateCycleVisible ? "Hide" : "Create new cycle"}
        </button>
      </div>
      {isCreateCycleVisible && (
        <CreateNewCycle selectedMacrocycle={selectedMacrocycleId} />
      )}
      {/* // Phase selection */}
      <div className="tcf-select-group-container">
        <h4>Phase programming</h4>
        <div className="tcf-select-container" style={{ marginLeft: "2px" }}>
          <div className="flex-column">
            <SelectInput
              name="phase"
              label="Type"
              value={phase}
              options={phases}
              handleChange={handleInputChange}
            />
            <SelectInput
              name="trainingDays"
              label="Training days"
              value={trainingDays}
              options={[...Array(7).keys()].map((n) => n + 1)}
              handleChange={handleInputChange}
            />
          </div>
          <div className="flex-column">
            <SelectInput
              name="phaseDurationInWeeks"
              label="Duration in weeks"
              value={phaseDurationInWeeks}
              options={[...Array(10).keys()].map((n) => n + 1)}
              handleChange={handleInputChange}
            />

            <DateInput
              label="Start date:"
              value={phaseStartDate}
              enable={true}
            />
            <DateInput label="End date:" value={phaseEndDate} enable={true} />
          </div>
        </div>
      </div>
      <div className="tcf-select-group-container">
        <h4>Mesocycle Timeline</h4>
        <CycleTimeline
          mesocycleDuration={mesocycleDurationInWeeks}
          phasesData={phasesData}
        />
      </div>
    </div>
  );
};

export default TrainingCycleForm;
