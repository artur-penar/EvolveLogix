import { getExercises } from "features/trainingLogs/exercises";
import { selectExercises } from "features/trainingLogs/selectors";
import { useDispatch, useSelector } from "react-redux";

export const useFetchExercises = () => {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);

  if (!exercises.length) {
    dispatch(getExercises());
  }
  return exercises;
};
