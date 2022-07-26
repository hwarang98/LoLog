import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const { state } = useLocation();
  const userInfo = state.data;
  const name = state.name;

  useEffect(() => {
    console.log("state: ", state);
  }, []);
  return (
    <div className="summoner">
      <div className="profile">
        {/* <img src="example" alt="유저 아이콘" /> */}
        <div className="name">{name}</div>
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
