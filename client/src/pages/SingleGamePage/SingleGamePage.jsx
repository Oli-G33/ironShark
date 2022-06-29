import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gameLoad } from '../../services/games';
const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const SingleGamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    gameLoad(id).then((data) => setGame(data.game));
  }, [id]);

  return (
    <div>
      {game && (
        <>
          <h1>{game.title}</h1>
          <h3>{game.gameUrl}</h3>
          <h3>{game.description}</h3>
          <h3>{game.genre}</h3>
          <h3>{formatPrice(game.price)}</h3>
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
