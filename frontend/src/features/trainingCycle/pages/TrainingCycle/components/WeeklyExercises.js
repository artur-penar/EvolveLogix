import React from "react";
import SelectExerciseField from "./SelectExerciseField";
import ExerciseParameterInput from "./ExerciseParameterInput";

const WeeklyExercises = ({
  weeklyExercisePlan,
  weekNumber,
  exercisesNumber,
  exercisesNameList,
  trainingDayIndex,
  handleExerciseChange,
  handleExerciseDetailChange,
  displayWeightInPercent,
}) => {
  if (!weeklyExercisePlan[trainingDayIndex]) {
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
            <ExerciseParameterInput
              trainingDayIndex={trainingDayIndex}
              exerciseIndex={exerciseIndex}
              weekIndex={weekIndex}
              value={
                weeklyExercisePlan[trainingDayIndex]?.exercises[exerciseIndex]
                  ?.weeks[weekIndex]?.weight
              }
              handleChange={handleExerciseDetailChange}
              detailType="weight"
              displayWeightInPercent={displayWeightInPercent}
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
              handleChange={handleExerciseDetailChange}
              detailType="reps"
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
              handleChange={handleExerciseDetailChange}
              detailType="sets"
            />
          </div>
        ))}
      </div>
    )
  );
};

export default WeeklyExercises;
