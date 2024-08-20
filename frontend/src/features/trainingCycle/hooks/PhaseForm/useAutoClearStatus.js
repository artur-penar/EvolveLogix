const { useEffect } = require("react");

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
