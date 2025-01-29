import { getUserDetail } from "features/users/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to fetch user details if not already provided.
 *
 * @param {Object} userDetails- The user detail object.
 * @returns {void}
 */
const useFetchUserDetails = (userDetails) => {
  const dispatch = useDispatch();
  const [fetchUserDetails, setFetchUserDetails] = useState(false);

  useEffect(() => {
    if (!fetchUserDetails && !userDetails) {
      dispatch(getUserDetail());
      setFetchUserDetails(true);
    }
  });
};

export default useFetchUserDetails;
