import React from "react";

function SoloGameRate(props) {
  const { wins, losses } = props;
  // 솔로랭크 승률
  const soloRankGameSum = wins + losses;
  const soloRankGameRate = Math.ceil((wins / soloRankGameSum) * 100);
  return (
    <div className="gameRateInfo">
      <div className="win">승리: {wins}</div>
      <div className="losse">패배: {losses}</div>
      <div className="gaemWinRate">승률: {soloRankGameRate}%</div>
      <div>최근 20 게임 승률: 75%</div>
    </div>
  );
}

export default SoloGameRate;
