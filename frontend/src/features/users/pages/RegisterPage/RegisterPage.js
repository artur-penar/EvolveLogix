import React, { useState } from "react";
import Layout from "shared/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "features/users/user";
import Button from "@mui/material/Button";
import "./RegisterPage.css";
import SignInOptions from "features/users/components/Shared/SignInOptions";
import { Email } from "@mui/icons-material";
import EmailInputField from "features/users/components/Shared/EmailInputField";
import UserNameInputFIeld from "features/users/components/Shared/NameInputField";
import PasswordInputField from "features/users/components/Shared/PasswordInputField";

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
            <EmailInputField value={email} onChange={onChange} />
            <UserNameInputFIeld value={user_name} onChange={onChange} />
            <PasswordInputField value={password} onChange={onChange} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              Register
            </Button>
            <SignInOptions />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
