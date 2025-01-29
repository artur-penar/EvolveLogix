import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import Layout from "shared/components/Layout";
import SignInOptions from "features/users/components/Shared/SignInOptions";

import Eagle from "../../components/HomePage/Assets/eagle.png";

import {
  login,
  resetRegistered,
  selectIsUserAuthenticated,
} from "features/users/user";

import "./LoginPage.css";
import PasswordInputField from "features/users/components/Shared/PasswordInputField";
import EmailInputField from "features/users/components/Shared/EmailInputField";
import PageHeader from "shared/components/PageHeader";

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
  };

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <Layout title="EvolveLogix | Login" content="Login page.">
      <div className="login-page-container">
        <div className="login-form-container">
          <div style={{ width: "100%" }}>
            <PageHeader headerContent={"Login"} />
          </div>
          <form className="mt-5" onSubmit={onSubmit}>
            <EmailInputField value={email} onChange={onChange} />
            <PasswordInputField value={password} onChange={onChange} />
            <Link href="#" variant="body1">
              Forgot Password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Login
            </Button>
            <SignInOptions />
            <span
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                display: "block",
              }}
            >
              Don't have an account?{" "}
              <Link href="/register" variant="body1">
                Sign up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
