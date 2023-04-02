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
        <h1 className="flex justify-center text-5xl font-bold my-5">LoLog</h1>
        <div className="flex bg-white px-4 rounded-lg">
          <input
            type="text"
            className="w-96 text-black text-base p-2.5 peer"
            placeholder="hide on bush"
            onChange={onChange}
            onKeyDown={onEnter}
          />
          <button className="pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-black"
              onClick={onClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
