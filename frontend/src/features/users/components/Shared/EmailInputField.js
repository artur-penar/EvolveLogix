import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const EmailInputField = ({ value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        label="Email"
      />
    </FormControl>
  );
};

export default EmailInputField;
