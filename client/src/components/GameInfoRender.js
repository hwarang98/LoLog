import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { lineIcon } from '../config/config.js';

function GameInfoRender(props) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const { gameInfo, summonerId } = props;

  const championIcon = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${championName}.png`;
  };

  const itemIcon = (itemNum) => {
    return `http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/${itemNum}.png`;
  };

  const gameDatTranslator = (date) => {
    return moment(date).format('MM/DD');
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

  const winRate = (winCount / 10) * 100;
  const winAndDefeat = (result) => {
    switch (result) {
      case true:
        return '승리';

      case false:
        return '패배';

      default:
        break;
    }
  };

  return (
    // <div className="flex flex-wrap items-center justify-center mt-16">
    <div className="flex flex-col items-center mt-16">
      <div className="flex">최근 10게임 승률:{winRate}%</div>
      {summonerGameData.map((game, idx) => {
        return (
          <div className="flex justify-center items-center m-10" key={idx}>
            <div className="flex flex-col pr-14 text-white-font">
              <span className="text-white font-bold">{game.gameType}</span>
              <span className="pb-6">{gameDatTranslator(game.gameStartDateTimeStamp)}</span>
              <span className={`${game.win === true ? 'text-win-color' : 'text-lose-color'}`}>
                {winAndDefeat(game.win)}
              </span>
              <span className="gameStartTime">{game.gameDuration}</span>
            </div>
            <div className="relative">
              <img
                id="summonerIconImg"
                className="w-16"
                src={championIcon(game.championName)}
                alt={game.championName}
              />
              <div className="flex items-center justify-center">
                <span className="absolute rounded px-0.5 font-bold text-white line-height bg-black">
                  {game.champLevel}
                </span>
              </div>
              <span className="lane">{linePosition(game.lane)}</span>
            </div>
            <img src={`${lineIcon.TOP_ICON}`} />
            <span className="kill-death-assist px-4">
              <span className="text-xl px-1 font-bold">{game.kill}</span>/
              <span className="text-xl px-1 text-red-font font-bold">{game.death}</span>/
              <span className="text-xl px-1 font-bold">{game.assist}</span>
              <span className="text-white-font">({getNotRoundDecimalNumber(game.kda)})</span>
            </span>
            <div className="totalCs">{game.totalCs}</div>
            <div className="flex">
              {game.item0 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item0)} alt={game.item0} style={{ height: 42 }} />
              ) : null}

              {game.item1 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item1)} alt={game.item0} style={{ height: 42 }} />
              ) : null}
              {game.item2 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item2)} alt={game.item0} style={{ height: 42 }} />
              ) : null}
              {game.item3 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item3)} alt={game.item0} style={{ height: 42 }} />
              ) : null}
              {game.item4 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item4)} alt={game.item0} style={{ height: 42 }} />
              ) : null}
              {game.item5 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item5)} alt={game.item0} style={{ height: 42 }} />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
    // </div>
  );
}

export default GameInfoRender;
