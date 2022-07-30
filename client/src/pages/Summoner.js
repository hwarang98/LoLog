import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const [matchId, setMatchId] = useState([]);
  const [gameInfo, setGetGameInfo] = useState([]);
  const { state } = useLocation();
  const { name, puuid, profileIconId, summonerLevel } = state;

  // matchId 조회 요청
  useEffect(() => {
    const getMatchData = async () => {
      let getMatchId = await axios.post("http://localhost:4000/api/matchInfo", {
        puuid: puuid,
      });
      return setMatchId(getMatchId.data);
    };
    getMatchData();
  }, []);

  // matchId에 해당하는 게임 정보조회 요청
  const getGameInfo = async () => {
    console.log(matchId);
    let getGameInfo = await axios.post("http://localhost:4000/api/gameInfo", {
      matchId: matchId,
    });
    // console.log("getGameInfo: ", getGameInfo);
    setGetGameInfo(getGameInfo.data);
    return getGameInfo;
  };

  console.log("gameInfo: ", gameInfo);

  return (
    <div className="summoner">
      <div className="profile">
        {/* <img src="example" alt="유저 아이콘" /> */}
        <div className="name">{name}</div>
        <div className="level">{summonerLevel}</div>
        <div>최근 20 게임 승률: 75%</div>
      </div>
      <p></p>
      <ul>
        <button onClick={getGameInfo}>전적검색</button>
        <ul>
          {gameInfo.map((item, index) => {
            console.log(item.info.gameId);
            return <li key={index}>{item.info.gameId}</li>;
          })}
        </ul>
      </ul>
    </div>
  );
}

export default Summoner;
