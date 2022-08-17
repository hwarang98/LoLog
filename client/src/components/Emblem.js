import React from "react";
// import sd from "../images/emblems";

function Emblem(props) {
  const { tier } = props;
  console.log(tier);
  let userTier = "";

  switch (tier) {
    case "BRONZE":
      break;

    case "SILVER":
      <img src="..images/emblems/Emblem_Bronze.png" alt="silvler"></img>;
      console.log("hello silver");
      break;

    default:
      break;
  }
}

export default Emblem;
