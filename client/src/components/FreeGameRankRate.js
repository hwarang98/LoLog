import React from "react";

function FreeGameRankRate(props) {
  const { wins, losses } = props;
  // 자유랭크 승률
  const freeRankGameSum = wins + losses;
  const freeRankGameRate = Math.ceil((wins / freeRankGameSum) * 100);
  return (
    <div className="gameRateInfo">
      <div className="win">승리: {wins}</div>
      <div className="losse">패배: {losses}</div>
      <div className="gaemWinRate">승률: {freeRankGameRate}%</div>
    </div>
  );
}

export default FreeGameRankRate;
