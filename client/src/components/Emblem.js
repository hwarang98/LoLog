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
          style={{ height: 100, marginLeft: '300px' }}
          alt="Bronze"
        />
      );

    case 'SILVER':
      return (
        <img
          src={require('../images/emblems/Emblem_Silver.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Silver"
        />
      );

    case 'GOLD':
      return (
        <img
          src={require('../images/emblems/Emblem_Gold.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Gold"
        />
      );

    case 'PLATINUM':
      return (
        <img
          src={require('../images/emblems/Emblem_Platinum.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Platinum"
        />
      );

    case 'DIAMOND':
      return (
        <img
          src={require('../images/emblems/Emblem_Diamond.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Diamond"
        />
      );

    case 'MASTER':
      return (
        <img
          src={require('../images/emblems/Emblem_Master.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Master"
        />
      );

    case 'GRANDMASTER':
      return (
        <img
          src={require('../images/emblems/Emblem_Grandmaster.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Grandmaster"
        />
      );

    case 'CHALLENGER':
      return (
        <img
          src={require('../images/emblems/Emblem_Challenger.png')}
          className="userTier"
          style={{ height: 100, marginLeft: '300px' }}
          alt="Challenger"
        />
      );

    default:
      return null;
  }
}

export default Emblem;
