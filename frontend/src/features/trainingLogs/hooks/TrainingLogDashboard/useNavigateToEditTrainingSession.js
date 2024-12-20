import { useNavigate } from "react-router-dom";

/**
 * Custom hook that provides a function to navigate to the Edit Training Session page.
 * 
 * @param {Object} clickedEventData - The data of the clicked event.
 * @param {string} clickedEventData.id - The ID of the clicked event.
 * @returns {Function} A function that navigates to the Edit Training Session page with the clicked event data.
 */
const useNavigateToEditTrainingSession = (clickedEventData) => {
  const navigate = useNavigate();

  /**
   * Navigates to the Edit Training Session page with the clicked event data.
   */
  const handleModalEditClick = () => {
    const { id } = clickedEventData;
    const trainingData = clickedEventData;

    navigate(`/edit-training-session/${id}`, { state: { trainingData } });
  };

  return handleModalEditClick;
};

export default useNavigateToEditTrainingSession;