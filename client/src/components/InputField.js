import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function InputField() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="소환사 이름" variant="standard" />
    </Box>
  );
}

export default InputField;
