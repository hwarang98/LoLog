import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Profile, GameInfoRender } from '../components';
import axios from 'axios';
import _ from 'lodash';
import './summoner.css';

function Summoner() {
  const [matchId, setMatchId] = useState([]);
  const [soloRankInfo, setSoloRankInfo] = useState([]);
  const [freeRankInfo, setFreeRankInfo] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const { state } = useLocation();
  const { queueType, wins, losses, tier, rank, leaguePoints } = soloRankInfo;
  const { userData, leagueData, summonerGameData } = state;
  const { id, name, puuid, profileIconId, summonerLevel } = userData;

  useEffect(() => {
    let cnt = 0;
    _.each(summonerGameData, (game) => {
      if (game.summonerId === id) {
        if (game.win) cnt++;
      }
      setWinCount(cnt);
    });
  });

  // 솔랭, 자랭 정보저장
  useEffect(() => {
    try {
      _.map(leagueData, (item) => {
        const queueType = item.queueType;

        switch (queueType) {
          case 'RANKED_SOLO_5x5':
            setSoloRankInfo(item);
            break;

          case 'RANKED_FLEX_SR':
            setFreeRankInfo(item);
            break;

          default:
            return 'queueType을 확인해주세요.';
        }
      });
    } catch (error) {
      throw new Error(alert({ error: error.message }));
    }
  }, []);

  // matchId 조회 요청
  useEffect(() => {
    try {
      const getMatchData = async () => {
        const getMatchId = await axios.post('http://localhost:4000/api/match/info', {
          puuid: puuid,
        });

        return setMatchId(getMatchId.data);
      };
      getMatchData();
    } catch (error) {
      throw new Error(alert({ error: error.message }));
    }
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
        winCount={winCount}
      />
      <GameInfoRender gameInfo={summonerGameData} winCount={10} summonerId={id} />
    </div>
  );
}

export default Summoner;
