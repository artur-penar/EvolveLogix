import React, { useState } from "react";
import CycleSelectGroup from "../Shared/CycleSelectGroup";
import CycleTimeline from "../Shared/CycleTimeline";
import SmallCalendarComponent from "./SmallCalendar";
import PhaseDisplay from "../Shared/PhaseDisplay";
import useAutoClearStatus from "features/trainingCycle/hooks/PhaseForm/useAutoClearStatus";
import CreateMacrocycle from "../CreateNewCycle/CreateMacrocycle";
import CreateMesocycle from "../CreateNewCycle/CreateMesocycle";
import Alert from "@mui/material/Alert";
import "./TrainingCycleForm.css";
import ContainerHeader from "shared/components/ContainerHeader";

const TrainingCycleForm = ({
  cycleFormValues,
  macrocycles,
  mesocycles,
  phases,
  phasesData,
  handleInputChange,
  selectedMacrocycleId,
  macrocyclesData,
}) => {
  const {
    macrocycle,
    macrocycleStartDate,
    macrocycleEndDate,
    mesocycle,
    mesocycleStartDate,
    mesocycleEndDate,
    phase,
    phaseStartDate,
    phaseEndDate,
    trainingDays,
    phaseDurationInWeeks,
    mesocycleDurationInWeeks,
  } = cycleFormValues;

  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);
  const [macrocycleFormVisible, setMacrocycleFormVisible] = useState(true);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isPhaseDetailsVisible, setIsPhaseDetailsVisible] = useState(false);
  const [addCycleStatus, setAddCycleStatus] = useState(null);
  const handleCreateNewCycleClick = () => {
    setIsCreateCycleVisible((prevState) => !prevState);
  };
  const hasMacrocycles = macrocycles.length > 0;
  const hasMesocycles = mesocycles.length > 0;

  const countdown = useAutoClearStatus(addCycleStatus, setAddCycleStatus);
  const mesocycleOptions = [
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
  ];

  const phaseOptions = [
    {
      id: 1,
      label: "Phase Details",
      checked: isPhaseDetailsVisible,
      onChange: () => {
        setIsPhaseDetailsVisible((prevState) => !prevState);
      },
    },
  ];

  return (
    <div className="tcf-parent-container">
      {!hasMacrocycles ? (
        <>
          <p className="tcf-info">No cycles available!</p>
          <CreateMacrocycle
            macrocyclesData={macrocyclesData}
            setMacrocycleFormVisible={setMacrocycleFormVisible}
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
          {macrocycleFormVisible && (
            <CreateMacrocycle
              macrocyclesData={macrocyclesData}
              setMacrocycleFormVisible={setMacrocycleFormVisible}
            />
          )}
          {mesocycle ? (
            <CycleSelectGroup
              type={"Mesocycle"}
              value={mesocycle}
              options={mesocycles}
              handleInputChange={handleInputChange}
              startDate={mesocycleStartDate}
              endDate={mesocycleEndDate}
              handleCreateNewCycleClick={handleCreateNewCycleClick}
              isCreateCycleVisible={isCreateCycleVisible}
              additionalProps={{
                mesocycleDurationInWeeks,
                options: mesocycleOptions,
              }}
            />
          ) : (
            <CreateMesocycle
              selectedMacrocycleId={selectedMacrocycleId}
              setAddCycleStatus={setAddCycleStatus}
              setIsCreateCycleVisible={setIsCreateCycleVisible}
            />
          )}

          {addCycleStatus && (
            <>
              <Alert
                variant="filled"
                severity="success"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem", // Increase font size
                }}
              >
                Mesocycle added successfully{".".repeat(countdown)}
              </Alert>
            </>
          )}

          {isCreateCycleVisible && (
            <CreateMesocycle
              selectedMacrocycleId={selectedMacrocycleId}
              setAddCycleStatus={setAddCycleStatus}
              setIsCreateCycleVisible={setIsCreateCycleVisible}
            />
          )}

          {isTimelineVisible && (
            <div className="tcf-select-group-container">
              <ContainerHeader headerContent={"Mesocycle Timeline"} />
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
              <ContainerHeader headerContent={"Mesocycle Calendar"} />
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
              options: phaseOptions,
            }}
          />
          {isPhaseDetailsVisible &&
            (phasesData.length > 0 ? (
              <PhaseDisplay phasesData={phasesData} />
            ) : (
              <Alert
                variant="filled"
                severity="info"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem", // Increase font size
                }}
              >
                No phases details available
              </Alert>
            ))}
        </>
      )}
    </div>
  );
};

export default TrainingCycleForm;
