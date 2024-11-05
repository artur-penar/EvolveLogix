import { getUserDetail } from "features/users/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Custom hook to fetch user details if not already provided.
 *
 * @param {Object} userDetail - The user detail object.
 * @returns {void}
 */
const useFetchUserDetail = (userDetail) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userDetail) {
      dispatch(getUserDetail());
    }
  });
};

export default useFetchUserDetail;
