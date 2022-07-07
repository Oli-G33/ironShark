import { useEffect, useState } from 'react';
import { listGameData } from './../services/base';
import GameCard from '../components/GameCard';
import './HomePage.scss';

const HomePage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    listGameData().then((data) => {
      setGames(data.games);
    });
  }, []);

  return (
    <div>
      <h1>IronShark</h1>
      <h2>Recently added</h2>
      <div className="cards-home-container">
        <div className="card-wrapper">
          {games
            .map((game) => <GameCard key={game._id} game={game} />)
            .slice(0, 10)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
