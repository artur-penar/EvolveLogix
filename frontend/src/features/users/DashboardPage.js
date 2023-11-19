import React from "react";
import Layout from "components/shared/Layout";
import { useSelector } from "react-redux";
import { selectIsUserAuthenticated, selectUser } from "features/users/user";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector((state) => state.user.loading);

  if (!isAuthenticated && !loading) return <Navigate to="/login" />;

  const { email, user_name } = user || {};

  console.log(email, user_name);

  return (
    <Layout title="PerformanceTracker | Dashboard">
      <h1>Dashboard</h1>
      {loading || !user ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <React.Fragment>
          <ul>
            <li>
              <strong>Email: </strong>
              {email}
            </li>
            <li>
              <strong>User Name: </strong>
              {user_name}
            </li>
          </ul>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default DashboardPage;
