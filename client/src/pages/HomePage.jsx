import { useEffect, useState } from 'react';
import { listGameData } from './../services/base';
import GameCard from '../components/GameCard';

const HomePage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    listGameData().then(data => {
      setGames(data.games);
    });
  }, []);

  return (
    <div>
      <h1>IronShark</h1>
      <h2>Some of our latest Games</h2>
      {games.map(game => (
        // <ul>
        //   <li>{game.title}</li>
        // </ul>

        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
};

export default HomePage;
