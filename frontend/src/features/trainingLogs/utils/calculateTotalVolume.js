const calculateTotalVolume = (exercise) => {
  return exercise.sets.reduce(
    (totalVolume, set) => totalVolume + set.weight * set.repetitions,
    0
  );
};

export default calculateTotalVolume;
