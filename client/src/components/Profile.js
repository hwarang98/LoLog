import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GameInfoRender, SoloGameRankRate, Emblem } from './index';
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

  return (
    <div className="flex flex-wrap items-center justify-center mt-16">
      <div className="flex w-1/3 justify-center">
        <div className="text-4xl pr-10 font-bold">{name}</div>
        <div className="rounded-lg overflow-hidden w-20">
          <img id="userIconImg" className="rounded-lg object-cover" src={userIcon} alt="유저 아이콘" />
          <span className="level">{level}</span>
        </div>
      </div>

      <div className="flex w-1/3">
        <div className="pl-44 pr-6">
          <Emblem tier={tier}></Emblem>
        </div>
        <div className="text-sm">
          <div className="text-white pb-4">{leagueType === 'RANKED_SOLO_5x5' && '솔로랭크'}</div>
          <div className="text-base font-bold pb-1">
            {tier} {rank}
          </div>
          <div className="text-white-font">
            <div className="pb-1">{leaguePoints} LP</div>
            <SoloGameRankRate wins={wins} losses={losses} winCount={winCount} />
          </div>
        </div>
        <div>{clickCheck === true ? <GameInfoRender gameInfo={gameInfo} winCount={winCount} /> : null}</div>
      </div>
      <div className="w-full">
        <button onClick={getGameInfo}>전적검색</button>
      </div>
    </div>
  );
}

export default Profile;
