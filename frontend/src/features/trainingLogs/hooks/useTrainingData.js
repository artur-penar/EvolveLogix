import { useState } from "react";

/**
 * Custom hook to manage the training data state.
 *
 * This hook initializes the training data state based on whether it is in edit mode or not.
 * If `editData` is provided, it uses that data to initialize the state. Otherwise, it uses
 * the provided `selectedDate` or `currentDate` to initialize the state with default values.
 *
 * @param {Object} editData - Data to be edited (if in edit mode).
 * @param {string} selectedDate - The date selected from a calendar event.
 * @param {string} currentDate - The current date in the format YYYY-MM-DD.
 * @returns {[Object, Function]} - Returns the training data state and the function to update it.
 */

const useTrainingData = (editData, selectedDate, currentDate) => {
  const [trainingData, setTrainingData] = useState(
    editData
      ? editData
      : {
          comment: "This is a comment",
          date: selectedDate ? selectedDate : currentDate,
          description: "This is a description",
          exercises: [
            {
              exercise: "Squat",
              sets: [
                {
                  set_number: 1,
                  weight: 0,
                  repetitions: 0,
                  is_completed: true,
                },
              ],
            },
          ],
        }
  );
  return [trainingData, setTrainingData];
};

export default useTrainingData;
