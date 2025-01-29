import { getAllStrengthRecords } from "features/users/strengthRecordSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchStrengthRecords = () => {
  const dispatch = useDispatch();
  const strengthRecords = useSelector((state) => state.strengthRecords.records);
  const [strengthRecordsFetched, setStrengthRecordsFetched] = useState(false);

  useEffect(() => {
    if (!strengthRecordsFetched && strengthRecords.length === 0) {
      dispatch(getAllStrengthRecords());
      setStrengthRecordsFetched(true);
    }
  }, [strengthRecords]);

  return strengthRecords;
};

export default useFetchStrengthRecords;
