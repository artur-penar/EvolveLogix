import React from "react";
import { Box, Typography } from "@mui/material";
import "./ContainerHeader.css";

const ContainerHeader = ({ headerContent }) => {
  return (
    <Box className="container-header" sx={{ boxShadow: 3, borderRadius: 2, p: 2, mb: 2 }}>
      <Typography variant="h5" component="h3" align="center">
        {headerContent}
      </Typography>
    </Box>
  );
};

export default ContainerHeader;