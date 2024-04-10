import React from "react";
import { useState, useEffect } from "react";
import ApiServices from "../../services/ApiService";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServices.get("/training_log/exercises");
        console.log(res);
        setExercises(res);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(exercises);
  return (
    <div>
      Hello
      {isLoaded ? (
        exercises.map((exercise) => (
          <div key={exercise.id}>
            <h4>{exercise.name}</h4>
            <p>{exercise.description}</p>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
export default ExerciseList;
