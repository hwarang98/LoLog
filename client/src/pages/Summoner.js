import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "../components";
import axios from "axios";
import "./summoner.css";

function Summoner() {
  const [matchId, setMatchId] = useState([]);
  const [soloRankInfo, setSoloRankInfo] = useState([]);
  const [freeRankInfo, setFreeRankInfo] = useState([]);
  const { state } = useLocation();
  const { queueType, wins, losses, tier, rank, leaguePoints } = soloRankInfo;
  const { name, puuid, profileIconId, summonerLevel } = state.userData;

  // 솔랭, 자랭 정보저장
  useEffect(() => {
    // console.log("soloRankInfo: ", soloRankInfo);
    const userData = state.leagueData;
    for (let i = 0; i < userData.length; i++) {
      const queueType = userData[i].queueType;
      if (queueType === "RANKED_SOLO_5x5") {
        setSoloRankInfo(userData[i]);
      }
      if (queueType === "RANKED_FLEX_SR") {
        setFreeRankInfo(userData[i]);
      }
    }
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
        leagueType={queueType}
        matchId={matchId}
        wins={wins}
        losses={losses}
        tier={tier}
        rank={rank}
        leaguePoints={leaguePoints}
      />
    </div>
  );
}

export default Summoner;
