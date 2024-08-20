const { useEffect } = require("react");

/**
 * Custom hook to automatically clear the status after a specified timeout.
 *
 * @param {string|null} addRequestStatus - The current status of the add request.
 * @param {Function} setAddRequestStatus - Function to set the status of the add request.
 */

const useAutoClearStatus = (addRequestStatus, setAddRequestStatus) => {
  useEffect(() => {
    if (addRequestStatus) {
      setTimeout(() => {
        setAddRequestStatus(null);
      }, 10000);
    }
    return () => clearTimeout();
  }, [addRequestStatus]);
};

export default useAutoClearStatus;
