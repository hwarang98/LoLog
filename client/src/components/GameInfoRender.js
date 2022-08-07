import React from "react";

function GameInfoRender(props) {
  const { gameInfo } = props;

  // teamId 200 = 레드팀
  // teamId 100 = 블루팀
  return (
    <div className="gameInfoRendering">
      {gameInfo.map((item, index) => {
        console.log("item: ", item);
        return (
          <ul key={index}>
            <li>챔피언 이름: {item.championName}</li>
            <li>레벨: {item.champLevel}</li>
            <li>챔피언 ID: {item.championId}</li>
            <li>
              {item.kills}/{item.deaths}/{item.assists}{" "}
              {item.deaths === 0 ? "Perfect" : `(${item.kda})`}
            </li>
            <li>총 딜량: {item.totalDamageDealtToChampions}</li>
            <li>받은 피해량: {item.totalDamageTaken}</li>
            <li>솔킬 횟수: {item.soloKills}</li>
            <li>퍼스트 블러드: {item.firstBloodKill}</li>
            <li>더블킬 횟수: {item.doubleKills}</li>
            <li>트리플킬 횟수: {item.tripleKills}</li>
            <li>팬타킬 횟수: {item.pentaKills}</li>
            <li>아이탬1: {item.item0}</li>
            <li>아이탬2: {item.item1}</li>
            <li>아이탬3: {item.item2}</li>
            <li>아이탬4: {item.item3}</li>
            <li>아이탬5: {item.item4}</li>
            <li>아이탬6: {item.item5}</li>
            <li>아이탬7: {item.item6}</li>
            <li>{item.teamId === 200 ? "레드팀" : "블루팀"}</li>
            <li>라인: {item.teamPosition}</li>
            <li>{item.win === true ? "승리" : "패배"}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default GameInfoRender;
