import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./home.css";

function Home() {
  const [summoner, setSummoner] = useState("");
  const navigate = useNavigate();

  // 이름
  const onChange = (e) => {
    setSummoner(e.target.value);
  };

  // 엔터
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  // 클릭시 페이지 이동
  const onClick = async () => {
    // 소환사 정보 요청
    const getSummoner = await axios.post(
      `http://localhost:4000/api/getUserInfo`,
      {
        name: summoner,
      }
    );
    const userData = getSummoner.data; // 소환사 정보
    const cryptoId = userData.id; // 소환사 암호화 id

    // 소환사 리그정보 조회 요청
    const getLeague = await axios.post(
      `http://localhost:4000/api/getLeagueInfo`,
      {
        cryptoId: cryptoId,
      }
    );
    const leagueData = getLeague.data;

    navigate(`/summoner/${summoner}`, {
      state: { userData, leagueData },
    });
  };

  return (
    <div className="home">
      <h1>LoLog</h1>
      <TextField
        id="summonerName"
        label="소환사 이름"
        size="small"
        style={{ width: 400 }}
        onChange={onChange}
        onKeyPress={onEnter}
      />
      <IconButton onClick={onClick}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default Home;
