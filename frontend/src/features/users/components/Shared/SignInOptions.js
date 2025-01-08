import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";

const SignInOptions = () => {
  return (
    <div>
      <span
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          display: "block",
          textAlign: "center",
        }}
      >
        Or use
      </span>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <FacebookIcon fontSize="large" color="primary" />
        <GoogleIcon fontSize="large" style={{ color: "#DB4437" }} />
        <TwitterIcon fontSize="large" style={{ color: "#1DA1F2" }} />
      </Stack>
    </div>
  );
};

export default SignInOptions;
