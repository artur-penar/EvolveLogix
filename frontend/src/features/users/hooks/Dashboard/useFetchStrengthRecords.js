import { getAllStrengthRecords } from "features/users/strengthRecordSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useFetchStrengthRecords = (strengthRecords) => {
  const dispatch = useDispatch();
  const [strengthRecordsFetched, setStrengthRecordsFetched] = useState(false);

  if (!strengthRecordsFetched && strengthRecords.length === 0) {
    dispatch(getAllStrengthRecords());
    setStrengthRecordsFetched(true);
  }
};

export default useFetchStrengthRecords;
