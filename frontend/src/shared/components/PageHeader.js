import React from "react";
import { Box, Typography } from "@mui/material";
import "./PageHeader.css";

const PageHeader = ({ headerContent }) => (
  <Box
    className="header-container"
    sx={{ position: "relative", overflow: "hidden", borderRadius: 2, mb: 2 }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(to bottom, rgba(5, 100, 8), rgba(5, 100, 8))",
        zIndex: 1,
      }}
    />
    <Typography
      variant="h4"
      component="h1"
      align="center"
      sx={{ position: "relative", zIndex: 3, color: "white", p: 2 }}
    >
      {headerContent}
    </Typography>
  </Box>
);

export default PageHeader;
