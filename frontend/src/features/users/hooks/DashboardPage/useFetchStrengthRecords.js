import { getAllStrengthRecords } from "features/users/strengthRecordSlice";
import { useDispatch } from "react-redux";

const useFetchStrengthRecords = (strengthRecords) => {
  const dispatch = useDispatch();
  if (strengthRecords.length === 0) {
    dispatch(getAllStrengthRecords());
  }
};

export default useFetchStrengthRecords;
