import React from "react";
import "./Emblem.css";

function Emblem(props) {
  const { tier } = props;

  switch (tier) {
    case "IRON":
      return (
        <img
          src={require("../images/emblems/Emblem_Iron.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "BRONZE":
      return (
        <img
          src={require("../images/emblems/Emblem_Bronze.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "SILVER":
      return (
        <img
          src={require("../images/emblems/Emblem_Silver.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "GOLD":
      return (
        <img
          src={require("../images/emblems/Emblem_Gold.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "PLATINUM":
      return (
        <img
          src={require("../images/emblems/Emblem_Platinum.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "DIAMOND":
      return (
        <img
          src={require("../images/emblems/Emblem_Diamond.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "MASTER":
      return (
        <img
          src={require("../images/emblems/Emblem_Master.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "GRANDMASTER":
      return (
        <img
          src={require("../images/emblems/Emblem_Grandmaster.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    case "CHALLENGER":
      return (
        <img
          src={require("../images/emblems/Emblem_Challenger.png")}
          className="userTier"
          style={{ height: 100 }}
        />
      );

    // default null
  }
}

export default Emblem;
