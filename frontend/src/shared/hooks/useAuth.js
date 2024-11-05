import { selectIsUserAuthenticated } from "features/users/user";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to check user authentication status and navigate to login page if not authenticated.
 *
 * @function
 * @name useAuth
 * @returns {void}
 */
const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuth;
