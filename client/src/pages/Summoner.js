import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const { state } = useLocation();

  console.log("state: ", state);
  return (
    <div className="summoner">
      <div className="profile">
        {/* <img src="example" alt="유저 아이콘" /> */}
        <div className="name">{state}</div>
        <div className="level">96</div>
        <div>최근 20게임 승률: 75%</div>
      </div>
      <p></p>
      <ul>
        <li>전적1</li>
        <li>전적2</li>
        <li>전적3</li>
        <li>전적4</li>
      </ul>
    </div>
  );
}

export default Summoner;
