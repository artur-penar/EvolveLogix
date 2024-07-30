import React, { useEffect } from "react";
import { getExercises } from "features/trainingLogs/exercises";
import { selectExerciseNames } from "features/trainingLogs/selectors";
import { useDispatch, useSelector } from "react-redux";

const useExerciseNames = () => {
  const dispatch = useDispatch();
  const exerciseNamesList = useSelector(selectExerciseNames);

  useEffect(() => {
    if (!exerciseNamesList.length) {
      dispatch(getExercises());
    }
  }, [exerciseNamesList]);

  return exerciseNamesList;
};
export default useExerciseNames;
