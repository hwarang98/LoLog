import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GameInfoRender, SoloGameRankRate, Emblem } from './index';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import './Profile.css';

function Profile(props) {
  const [gameInfo, setGetGameInfo] = useState([]);
  const [clickCheck, setClickCheck] = useState(false);
  const [clickGameInfoCheck, setClickGameInfoCheck] = useState(false);

  const { name, level, leagueType, profileIconId, matchId, wins, losses, tier, rank, leaguePoints, winCount } = props;

  const userIcon = `http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${profileIconId}.png`;

  // matchId에 해당하는 게임 정보조회 요청
  const getGameInfo = async () => {
    const getGameInfoList = await axios.post('http://localhost:4000/api/game/info/matchId', {
      data: { matchId: matchId, name: name },
    });

    // 버튼 클릭시 게임 승리 유무 상태 저장
    // const gameList = getGameInfoList.data;
    // gameList.map((item, idx) => {
    //   if (item.win) {
    //     setWinCount((winCount) => winCount + 1);
    //   }
    // });
    setGetGameInfo(getGameInfoList.data);
    setClickCheck(true);
    return getGameInfo;
  };

  const Item = (props) => {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          fontSize: '0.875rem',
          ...sx,
        }}
        {...other}
      />
    );
  };

  return (
    <div className="profile">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',

          p: 1,
          m: 1,
          // maxWidth: 600,
        }}
      >
        <Item>
          <div className="summonerName">
            <span>{name}</span>
          </div>
        </Item>

        <Item sx={{ flexGrow: 2 }}>
          <div className="summonerFrofileIcon">
            <img id="userIconImg" src={userIcon} alt="유저 아이콘" />
            <div className="level">
              <span className="level">{level}</span>
            </div>
          </div>
        </Item>

        <Item>
          <Emblem tier={tier}></Emblem>
        </Item>

        <Item>
          <div className="summonerRankInfo">
            <div className="leagueType">{leagueType === 'RANKED_SOLO_5x5' && '솔로랭크'}</div>
            <div className="tire">
              {tier} {rank}
            </div>
            {leaguePoints} LP
            <SoloGameRankRate wins={wins} losses={losses} winCount={winCount} />
          </div>
        </Item>

        <Item>
          {/* <div className="gameList"> */}
          {clickCheck === true ? <GameInfoRender gameInfo={gameInfo} winCount={winCount} /> : null}
          {/* </div> */}
        </Item>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',

          p: 1,
          m: 1,
          // maxWidth
        }}
      >
        <Item sx={{ alignSelf: 'flex-end' }}>
          <div className="searchGameInfo">
            <button onClick={getGameInfo}>전적검색</button>
          </div>
        </Item>
      </Box>
    </div>
  );
}

export default Profile;
