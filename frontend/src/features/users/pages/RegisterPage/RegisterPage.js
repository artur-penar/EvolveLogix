import React, { useState } from "react";
import Layout from "shared/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "features/users/user";
import Button from "@mui/material/Button";
import "./RegisterPage.css";

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
    <Layout title="EvolveLogix| Register" content="Register page.">
      <div className="register-page-container">
        <div className="register-form-container">
          <h1 style={{ marginTop: "1rem" }}>Register</h1>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
