const handleTrainingDataChange = (e, trainingData, setTrainingData) => {
  const { name, value } = e.target;
  setTrainingData({
    ...trainingData,
    [name]: value,
  });
};

export default handleTrainingDataChange;
