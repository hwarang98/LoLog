import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { lineIcon } from '../config/config.js';

function GameInfoRender(props) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const { gameInfo, summonerId } = props;

  const itemIcon = useMemo(
    () => (itemNum) => `http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/${itemNum}.png`,
    [],
  );

  const championIcon = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${championName}.png`;
  };

  const gameDatTranslator = (date) => {
    return moment(date).format('MM/DD');
  };

  // 2번째 소숫점 자리부터 버리는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 2) => {
    const num = typeof number === 'number' ? String(number) : number;
    const [leftNum, rightNum] = num.split('.');
    const truncatedRightNum = rightNum?.slice(0, decimalPoint);

    const truncatedNum = truncatedRightNum ? `${leftNum}.${truncatedRightNum}` : leftNum;
    return Number(truncatedNum).toFixed(decimalPoint);
  };

  useEffect(() => {
    const filteredGameData = _.filter(gameInfo, (data) => data.summonerId === summonerId);
    const filteredWinCount = _.reduce(filteredGameData, (acc, cur) => acc + cur.win, 0);

    setSummonerGameData(filteredGameData);
    setWinCount(filteredWinCount);
  }, [gameInfo, summonerId]);

  // 라인 한글
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

  /**
   *
   * @param {string} line
   * @returns 각 라안별 아이콘 이미지
   */
  const getLineIcon = (line) => {
    switch (line) {
      case 'TOP':
        return lineIcon.TOP_ICON;
      case 'MIDDLE':
        return lineIcon.MIDDLE_ICON;
      case 'JUNGLE':
        return lineIcon.JUNGLE_ICON;
      case 'BOTTOM':
        return lineIcon.BOTTOM_ICON;
      case 'SUPPORT':
        return lineIcon.SUPPORT_ICON;
      default:
        throw new Error('Invalid line');
    }
  };

  // 10게임 승률 구하는 함수
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
    <div className="flex flex-col items-center mt-16">
      <div className="flex">최근 10게임 승률:{winRate}%</div>
      {summonerGameData.map((game, idx) => {
        const {
          gameType,
          gameStartDateTimeStamp,
          win,
          gameDuration,
          championName,
          champLevel,
          kill,
          death,
          assist,
          kda,
          line,
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
        } = game;
        const isWin = win === true;
        const notRoundKda = getNotRoundDecimalNumber(kda);
        const flexCenter = 'flex justify-center items-center';

        return (
          <div className={`${flexCenter} m-10`} key={idx}>
            <div className="flex flex-col pr-14 text-sm text-white-font">
              <span className="text-white font-bold">{gameType}</span>
              <span className="pb-6">{gameDatTranslator(gameStartDateTimeStamp)}</span>
              <span className={`${isWin ? 'text-win-color' : 'text-lose-color'}`}>{winAndDefeat(isWin)}</span>
              <span className="gameStartTime">{gameDuration}</span>
              <span className="position">{linePosition(line)}</span>
            </div>

            <div className="relative">
              <div className="flex">
                {/* <div className="flex items-center justify-center"> */}
                <div className="asd">
                  <img id="summonerIconImg" className="w-16" src={championIcon(championName)} alt={championName} />
                  <span className="absolute rounded px-0.5 font-bold text-white line-height bg-black">
                    {champLevel}
                  </span>
                </div>

                <span className="kill-death-assist px-4">
                  <span className="text-xl px-1 font-bold">{kill}</span>/
                  <span className="text-xl px-1 text-red-font font-bold">{death}</span>/
                  <span className="text-xl px-1 font-bold">{assist}</span>
                  <span className="flex flex-col text-sm text-white-font">({notRoundKda})</span>
                </span>
              </div>

              <div className="flex">
                {/* <img src={`${getLineIcon(line)}`} className="p-1 mr-8 w-8" alt={line} /> */}
                {item0 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item0)} alt={item0} />}
                {item1 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item1)} alt={item0} />}
                {item2 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item2)} alt={item0} />}
                {item3 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item3)} alt={item0} />}
                {item4 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item4)} alt={item0} />}
                {item5 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item5)} alt={item0} />}
              </div>
            </div>
            {/* 
            <span className="kill-death-assist px-4">
              <span className="text-xl px-1 font-bold">{kill}</span>/
              <span className="text-xl px-1 text-red-font font-bold">{death}</span>/
              <span className="text-xl px-1 font-bold">{assist}</span>
              <span className="flex flex-col text-sm text-white-font">({notRoundKda})</span>
              </div>
              <div className="flex">
                {item0 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item0)} alt={item0} />}
                {item1 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item1)} alt={item0} />}
                {item2 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item2)} alt={item0} />}
                {item3 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item3)} alt={item0} />}
                {item4 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item4)} alt={item0} />}
                {item5 !== 0 && <img id="itemIcon" className="p-1 w-8" src={itemIcon(item5)} alt={item0} />}
            </span> */}
          </div>
        );
      })}
    </div>
  );
}

export default GameInfoRender;
