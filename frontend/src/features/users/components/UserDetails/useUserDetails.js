import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUserDetail } from '../../user';

/**
 * Custom hook to manage user details form state and navigation.
 *
 * @param {Array} userDetails - Array of user details objects.
 * @param {Array} initialUserDetails - Array of initial user details objects.
 * @returns {Object} - An object containing form data, update date, current index, and handlers.
 * @returns {Object} formData - The current form data.
 * @returns {Date} updatedAtData - The date of the last update.
 * @returns {number} currentIndex - The current index of the user details being displayed.
 * @returns {Function} handleSubmit - Function to handle form submission.
 * @returns {Function} handleInputChange - Function to handle input changes in the form.
 * @returns {Function} handlePrev - Function to navigate to the previous user detail.
 * @returns {Function} handleNext - Function to navigate to the next user detail.
 */
const useUserDetails = (userDetails, initialUserDetails) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(userDetails.length - 1);
  const { updated_at, ...bodyMeasurements } = userDetails[currentIndex] || initialUserDetails[0];
  const [formData, setFormData] = useState(bodyMeasurements);
  const lastUpdateDate = new Date(updated_at);

  useEffect(() => {
    setFormData(bodyMeasurements);
  }, [currentIndex]);

  const handleSubmit = () => {
    dispatch(createUserDetail(formData));
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < userDetails.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return {
    formData,
    updatedAtData: lastUpdateDate,
    currentIndex,
    handleSubmit,
    handleInputChange,
    handlePrev,
    handleNext,
  };
};

export default useUserDetails;