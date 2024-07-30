import React, { useEffect } from "react";
import { updateTrainingWeeks } from "features/trainingCycle/utils/updatePhaseDetails";

const useUpdateMicrocyclesNumber = (
  stateChanged,
  setPhaseTrainingProgram,
  initialPhaseProgram,
  totalMicrocyclesNumber
) => {
  useEffect(() => {
    const newMicrocycleLoad =
      initialPhaseProgram[0].exercises[0].microcycles[0];
    setPhaseTrainingProgram((prevState) =>
      updateTrainingWeeks(prevState, totalMicrocyclesNumber, newMicrocycleLoad)
    );
  }, [totalMicrocyclesNumber, stateChanged]);
};

export default useUpdateMicrocyclesNumber;
