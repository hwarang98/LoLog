import React, { useState, useEffect } from "react";

export interface IAppProps {}

export default function Home(props: IAppProps) {
  interface Summoner {
    summoner: string;
  }
  const [summoner, setSummoner] = useState<Summoner>();

  const searchBtn = () => {};
  return (
    <div className="home">
      <h1>LoLog</h1>
      <input type="text" placeholder="소환사 이름"></input>
      <button>검색</button>
    </div>
  );
}
