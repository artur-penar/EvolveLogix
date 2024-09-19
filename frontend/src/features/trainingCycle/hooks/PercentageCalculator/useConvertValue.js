import { useEffect } from "react";

const useConvertValue = ({
  selectedExerciseName,
  selectedExerciseRecord,
  percentageValue,
  otherWeight,
  setConvertedValue,
}) => {
  useEffect(() => {
    // Use Effect to calculate the converted value
    // If the selected exercise is "Other", use the otherWeight value
    if (selectedExerciseName === "Other") {
      setConvertedValue(Math.round((otherWeight * percentageValue) / 100));
      // If the selected exercise is not "Other" and the selected exercise has a weight value
      // Calculate the converted value based on the selected exercise weight
    } else if (selectedExerciseRecord.weight && percentageValue) {
      setConvertedValue(
        Math.round((selectedExerciseRecord.weight * percentageValue) / 100)
      );
    }
  }, [selectedExerciseName, percentageValue, otherWeight]);
};

export default useConvertValue;
