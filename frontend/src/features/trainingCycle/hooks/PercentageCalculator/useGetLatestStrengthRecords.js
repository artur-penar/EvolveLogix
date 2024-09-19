import { getLatestStrengthRecords } from "features/trainingCycle/utils/getLatestStrengthRecords";
import React, { useEffect, useState } from "react";

const useGetLatestRecords = (strengthRecords) => {
  const [latestStrengthRecords, setLatestStrengthRecords] = useState([]);

  useEffect(() => {
    setLatestStrengthRecords(getLatestStrengthRecords(strengthRecords));
  }, [strengthRecords]);

  return latestStrengthRecords;
};

export default useGetLatestRecords;
