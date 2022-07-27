import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";

function Home() {
  // 이름 상태 저장
  const [summoner, setSummoner] = useState("");
  const navigate = useNavigate();

  // 이름
  const onChange = (e) => {
    setSummoner(e.target.value);
  };

  // 엔터
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  // 클릭시 페이지 이동
  const onClick = async () => {
    let response = await axios.post(`http://localhost:4000/api/userInfo`, {
      name: summoner,
    });
    const userData = response.data;
    navigate(`/summoner/${summoner}`, {
      state: userData,
    });
  };

  return (
    <div className="home">
      <h1>LoLog</h1>
      <input
        type="text"
        placeholder="소환사 이름"
        onChange={onChange}
        onKeyPress={onEnter}
      ></input>
      <button onClick={onClick}>Log</button>
    </div>
  );
}

export default Home;
