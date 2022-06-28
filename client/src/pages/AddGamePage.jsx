import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameAdd } from '../services/games';

const AddGamePage = () => {
  const [game, setGame] = useState({
    title: '',

    gameUrl: '',

    description: '',

    genre: '',

    price: 'num',

    inStock: 'true',

    fileSize: 'mb',

    owner: '',

    cover: '',

    screenshots: '',

    trailer: ''
  });

  const navigate = useNavigate();
  const handleGameCreation = () => {
    gameAdd(game).then((data) => {
      const id = data.hame._id;
      navigate(`/game/${id}`);
    });
  };

  return (
    <div>
      <h1>Add new game</h1>
      <GameForm
        game={game}
        onGameChange={setGame}
        onGameSubmit={handleGameCreation}
        buttonLabel="Add Game"
      />
    </div>
  );
};

export default AddGamePage;
