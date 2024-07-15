import React, { useState } from "react";
import "./TrainingCycleForm.css";
import CycleSelectGroup from "./components/CycleSelectGroup";
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
      <CycleSelectGroup
        type={"Macrocycle"}
        value={macrocycle}
        options={macrocycles}
        handleInputChange={handleInputChange}
        startDate={macrocycleStartDate}
        endDate={macrocycleEndDate}
      />
      <CycleSelectGroup
        type={"Mesocycle"}
        value={mesocycle}
        options={mesocycles}
        handleInputChange={handleInputChange}
        startDate={mesocycleStartDate}
        endDate={mesocycleEndDate}
        additionalProps={{ mesocycleDurationInWeeks }}
      />
      <div className="tcf-button-container">
        <button className="tcf-button" onClick={handleCreateNewCycleClick}>
          {isCreateCycleVisible ? "Hide" : "Create new cycle"}
        </button>
      </div>
      {isCreateCycleVisible && (
        <CreateNewCycle
          selectedMacrocycle={selectedMacrocycleId}
          setIsCreateCycleVisible={setIsCreateCycleVisible}
        />
      )}
      {/* // Phase selection */}
      <CycleSelectGroup
        type={"Phase"}
        value={phase}
        options={phases}
        handleInputChange={handleInputChange}
        startDate={phaseStartDate}
        endDate={phaseEndDate}
        additionalProps={{
          trainingDays,
          phaseDurationInWeeks,
        }}
      />
      {!phaseEndDate && <p className="tcf-phase-warning">Can't add phase!</p>}
      {/* <div className="tcf-select-group-container">
        <h4>Mesocycle Timeline</h4>
        <CycleTimeline
          mesocycleStartDate={mesocycleStartDate}
          mesocycleEndDate={mesocycleEndDate}
          mesocycleDuration={mesocycleDurationInWeeks}
          phasesData={phasesData}
        />
      </div> */}
    </div>
  );
};

export default TrainingCycleForm;
