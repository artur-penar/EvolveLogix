import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingCycles } from "../trainingCycle";

export const useTrainingCycle = () => {
  const dispatch = useDispatch();
  const trainingCycleState = useSelector(
    (state) => state.trainingCycle.trainingCycles
  );

  useEffect(() => {
    if (trainingCycleState.length === 0) dispatch(getTrainingCycles());
  }, []);

  return trainingCycleState;
};
