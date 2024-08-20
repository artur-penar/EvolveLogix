import {
  addPhase,
  updateUpdateTrigger,
} from "features/trainingCycle/trainingCycle";
import { useDispatch } from "react-redux";

const useAddPhase = (
  mesocycleId,
  phaseType,
  phaseStartDate,
  phaseEndDate,
  microcyclesNumber,
  phaseTrainingProgram,
  setAddRequestStatus
) => {
  const dispatch = useDispatch();
  // Event handler for adding a phase
  const handleAddPhase = async () => {
    const phaseData = {
      mesocycle: mesocycleId,
      type: phaseType,
      start_date: phaseStartDate,
      end_date_: phaseEndDate,
      duration: microcyclesNumber,
      training_sessions: phaseTrainingProgram,
    };

    const resultAction = await dispatch(addPhase(phaseData));
    if (resultAction.meta.requestStatus === "fulfilled") {
      setAddRequestStatus("Phase added successfully");
    } else if (resultAction.meta.requestStatus === "rejected") {
      const errorPayload = resultAction.payload;
      if (errorPayload && errorPayload.mesocycle) {
        setAddRequestStatus(
          <>
            Adding Phase failed
            <br />
            Mesocycle: {errorPayload.mesocycle[0]}
          </>
        );
      }
    }

    dispatch(updateUpdateTrigger());
  };

  return handleAddPhase;
};

export default useAddPhase;
