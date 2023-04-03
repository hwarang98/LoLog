import React from 'react';

function SoloGameRate(props) {
  const { wins, losses, winCount } = props;

  const allGameWinRate = (winCount / 10) * 100;

  // 솔로랭크 승률
  const soloRankGameSum = wins + losses;
  const soloRankGameRate = Math.ceil((wins / soloRankGameSum) * 100);
  return (
    <div className="gameRateInfo">
      <div className="soloRankGameInfo">
        {wins && losses && winCount ? `승률: ${soloRankGameRate}% (${wins}승 ${losses}패)` : `승률: 0% (0승 0패)`}
      </div>
      <div className="recentGames">최근 10 게임 승률: {allGameWinRate}%</div>
    </div>
  );
}

export default SoloGameRate;
