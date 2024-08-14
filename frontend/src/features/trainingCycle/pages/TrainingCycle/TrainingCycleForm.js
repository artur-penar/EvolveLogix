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
  const hasMacrocycles = macrocycles.length > 0;
  const hasMesocycles = mesocycles.length > 0;

  return (
    <div className="tcf-parent-container">
      {!hasMacrocycles ? (
        <>
          <p className="tcf-info">No cycles available!</p>
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
                  id: 1,
                  label: "Timeline",
                  checked: isTimelineVisible,
                  onChange: () => {
                    setIsTimelineVisible((prevState) => !prevState);
                  },
                },
                {
                  id: 2,
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
              {hasMesocycles ? (
                <CycleTimeline
                  mesocycleDuration={mesocycleDurationInWeeks}
                  phasesData={phasesData}
                />
              ) : (
                <p className="tcf-info">No mesocycles available</p>
              )}
            </div>
          )}
          {isCalendarVisible && (
            <div className="tcf-select-group-container">
              <h3>Calendar</h3>
              {hasMesocycles ? (
                <SmallCalendarComponent
                  mesocycleStartDate={mesocycleStartDate}
                  mesocycleEndDate={mesocycleEndDate}
                  mesocycleDuration={mesocycleDurationInWeeks}
                  phasesData={phasesData}
                />
              ) : (
                <p className="tcf-info">No mesocycles available</p>
              )}
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
                  id: 1,
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
