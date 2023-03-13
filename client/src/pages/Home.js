import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [summoner, setSummoner] = useState('');
  const navigate = useNavigate();

  // 이름
  const onChange = (e) => {
    setSummoner(e.target.value);
  };

  // 엔터
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  // 클릭시 페이지 이동
  const onClick = async () => {
    const getSummoner = await axios
      .post(`http://localhost:4000/api/summoner/info`, {
        summonerName: summoner,
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      });

    const userData = getSummoner.data;
    const cryptoId = userData.id; // 소환사 암호화 id
    const puuid = userData.puuid;
    const summonerName = userData.name;

    // 소환사 리그정보 조회 요청
    const getLeague = await axios
      .post(`http://localhost:4000/api/league/info`, {
        id: cryptoId,
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        alert(errorMessage);
      });
    const leagueData = getLeague.data;

    const getMatchId = await axios.post('http://localhost:4000/api/match/info', {
      puuid: puuid,
    });

    const matchId = getMatchId.data;

    const getSummonerGameData = await axios.post(`http://localhost:4000/api/game/info`, {
      data: { summonerName: summonerName, matchId: matchId },
    });

    const summonerGameData = getSummonerGameData.data;

    navigate(`/summoner/${summoner}`, {
      state: { userData, leagueData, summonerGameData },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="serch-container">
        <h1 className="flex justify-center">LoLog</h1>
        <div className="flex">
          <TextField
            id="summonerName"
            label="소환사 이름"
            size="small"
            className="flex"
            style={{ width: 400 }}
            onChange={onChange}
            onKeyPress={onEnter}
          />
          <IconButton className="flex" onClick={onClick}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
