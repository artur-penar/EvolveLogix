import React from "react";
import DescriptionFiedl from "./DescriptionFeild";
import DateField from "./DateField";
import ExerciseField from "./ExerciseField";
import CommentField from "./CommentField";

const TrainingSessionForm = ({
  description,
  setDescription,

  date,
  setDate,
  comment,
  setComment,
  exercises,
  exerciseNameList,
  handleAddExercise,
  handleRemoveExercise,
  handleExerciseChange,
  handleSetsNumberChange,
  handleSubmit,
}) => (
  <div className="add-training-container">
    <div className="field-container">
      <DescriptionFiedl
        description={description}
        setDescription={setDescription}
      />
      <DateField date={date} setDate={setDate} />
      <CommentField comment={comment} setComment={setComment} />
    </div>
    <form onSubmit={handleSubmit} className="form">
      <ExerciseField
        exercises={exercises}
        exerciseNameList={exerciseNameList}
        handleRemoveExercise={handleRemoveExercise}
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
