const { useEffect, useState } = require("react");

/**
 * Custom hook to automatically clear the status after a specified timeout.
 *
 * @param {string|null} addRequestStatus - The current status of the add request.
 * @param {Function} setAddRequestStatus - Function to set the status of the add request.
 * @returns {number} - The countdown value in seconds.
 */
const useAutoClearStatus = (addRequestStatus, setAddRequestStatus) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let interval;
    if (addRequestStatus) {
      setCountdown(10); // Reset countdown to 10 seconds
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setAddRequestStatus(null);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [addRequestStatus, setAddRequestStatus]);

  return countdown;
};

export default useAutoClearStatus;
