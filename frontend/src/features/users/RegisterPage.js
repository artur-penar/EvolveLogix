import React, { useState } from "react";
import Layout from "components/shared/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "features/users/user";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { registered } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    password: "",
  });

  const { email, user_name, password } = formData;

  const onChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, user_name, password }));
  };

  if (registered) return <Navigate to="/login" />;

  return (
    <Layout title="PerformanceTracker | Register" content="Register page.">
      <div className="dashboard">
        <h1>Register</h1>
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
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              name="user_name"
              onChange={onChange}
              value={user_name}
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

export default RegisterPage;
