import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "../components";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const [matchId, setMatchId] = useState([]);
  const [gameInfo, setGetGameInfo] = useState([]);
  const [soloRankInfo, setSoloRankInfo] = useState([]);
  const [freeRankInfo, setFreeRankInfo] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const { state } = useLocation();
  const { name, puuid, profileIconId, summonerLevel } = state.userData;
  // console.log(state);

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

  return (
    <div className="summoner">
      <Profile
        name={name}
        profileIconId={profileIconId}
        level={summonerLevel}
        leagueType={soloRankInfo.queueType}
        matchId={matchId}
        wins={soloRankInfo.wins}
        losses={soloRankInfo.wins}
      />
    </div>
  );
}

export default Summoner;
