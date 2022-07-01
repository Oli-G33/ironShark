import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { gameEdit, gameLoad } from '../services/games';

const EditGamePage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  const navigate = useNavigate();

  const handleGameEdit = () => {
    gameEdit(id, game).then((data) => {
      navigate(`/game/${id}`);
    });
  };

  useEffect(() => {
    gameLoad(id).then((data) => setGame(data.game));
  }, [id]);

  return (
    <div>
      <h1>Edit Game</h1>
      {game && (
        <GameForm
          game={game}
          onGameChange={setGame}
          onGameSubmit={handleGameEdit}
          buttonLabel="Edit Game"
        />
      )}
    </div>
  );
};

export default EditGamePage;
