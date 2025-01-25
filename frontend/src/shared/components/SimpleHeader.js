import React from "react";
import { Box, Typography } from "@mui/material";
import "./SimpleHeader.css";

const SimpleHeader = ({ headerContent }) => {
  return (
    <Box
      className="simple-header-container"
      sx={{ boxShadow: 1, borderRadius: 1, p: 1, mb: 1 }}
    >
      <Typography variant="h6" component="h5" align="center">
        {headerContent}
      </Typography>
    </Box>
  );
};

export default SimpleHeader;