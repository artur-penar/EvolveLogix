/**
 * Custom hook for managing the macrocycle form state and submission.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string} params.selectedTrainingLogId - The ID of the selected training log.
 * @param {number} params.currentYear - The current year.
 * @returns {Object} - The form state, change handler, submit handler, and warnings.
 * @returns {Object} formState - The state of the form.
 * @returns {Function} handleFormChange - Function to handle form input changes.
 * @returns {Function} onSubmit - Function to handle form submission.
 * @returns {Object} warnings - Object containing form validation warnings.
 */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMacrocycle } from "features/trainingCycle/trainingCycle";

const useMacrocycleForm = ({ selectedTrainingLogId, currentYear }) => {
    const dispatch = useDispatch();
    const yearStart = new Date(Date.UTC(currentYear, 0, 1)).toISOString().split("T")[0];
    const yearEnd = new Date(Date.UTC(currentYear, 11, 31)).toISOString().split("T")[0];

    const [warnings, setWarnings] = useState({});
    const [formState, setFormState] = useState({
        macrocycleName: "",
        macrocycleStartDate: yearStart,
        macrocycleEndDate: yearEnd,
    });

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleError = (error) => {
        console.error("Error:", error);
    };

    const validateForm = () => {
        const newWarnings = {};
        if (!formState.macrocycleName) {
            newWarnings.macrocycleName = "Name required!";
        }
        setWarnings(newWarnings);
        return Object.keys(newWarnings).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(
                createMacrocycle({
                    name: formState.macrocycleName,
                    training_log_id: selectedTrainingLogId,
                    start_date: formState.macrocycleStartDate,
                    end_date: formState.macrocycleEndDate,
                })
            ).unwrap();
        } catch (error) {
            handleError(error);
        }
    };

    const onSubmit = (e) => {
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    return {
        formState,
        handleFormChange,
        onSubmit,
        warnings,
    };
};

export default useMacrocycleForm;
