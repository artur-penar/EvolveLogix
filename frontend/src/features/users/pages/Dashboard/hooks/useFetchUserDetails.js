import { getUserDetail } from "features/users/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to fetch user details if not already provided.
 *
 * @param {Object} userDetails- The user detail object.
 * @returns {void}
 */
const useFetchUserDetails = (userDetails) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetail());
    }
  });
};

export default useFetchUserDetails;
