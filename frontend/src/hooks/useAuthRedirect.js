import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook that redirects the user to the login page if they are not authenticated.
 *
 * @hook
 * @name useAuthRedirect
 *
 * @returns {void}
 */

const useAuthRedirect = (isAuthenticated) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
