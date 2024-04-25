import React from "react";
import SelectExerciseField from "./SelectExerciseField";
import WeightSelectField from "./WeightSelectField";
import ExerciseParameterInput from "./ExerciseParameterInput";

const WeeklyExercises = ({
  weeklyExercisePlan,
  weekNumber,
  exercisesNumber,
  exercisesNameList,
  trainingDayIndex,
  handleExerciseChange,
  handleWeightChange,
  handleRepsChange,
  handleSetsChange,
}) => {
  console.log("Training day index: ", trainingDayIndex);
  if (!weeklyExercisePlan[trainingDayIndex]) {
    console.log("Training day index: ", trainingDayIndex);
    return null;
  }

  return Array.from({ length: exercisesNumber }, (_, i) => i).map(
    (exerciseIndex) => (
      <div key={exerciseIndex} className="week-container">
        <SelectExerciseField
          weeklyExercisePlan={weeklyExercisePlan}
          exercisesNameList={exercisesNameList}
          exerciseIndex={exerciseIndex}
          dayIndex={trainingDayIndex}
          handleExerciseChange={handleExerciseChange}
        />
        {Array.from({ length: weekNumber }, (_, i) => i).map((weekIndex) => (
          <div key={weekIndex} className="exercise-inputs-container">
            <WeightSelectField
              weeklyExercisePlan={weeklyExercisePlan}
              handleWeightChange={handleWeightChange}
              trainingDayIndex={trainingDayIndex}
              exerciseIndex={exerciseIndex}
              weekIndex={weekIndex}
            />
            <label>x</label>
            <ExerciseParameterInput
              trainingDayIndex={trainingDayIndex}
              exerciseIndex={exerciseIndex}
              weekIndex={weekIndex}
              value={
                weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]
                  ?.weeks[weekIndex]?.reps
              }
              handleChange={handleRepsChange}
              placeholder="reps"
            />
            <label>x</label>
            <ExerciseParameterInput
              trainingDayIndex={trainingDayIndex}
              exerciseIndex={exerciseIndex}
              weekIndex={weekIndex}
              value={
                weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]
                  ?.weeks[weekIndex]?.sets
              }
              handleChange={handleSetsChange}
              placeholder="sets"
            />
          </div>
        ))}
      </div>
    )
  );
};

export default WeeklyExercises;
