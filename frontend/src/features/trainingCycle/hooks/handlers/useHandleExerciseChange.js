import React from "react";

const useHandleExerciseChange = (setPhaseTrainingProgram) => {
  const handleExerciseChange = (
    trainingSessionIndex,
    exerciseIndex,
    newExerciseName
  ) => {
    console.log("trainingSessionIndex: ", trainingSessionIndex);
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      // Update the exercise name
      newState[trainingSessionIndex].exercises[exerciseIndex].exercise =
        newExerciseName;

      return newState;
    });
  };

  return handleExerciseChange;
};

export default useHandleExerciseChange;
