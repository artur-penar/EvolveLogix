import { useEffect } from "react";
import { updateTrainingDays } from "../../utils/updatePhaseDetails";

const useUpdateSessionsNumber = (
  initialPhaseProgram,
  setPhaseTrainingProgram,
  totalTrainingSessionsNumber,
  setStateChanged,
  stateChanged
) => {
  useEffect(() => {
    const initialExercises = JSON.parse(
      JSON.stringify(initialPhaseProgram[0].exercises)
    );
    setPhaseTrainingProgram((prevState) =>
      updateTrainingDays(
        prevState,
        totalTrainingSessionsNumber,
        initialExercises
      )
    );
    setStateChanged(stateChanged + 1);
  }, [totalTrainingSessionsNumber]);
};

export default useUpdateSessionsNumber;
