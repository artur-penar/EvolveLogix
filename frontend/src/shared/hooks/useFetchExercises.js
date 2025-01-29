import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "features/trainingLogs/exercises";
import { selectExercises } from "features/trainingLogs/selectors";

export const useFetchExercises = () => {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const [fetchedExercises, setFetchedExercises] = useState(false);

  useEffect(() => {
    if (!fetchedExercises && !exercises.length) {
      dispatch(getExercises());
      setFetchedExercises(true);
    }
  }, [dispatch, exercises, fetchedExercises]);

  return exercises;
};