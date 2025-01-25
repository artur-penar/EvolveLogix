import React from "react";
import { Box, Typography } from "@mui/material";
import "./PanelHeader.css";

const PanelHeader = ({ title }) => {
  return (
    <Box
      className="panel-header"
      sx={{ boxShadow: 2, borderRadius: 2, p: 2, mb: 2 }}
    >
      <Typography variant="h5" component="h3" align="center">
        {title}
      </Typography>
    </Box>
  );
};

export default PanelHeader;