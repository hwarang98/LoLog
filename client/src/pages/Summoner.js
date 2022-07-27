import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const [matchId, setMatchId] = useState([]);

  const { state } = useLocation();
  const userInfo = state.data;
  const name = state.name;
  const puuid = state.puuid;

  // matchId request
  useEffect(() => {
    const matchData = async () => {
      let response = await axios.post("http://localhost:4000/api/matchInfo", {
        puuid: puuid,
      });
      setMatchId(response.data);
      return response;
    };
    matchData();
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
        {matchId.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default Summoner;
