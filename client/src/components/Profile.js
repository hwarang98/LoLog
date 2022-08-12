import React, { useState } from "react";
import axios from "axios";
import { GameInfoRender, SoloGameRankRate } from "./index";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Profile.css";

function Profile(props) {
  const [gameInfo, setGetGameInfo] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const { name, level, leagueType, profileIconId, matchId, wins, losses } =
    props;
  console.log(props);
  const userIcon = `http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${profileIconId}.png`;

  // matchId에 해당하는 게임 정보조회 요청
  const getGameInfo = async () => {
    let getGameInfo = await axios.post("http://localhost:4000/api/gameInfo", {
      data: { matchId: matchId, name: name },
    });
    setGetGameInfo(getGameInfo.data);
    setClickCheck(true);
    // return getGameInfo;
    return getGameInfo;
  };
  return (
    <div className="profile">
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <div className="summonerFrofileIcon">
              <img
                id="userIconImg"
                src={userIcon}
                alt="유저 아이콘"
                style={{ height: 85 }}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <div className="summonerFrofile">
              <span className="name">{name}</span>
              <span className="level">Lv:{level}</span>
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="summonerRankInfo">
              <SoloGameRankRate wins={wins} losses={losses} />
              <div className="leagueType">
                {leagueType === "RANKED_SOLO_5x5" && "솔로랭크"}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="searchGameInfo">
              <button onClick={getGameInfo}>전적검색</button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="gameList">
              {clickCheck === true ? (
                <GameInfoRender gameInfo={gameInfo} />
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Profile;
