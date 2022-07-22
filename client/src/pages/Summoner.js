import React from "react";
import { getSummoner } from "../Api/getSummoner";
import "./summoner.css";

function Summoner() {
  getSummoner("돌면킬");
  return (
    <div className="summoner">
      <h1>소환사 이름</h1>
      <div>전적 내용</div>
    </div>
  );
}

export default Summoner;
