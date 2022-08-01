import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Profile, SoloGameRankRate } from "../components";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const [matchId, setMatchId] = useState([]);
  const [gameInfo, setGetGameInfo] = useState([]);
  const [soloRankInfo, setSoloRankInfo] = useState([]);
  const [freeRankInfo, setFreeRankInfo] = useState([]);
  const { state } = useLocation();
  const { name, puuid, profileIconId, summonerLevel } = state.userData;
  console.log(state);

  useEffect(() => {
    setSoloRankInfo(state.leagueData[0]);
    setFreeRankInfo(state.leagueData[1]);
  }, []);

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
    console.log("matchId: ", gameInfo.data);
    let getGameInfo = await axios.post("http://localhost:4000/api/gameInfo", {
      matchId: matchId,
    });
    setGetGameInfo(getGameInfo.data);
    return getGameInfo;
  };

  // console.log("gameInfo: ", gameInfo);

  return (
    <div className="summoner">
      <Profile
        name={name}
        level={summonerLevel}
        leagueType={soloRankInfo.queueType}
      />
      <SoloGameRankRate wins={soloRankInfo.wins} losses={soloRankInfo.losses} />
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
