import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getTrainingCycles());
  }, [updateTriggerState]);

  return trainingCycleState;
};
