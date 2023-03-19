import React from 'react';

function Emblem(props) {
  const { tier } = props;

  switch (tier) {
    case 'IRON':
      return (
        <img
          src={require('../images/emblems/Emblem_Iron.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Iron"
        />
      );

    case 'BRONZE':
      return (
        <img
          src={require('../images/emblems/Emblem_Bronze.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Bronze"
        />
      );

    case 'SILVER':
      return (
        <img
          src={require('../images/emblems/Emblem_Silver.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Silver"
        />
      );

    case 'GOLD':
      return (
        <img
          src={require('../images/emblems/Emblem_Gold.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Gold"
        />
      );

    case 'PLATINUM':
      return (
        <img
          src={require('../images/emblems/Emblem_Platinum.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Platinum"
        />
      );

    case 'DIAMOND':
      return (
        <img
          src={require('../images/emblems/Emblem_Diamond.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Diamond"
        />
      );

    case 'MASTER':
      return (
        <img
          src={require('../images/emblems/Emblem_Master.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Master"
        />
      );

    case 'GRANDMASTER':
      return (
        <img
          src={require('../images/emblems/Emblem_Grandmaster.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Grandmaster"
        />
      );

    case 'CHALLENGER':
      return (
        <img
          src={require('../images/emblems/Emblem_Challenger.png')}
          className="userTier"
          style={{ height: 100 }}
          alt="Challenger"
        />
      );

    default:
      return null;
  }
}

export default Emblem;
