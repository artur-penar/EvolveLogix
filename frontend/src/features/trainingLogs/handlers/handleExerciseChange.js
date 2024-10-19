const handleExerciseChange = (
  e,
  targetExerciseIndex,
  trainingData,
  setTrainingData
) => {
  const { name, value } = e.target;
  setTrainingData({
    ...trainingData,
    exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
      currentExerciseIndex !== targetExerciseIndex
        ? exercise
        : {
            ...exercise,
            [name]: value,
          }
    ),
  });
};

export default handleExerciseChange;
