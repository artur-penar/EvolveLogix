import React, { useState } from "react";
import "./TrainingCycleForm.css";
import CycleSelectGroup from "./components/CycleSelectGroup";
import CreateNewCycle from "./CreateNewCycle";
import CycleTimeline from "./CycleTimeline";
import SmallCalendarComponent from "./components/SmallCalendar";
import PhaseDisplay from "./components/PhaseDisplay";

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
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isPhaseDetailsVisible, setIsPhaseDetailsVisible] = useState(false);
  const handleCreateNewCycleClick = () => {
    setIsCreateCycleVisible((prevState) => !prevState);
  };
  const hasCycles = macrocycles.length > 0;

  return (
    <div className="tcf-parent-container">
      {!hasCycles ? (
        <>
          <p className="tcf-phase-info">No cycles available!</p>
          <CreateNewCycle
            selectedMacrocycle={selectedMacrocycleId}
            setIsCreateCycleVisible={setIsCreateCycleVisible}
          />
        </>
      ) : (
        <>
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
            additionalProps={{
              mesocycleDurationInWeeks,
              options: [
                {
                  label: "Timeline",
                  checked: isTimelineVisible,
                  onChange: () => {
                    setIsTimelineVisible((prevState) => !prevState);
                  },
                },
                {
                  label: "Calendar",
                  checked: isCalendarVisible,
                  onChange: () => {
                    setIsCalendarVisible((prevState) => !prevState);
                  },
                },
              ],
            }}
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
          {isTimelineVisible && (
            <div className="tcf-select-group-container">
              <h3>Mesocycle Timeline</h3>
              <CycleTimeline
                mesocycleDuration={mesocycleDurationInWeeks}
                phasesData={phasesData}
              />
            </div>
          )}
          {isCalendarVisible && (
            <div className="tcf-select-group-container">
              <h3>Calendar</h3>
              <SmallCalendarComponent
                mesocycleStartDate={mesocycleStartDate}
                mesocycleEndDate={mesocycleEndDate}
                mesocycleDuration={mesocycleDurationInWeeks}
                phasesData={phasesData}
              />
            </div>
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
              options: [
                {
                  label: "Phase details",
                  checked: isPhaseDetailsVisible,
                  onChange: () => {
                    setIsPhaseDetailsVisible((prevState) => !prevState);
                  },
                },
              ],
            }}
          />
          {isPhaseDetailsVisible && <PhaseDisplay phasesData={phasesData} />}
          {!phaseEndDate && (
            <p className="tcf-phase-warning">Can't add phase!</p>
          )}
        </>
      )}
    </div>
  );
};

export default TrainingCycleForm;
