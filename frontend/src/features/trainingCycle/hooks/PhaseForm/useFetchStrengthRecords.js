import { getAllStrengthRecords } from "features/users/strengthRecordSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchStrengthRecords = () => {
  const dispatch = useDispatch();
  const strengthRecords = useSelector((state) => state.strengthRecords.records);

  useEffect(() => {
    if (strengthRecords.length === 0) {
      dispatch(getAllStrengthRecords());
    }
  }, [strengthRecords]);

  return strengthRecords;
};

export default useFetchStrengthRecords;
