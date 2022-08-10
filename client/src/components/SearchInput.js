import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput(props) {
  console.log("props: ", props);
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton sx={{ p: "5px" }} aria-label="menu"></IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="소환사 이름"
        inputProps={{ "aria-label": props.onClick }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label={props.onClick}>
        <SearchIcon />
      </IconButton>
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
      ></IconButton>
    </Paper>
  );
}
export default SearchInput;
