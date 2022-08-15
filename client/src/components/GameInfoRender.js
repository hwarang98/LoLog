import React from "react";
import axios from "axios";
import "./GameInfoRender.css";

function GameInfoRender(props) {
  const { gameInfo } = props;

  const championIcon = async () => {
    const getIcon = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion.json"
    );
    console.log();
  };

  // 2번째 소숫점 자리부터 버리는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 2) => {
    let num = typeof number === "number" ? String(number) : number;
    const pointPos = num.indexOf(".");

    if (pointPos === -1) return Number(num).toFixed(decimalPoint);

    const splitNumber = num.split(".");
    const rightNum = splitNumber[1].substring(0, decimalPoint);
    return Number(`${splitNumber[0]}.${rightNum}`).toFixed(decimalPoint);
  };
  // teamId 200 = 레드팀
  // teamId 100 = 블루팀
  return (
    <div className="gameInfoRendering">
      {gameInfo.map((item, index) => {
        console.log("item: ", item);
        return (
          <div className="gameInfo" key={index}>
            <li className="gameList">
              챔피언 이름: {item.championName}
              레벨: {item.champLevel}
              챔피언 ID: {item.championId}
              {item.kills}/{item.deaths}/{item.assists}
              {item.deaths === 0
                ? "Perfect"
                : `(${getNotRoundDecimalNumber(item.kda)})`}
              총 딜량: {item.totalDamageDealtToChampions}
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
              {item.teamId === 200 ? "레드팀" : "블루팀"}
              라인: {item.teamPosition}
              {item.win === true ? "승리" : "패배"}
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default GameInfoRender;
