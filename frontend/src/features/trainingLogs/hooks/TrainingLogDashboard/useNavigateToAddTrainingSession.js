import { useNavigate } from "react-router-dom";

/**
 * Custom hook that provides a function to navigate to the Add Training Session page.
 * 
 * @returns {Function} A function that takes a date object and navigates to the Add Training Session page with the selected date.
 */
const useNavigateToAddTrainingSession = () => {
  const navigate = useNavigate();

  /**
   * Navigates to the Add Training Session page with the selected date.
   * 
   * @param {Object} date - The date object containing the selected date information.
   * @param {string} date.dateStr - The string representation of the selected date.
   */
  const navigateToAddTrainingSession = (date) => {
    alert("Clicked on: " + date.dateStr);
    navigate("/add-training-session", {
      state: { selectedDate: date.dateStr },
    });
  };

  return navigateToAddTrainingSession;
};

export default useNavigateToAddTrainingSession;