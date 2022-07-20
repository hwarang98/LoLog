import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  // 이름 상태 저장
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // 이름
  const onChange = (e) => {
    setName(e.target.value);
  };

  // 클릭시 페이지 이동
  const onClick = () => {
    navigate("/summoner");
  };
  return (
    <div className="home">
      <h1>LoLog</h1>
      <input type="text" placeholder="소환사 이름" onChange={onChange}></input>
      <button onClick={onClick}>Log</button>
    </div>
  );
}

export default Home;
