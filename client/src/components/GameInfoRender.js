import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import './GameInfoRender.css';

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
          m: 1,
          // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          // border: '1px solid',
          // borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
          borderRadius: 2,
          fontSize: '0.875rem',
          // fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

  return (
    <div className="gameInfoRendering">
      <div className="winRate">최근 10게임 승률:{winRate}%</div>
      <div className="content">
        {summonerGameData.map((game, idx) => {
          console.log(game.championName);
          return (
            <li className="game-container" key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Item>
                  <div className="game">
                    <div className="type">{game.gameType}</div>
                    <div className="gameStartTime">{gameDatTranslator(game.gameStartDateTimeStamp)}</div>
                    <div className="bar"></div>
                    <div className="win">{winAndDefeat(game.win)}</div>
                    <div className="gameStartTime">{game.gameDuration}</div>
                  </div>
                </Item>
              </Box>

              <img
                id="summonerIconImg"
                src={championIcon(game.championName)}
                alt="챔피언 아이콘"
                style={{ height: 42 }}
              />

              <div className="champLevel">lv: {game.champLevel}</div>
              <div className="kill-death-assist">
                <span>{game.kill}</span>/<span className="death">{game.death}</span>/<span>{game.assist}</span>
                <span className="kda">({getNotRoundDecimalNumber(game.kda)})</span>
              </div>
              <div className="totalCs">{game.totalCs}</div>
              {game.item0 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item0)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              {game.item1 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item1)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              {game.item2 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item2)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              {game.item3 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item3)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              {game.item4 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item4)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              {game.item5 !== 0 ? (
                <img id="itemIcon" src={itemIcon(game.item5)} alt="아이탬 아이콘" style={{ height: 42 }} />
              ) : null}
              <div className="lane">{game.lane}</div>
              <div className="pinkWard">{game.pinkWard}</div>
              <div className="team">{game.team}</div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default GameInfoRender;
