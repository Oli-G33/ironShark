import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameForm from '../components/GameForm';

import { gameAdd } from '../services/games';

const AddGamePage = () => {
  const [game, setGame] = useState({
    title: '',
    gameUrl: '',
    description: '',
    genre: [],
    price: 0,
    cover: '',
    screenshots: [],
    trailer: ''
  });

  const navigate = useNavigate();
  const handleGameCreation = () => {
    gameAdd(game).then((data) => {
      const id = data.game._id;
      navigate(`/game/${id}`);
    });
  };

  return (
    <div>
      <h1>Add new game</h1>
      {/* <GameForm
        game={game}
        //onGameChange={setGame}
        //onGameSubmit={handleGameCreation}
        buttonLabel="Add Game"
      /> */}
    </div>
  );
};

export default AddGamePage;
