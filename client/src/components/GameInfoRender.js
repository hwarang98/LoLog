import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './GameInfoRender.css';

function GameInfoRender(props) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const { gameInfo, winCount, summonerId } = props;

  // 전체 게임 승률
  const recentGames = (winCount / 10) * 100;

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
    _.map(gameInfo, (game) => {
      if (game.summonerId === summonerId) {
        setSummonerGameData(game);
      }
    });
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

  // teamId 200 = 레드팀
  // teamId 100 = 블루팀

  const championIcon = `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${summonerGameData.championName}.png`;

  //  {<img id="userIconImg" src={championIcon} alt="챔피언 아이콘" style={{ height: 42 }} />}

  return (
    <div className="gameInfoRendering">
      <div className="recentGames">최근 10게임 승률:{recentGames}%</div>
      <div className="gameInfo">
        <img id="userIconImg" src={championIcon} alt="챔피언 아이콘" style={{ height: 42 }} />
        {summonerGameData.role === 'SOLO' ? '솔랭' : '자랭'}&nbsp;
        {summonerGameData.win === true ? '승리' : '패배'}&nbsp;
        {linePosition(summonerGameData.individualPosition)}&nbsp;
        {summonerGameData.kills}/{summonerGameData.deaths}/{summonerGameData.assists}&nbsp;
        {/* kda:{' '} */}
        {/* {summonerGameData.challenges.kda}&nbsp; */}
        미니언: {summonerGameData.totalMinionsKilled}
      </div>
    </div>
  );
}

export default GameInfoRender;

/*
{_.map(gameInfo, (item, idx) => {
        return (
          <div className="gameInfo" key={idx}>
            <li className="gameList">
              챔피언 이름: {item.championName}
              레벨: {item.champLevel}
              챔피언 ID: {item.championId}
              {item.kills}/{item.deaths}/{item.assists}
              {item.deaths === 0 ? 'Perfect' : `(${getNotRoundDecimalNumber(item.challenges.kda)})`}총 딜량:{' '}
              {item.totalDamageDealtToChampions}
              받은 피해량: {item.totalDamageTaken}
              솔킬 횟수: {item.soloKills}
              퍼스트 블러드: {item.firstBloodKill}
              더블킬 횟수: {item.doubleKills}
              트리플킬 횟수: {item.tripleKills}
              팬타킬 횟수: {item.pentaKills}
              아이탬1: {item.item0}
              아이탬2: {item.item1}
              아이탬3: {item.item2}
              아이탬4: {item.item3}
              아이탬5: {item.item4}
              아이탬6: {item.item5}
              아이탬7: {item.item6}
              {item.teamId === 200 ? '레드팀' : '블루팀'}
              라인: {item.teamPosition}
              {item.win === true ? '승리' : '패배'}
            </li>
          </div>
        );
      })}
*/
