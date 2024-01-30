import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "components/shared/Layout";
import {
  login,
  resetRegistered,
  selectIsUserAuthenticated,
} from "features/users/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
    console.log(isAuthenticated);
  };

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <Layout title="EvolveLogix| Login" content="Login page.">
      <div className="dashboard">
        <h1>Log into your account</h1>
        <form className="mt-5" onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={onChange}
              value={password}
            />
          </div>
          <button className="btn btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
