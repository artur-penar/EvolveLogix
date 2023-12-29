import React from "react";
import TrainingLogNameField from "./TrainingLogNameField";
import DateField from "./DateField";
import ExerciseField from "./ExerciseField";
import CommentField from "./CommentField";

const TrainingSessionForm = ({
  logName,

  date,
  setDate,
  comment,
  setComment,
  exercises,
  exerciseNameList,
  handleExerciseChange,
  handleSetsNumberChange,
  handleSubmit,
  handleAddExercise,
}) => (
  <div className="add-training-container">
    <div className="field-container">
      <TrainingLogNameField logName={logName} />
      <DateField date={date} setDate={setDate} />
      <CommentField comment={comment} setComment={setComment} />
    </div>
    <form onSubmit={handleSubmit} className="form">
      <ExerciseField
        exercises={exercises}
        exerciseNameList={exerciseNameList}
        handleExerciseChange={handleExerciseChange}
        handleSetsNumberChange={handleSetsNumberChange}
      />
      <button
        type="button"
        onClick={handleAddExercise}
        className="button button-add-exercise"
      >
        Add Exercise
      </button>
      <button type="submit" className="button button-submit">
        Submit
      </button>
    </form>
  </div>
);

export default TrainingSessionForm;
