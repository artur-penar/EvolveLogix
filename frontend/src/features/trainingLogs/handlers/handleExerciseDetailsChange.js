const handleExerciseDetailsChange = (
  e,
  targetExerciseIndex,
  targetSetIndex,
  trainingData,
  setTrainingData
) => {
  const { name, value } = e.target;
  if (value >= 0) {
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== targetExerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, currentSetIndex) =>
                currentSetIndex !== targetSetIndex
                  ? set
                  : {
                      ...set,
                      [name]: value,
                    }
              ),
            }
      ),
    });
  }
};

export default handleExerciseDetailsChange;
