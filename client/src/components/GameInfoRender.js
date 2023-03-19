import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { positions } from '@mui/system';

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

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          ...sx,
        }}
        {...other}
      />
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center mt-16">
      <div className="content">
        <div className="winRate">최근 10게임 승률:{winRate}%</div>
        {summonerGameData.map((game, idx) => {
          return (
            <div className="list-none flex p-5" key={idx}>
              <div className="w/1-4 flex flex-col">
                <span className="type">{game.gameType}</span>
                <span className="gameStartTime">{gameDatTranslator(game.gameStartDateTimeStamp)}</span>
                <span className="bar"></span>
                <span className="win">{winAndDefeat(game.win)}</span>
                <span className="gameStartTime">{game.gameDuration}</span>
              </div>

              <div className="w-10">
                <img id="summonerIconImg" src={championIcon(game.championName)} alt="챔피언 아이콘" />
                <span className="champLevel">{game.champLevel}</span>
              </div>
              <span className="kill-death-assist">
                <span>{game.kill}</span>/<span className="death">{game.death}</span>/<span>{game.assist}</span>
                <span className="kda">({getNotRoundDecimalNumber(game.kda)})</span>
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
              <div className="lane">{linePosition(game.lane)}</div>

              <div className="pinkWard">{game.pinkWard}</div>
              <div className="team">{game.team}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameInfoRender;
