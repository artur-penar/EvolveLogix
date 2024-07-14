import { useEffect, useState } from "react"; // Step 1
import { useDispatch, useSelector } from "react-redux";
import { getTrainingCycles, updateUpdateTrigger } from "../trainingCycle";

export const useTrainingCycle = () => {
  const dispatch = useDispatch();
  const trainingCycleState = useSelector(
    (state) => state.trainingCycle.trainingCycles
  );
  const updateTriggerState = useSelector(
    (state) => state.trainingCycle.updateTrigger
  );

  const [localTrainingCycleState, setLocalTrainingCycleState] =
    useState(trainingCycleState); // Step 2

  useEffect(() => {
    console.log("updateTrigger triggered");
    dispatch(getTrainingCycles());
  }, [updateTriggerState]);

  useEffect(() => {
    // Step 3
    setLocalTrainingCycleState(trainingCycleState);
  }, [trainingCycleState]);

  return localTrainingCycleState; // Step 5
};
