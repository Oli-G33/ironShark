import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthenticationContext from '../context/authentication';
import './GameCard.scss';

const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const GameCard = ({ game }) => {
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="card-container">
      <div className="card-image">
        <Link className="game-card" to={`/game/${game._id}`}>
          <img
            src={
              game.cover
                ? game.cover
                : 'https://images.unsplash.com/photo-1555864400-cc47dd93d427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80'
            }
            alt={game.name}
          />
        </Link>
      </div>
      <div className="card-body">
        <h4>{`${game.title} `}</h4>
        <p>{`${game.genre} `}</p>
        <p>{game.price > 0 && formatPrice(game.price)}</p>
        <div className="btn-buy-container">
          {(user && (
            <Link
              to="/checkout"
              state={{ price: game.price, gameTitle: game.title }}
            >
              <button className="nav-button" variant="primary">
                Buy Now
              </button>
            </Link>
          )) || (
            <Link to="/sign-up">
              <button className="nav-button" variant="primary">
                Buy Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
