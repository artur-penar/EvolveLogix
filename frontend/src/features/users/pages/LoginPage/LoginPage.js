import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "shared/components/Layout";
import Header from "shared/components/PageHeader";
import Button from "@mui/material/Button";
import {
  login,
  resetRegistered,
  selectIsUserAuthenticated,
} from "features/users/user";

import "./LoginPage.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "@mui/material";

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
        {/* <Header headerContent={"Login"} /> */}

        <div className="login-form-container">
          <h1 style={{ marginTop: "1rem" }}>Login</h1>
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
