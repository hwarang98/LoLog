import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import './GameInfoRender.css';

function GameInfoRender(props) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const [summoner, setSummoner] = useState([]);
  const { gameInfo, summonerId } = props;

  // 전체 게임 승률
  const championIcon = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${championName}.png`;
  };

  const gameStartDate = (date) => {
    return moment(date).format('YY/MM/DD');
  };
  const gameEndDate = (date) => {
    return moment(date).format('YY/MM/DD');
  };

  // 2번째 소숫점 자리부터 버리는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 2) => {
    let num = typeof number === 'number' ? String(number) : number;

    const pointPos = num.indexOf('.');

    if (pointPos === -1) return Number(num).toFixed(decimalPoint);

    const splitNumber = num.split('.');
    const rightNum = splitNumber[1].substring(0, decimalPoint);
    return Number(`${splitNumber[0]}.${rightNum}`).toFixed(decimalPoint);
  };

  useEffect(() => {
    const gameData = [];
    let winCnt = 0;
    gameInfo.map((data) => {
      if (data.summonerId === summonerId) {
        if (data.win === true) {
          winCnt++;
        }
        return gameData.push(data);
      }
    });
    setWinCount(winCnt);
    setSummonerGameData([...gameData]);
  }, []);

  const linePosition = (line) => {
    switch (line) {
      case 'TOP':
        return '탑';

      case 'JUNGLE':
        return '정글';

      case 'MIDDLE':
        return '미드';

      case 'BOTTOM':
        return '원딜';

      case 'UTILITY':
        return '서폿';

      default:
        break;
    }
  };

  console.log(winCount);
  const winRate = (winCount / 2) * 100;

  return (
    <div className="gameInfoRendering">
      <div className="winRate">최근 10게임 승률:{winRate}%</div>
      <div className="gameInfo">
        {summonerGameData.map((game, idx) => {
          return (
            <li className="gameList" key={idx}>
              <img
                id="summonerIconImg"
                src={championIcon(game.championName)}
                alt="챔피언 아이콘"
                style={{ height: 42 }}
              />
              <div className="type">{game.gameType}</div>
              <div className="gameStartTime">{gameStartDate(game.gameStartTimestamp)}</div>
              <div className="gameEndTime"> {gameEndDate(game.gameEndDateTimeStamp)}</div>
              <div className="champLevel">{game.champLevel}</div>
              <div className="kill">{game.kill}</div>
              <div className="death">{game.death}</div>
              <div className="assist">{game.assist}</div>
              <div className="kda">{game.kda}</div>
              <div className="totalCs">{game.totalCs}</div>
              <div className="item0">{game.item0}</div>
              <div className="item1">{game.item1}</div>
              <div className="item2">{game.item2}</div>
              <div className="item3">{game.item3}</div>
              <div className="item4">{game.item4}</div>
              <div className="item5">{game.item5}</div>
              <div className="lane">{game.lane}</div>
              <div className="pinkWard">{game.pinkWard}</div>
              <div className="team">{game.team}</div>
              <div className="win">{game.win}</div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default GameInfoRender;
