import { useEffect, useState } from "react";

/**
 * Custom hook to manage the active status of the phase form.
 *
 * @param {string|null} phaseEndDate - The end date of the phase.
 * @param {string|null} addRequestStatus - The status of the add request.
 * @returns {boolean} - The active status of the phase form.
 */

const usePhaseFormStatus = (phaseEndDate, addRequestStatus) => {
  const [isPhaseFormActive, setIsPhaseFormActive] = useState(false);

  useEffect(() => {
    if (!phaseEndDate && !addRequestStatus) {
      setIsPhaseFormActive(false);
    } else {
      setIsPhaseFormActive(true);
    }
  }, [phaseEndDate, addRequestStatus]);

  return isPhaseFormActive;
};

export default usePhaseFormStatus;
