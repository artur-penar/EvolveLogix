import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const UserNameInputField = ({ value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-username">User Name</InputLabel>
      <OutlinedInput
        id="outlined-adornment-username"
        type="text"
        name="user_name"
        value={value}
        onChange={onChange}
        label="User Name"
      />
    </FormControl>
  );
};

export default UserNameInputField;
