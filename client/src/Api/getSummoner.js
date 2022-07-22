import axios from "axios";

const url = "https://kr.api.riotgames.com";
const headers = {
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": `${process.env.REACT_APP_API_KEY}`,
};

export const getSummoner = (summonerName) => {
  console.log(process.env.REACT_APP_API_KEY);
  axios
    .get(
      `/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}?api_key=${
        process.env.REACT_APP_API_KEY
      }`,
      {
        headers,
        withCredentials: true,
      }
    )
    .then((data) => {
      console.log(data);
    });
};
