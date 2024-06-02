import React, { useEffect, useState } from "react";
import Layout from "components/shared/Layout";
import PageHeader from "components/shared/PageHeader";
import TrainingCycleForm from "./TrainingCycleForm";
import CreateNewCycle from "./CreateNewCycle";
import PhaseForm from "./PhaseForm";
import "./TrainingCycle.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMacrocycle } from "features/trainingCycle/trainingCycle";
import { useTrainingCycle } from "features/trainingCycle/hooks/useTrainingCycle";
import { useFormControls } from "features/trainingCycle/hooks/useFormControl";

const getMacrocycleNames = (trainingCycles) => {
  return trainingCycles.map((macrocycle) => macrocycle.name);
};

const TrainingCycle = () => {
  const dispatch = useDispatch();
  const trainingCycleState = useTrainingCycle();

  const selectedMacrocycle = useSelector(
    (state) => state.trainingCycle.selectedMacrocycle
  );

  const macrocycles = getMacrocycleNames(trainingCycleState);
  const mesocycles = ["Competition prep", "Off-season", "Transition"];
  const phases = ["Hypertrophy", "Strength", "Peaking", "Deload"];

  const [isCreateCycleVisible, setIsCreateCycleVisible] = useState(false);

  const initialValues = {
    macrocycle: macrocycles[0],
    mesocycle: mesocycles[0],
    phase: phases[0],
    trainingDays: 0,
    phaseDurationInWeeks: 0,
    mesocycleDurationInWeeks: 0,
  };

  const [values, handleInputChange] = useFormControls(initialValues);
  console.log(values);

  useEffect(() => {
    dispatch(setSelectedMacrocycle(values["macrocycle"]));
  }, [values["macrocycle"]]);

  const handleCreateCycleClick = () => {
    setIsCreateCycleVisible(true);
  };

  return (
    <Layout title="EvolveLogix | Training cycle">
      <div className="tc-cycle-content">
        <PageHeader headerContent={"Training Cycle"} />
        <TrainingCycleForm
          macrocycle={values["macrocycle"]}
          macrocycles={macrocycles}
          mesocycle={values["mesocycle"]}
          mesocycles={mesocycles}
          phase={values["phase"]}
          phases={phases}
          trainingDays={values["trainingDays"]}
          phaseDurationInWeeks={values["phaseDurationInWeeks"]}
          mesocycleDurationInWeeks={values["mesocycleDurationInWeeks"]}
          handleMesocycleDurationChange={handleInputChange}
          handleMacrocycleChange={handleInputChange}
          handleMesocycleChange={handleInputChange}
          handlePhaseChange={handleInputChange}
          handleTrainingDaysChange={handleInputChange}
          handlePhaseDurationChange={handleInputChange}
        />
        {/* <CycleTimeline trainingCycle={trainingCycle} /> */}

        {!isCreateCycleVisible && (
          <div className="tc-button-container">
            <button className="tc-button" onClick={handleCreateCycleClick}>
              Create Cycle
            </button>
          </div>
        )}
        {isCreateCycleVisible && <CreateNewCycle />}
        <PhaseForm
          weekNumber={values["phaseDurationInWeeks"]}
          trainingDays={values["trainingDays"]}
        />
      </div>
    </Layout>
  );
};

export default TrainingCycle;
