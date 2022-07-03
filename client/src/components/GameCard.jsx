import { Link } from 'react-router-dom';
//import './HouseCard.scss';

const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const GameCard = ({ game }) => (
  <div>
    <Link className="game-card" to={`/game/${game._id}`}>
      {/* <img
      src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      alt={game.name}
    /> */}
      <span>{`${game.title} `}</span>

      <small>{`${game.genre} `}</small>
      <small>{formatPrice(game.price)}</small>
      <br />
    </Link>
    <div>
      <Link to="/checkout" state={{ price: game.price }}>
        <button>Buy Now</button>
      </Link>
    </div>
  </div>
);

export default GameCard;
