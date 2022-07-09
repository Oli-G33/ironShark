import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../context/authentication';
import ProfileCard from '../../components/ProfileCard';
import { gameLoad } from '../../services/games';
import { gameDelete } from '../../services/games';
import ReactPlayer from 'react-player';

import './SingleGamePage.scss';

const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const SingleGamePage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    gameLoad(id).then((data) => setGame(data.game));
  }, [id]);

  const handleGameDelete = () => {
    gameDelete(id, game).then((data) => {
      navigate(`/`);
    });
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {game && (
        <>
          <div className="summary-container">
            <div className="summary-text">
              <div className="game-action">
                <h1>{game.title}</h1>

                <div className="action-button">
                  {user && game.owner._id === user._id && (
                    <Link to={`/game/${id}/edit`} className="button-size">
                      {' '}
                      Edit Game
                    </Link>
                  )}

                  {user && game.owner._id === user._id && (
                    <button onClick={handleGameDelete} className="button-size">
                      {' '}
                      Delete Game
                    </button>
                  )}
                </div>
              </div>
              <h3>{game.genre}</h3>

              <div className="buy-button">
                <h3>{formatPrice(game.price)}</h3>
                <Link to="/checkout" state={{ price: game.price }}>
                  <button className="button-size">Buy Now</button>
                </Link>
              </div>
              <h3>{game.description}</h3>
              <h3>Trailer</h3>
              <ReactPlayer url={game.trailer} />
              {console.log(game.trailer)}
              <ProfileCard profile={game.owner} />
            </div>

            <div className="game-screenshots">
              {game.screenshots.map((value) => (
                <img src={value} alt={value} />
              ))}
            </div>
          </div>
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
