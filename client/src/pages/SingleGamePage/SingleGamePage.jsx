import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthenticationContext from '../../context/authentication';
import ProfileCard from '../../components/ProfileCard';

import { gameLoad } from '../../services/games';
const formatPrice = price =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const SingleGamePage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  useEffect(() => {
    gameLoad(id).then(data => setGame(data.game));
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {game && (
        <>
          <h1>{game.title}</h1>
          <h3>{game.gameUrl}</h3>
          <h3>{game.description}</h3>
          <h3>{game.genre}</h3>
          <h3>{formatPrice(game.price)}</h3>
          <ProfileCard profile={game.owner} />
          {user && game.owner._id === user._id && (
            <Link to={`/game/${id}/edit`}> Edit Game</Link>
          )}
        </>
      )}
    </div>
  );
};

export default SingleGamePage;

//  {/* title: '', ✅
//       gameUrl: '', ✅
//       description: '',
//       genre: '', ✅
//       price: 'num', ✅
//       cover: '', ✅
//       screenshots: '', ✅
//       trailer: '' */}✅
