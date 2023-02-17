import React, { useEffect, useState } from 'react';
import './GameInfoRender.css';

function GameInfoRender(props) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const [summoner, setSummoner] = useState([]);
  const { gameInfo, summonerId } = props;

  // 전체 게임 승률
  const recentGames = (winCount / 10) * 100;
  const championIcon = (championName) => {
    return `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${championName}.png`;
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
    const gameAllData = [];

    gameInfo.map((game) => {
      const gameData = game.info.participants;

      gameData.forEach((data) => {
        if (data.summonerId === summonerId) {
          return gameAllData.push(data);
        }
      });
    });

    return setSummonerGameData([...gameAllData]);
  }, []);

  // useEffect(() => {
  //   const summonerId = [];

  //   _.map(gameInfo, (game) => {
  //     const gameWithSummoner = game.metadata.participants;

  //     _.each(gameWithSummoner, (summoner) => {
  //       return summonerId.push(summoner);
  //     });
  //   });

  //   return setSummoner([...summonerId]);
  // }, []);

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

  return (
    <div className="gameInfoRendering">
      <div className="recentGames">최근 10게임 승률:{recentGames}%</div>
      {summonerGameData.map((item, idx) => {
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
              라인: {linePosition(item.teamPosition)}
              {item.win === true ? '승리' : '패배'}
            </li>
          </div>
        );
      })}
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

/*
{_.map(summonerGameData, (data, idx) => {
        return (
          <div className="gameInfo" key={idx}>
            <img id="userIconImg" src={championIcon(data.championName)} alt="챔피언 아이콘" style={{ height: 42 }} />
            {data.role === 'SOLO' ? '솔랭' : '자랭'}&nbsp;
            {data.win === true ? '승리' : '패배'}&nbsp;
            {linePosition(data.individualPosition)}&nbsp;
            {data.kills}/{data.deaths}/{data.assists}&nbsp;
            { kda: {data.challenges.kda}&nbsp; }
            미니언: {data.totalMinionsKilled}
          </div>
        );
      })}
*/
