import React from "react";

function Profile(props) {
  const { name, level, leagueType } = props;
  return (
    <div className="profile">
      {/* <img src="example" alt="유저 아이콘" /> */}
      <h2 className="name">{name}</h2>
      <div className="level">{level}</div>
      <div className="leagueType">
        {leagueType === "RANKED_SOLO_5x5" && "솔로랭크"}
      </div>
    </div>
  );
}

export default Profile;
