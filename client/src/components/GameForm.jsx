import ImageInput from './ImageInput';

const GameForm = ({ game, onGameChange, onGameSubmit, buttonLabel }) => {
  const handleGameFormSubmission = (event) => {
    event.preventDefault();
    onGameSubmit();
  };

  return (
    <form onSubmit={handleGameFormSubmission}>
      <label htmlFor="input-title">Game Title</label>
      <input
        id="input-title"
        type="text"
        placeholder="Game Title"
        value={game.title}
        onChange={(event) =>
          onGameChange({ ...game, title: event.target.value })
        }
      />

      <label htmlFor="input-gameUrl">Game's Url</label>
      <input
        id="input-gameUrl"
        type="text"
        placeholder="Game URL"
        value={game.gameUrl}
        onChange={(event) =>
          onGameChange({ ...game, gameUrl: event.target.value })
        }
      />

      <label htmlFor="input-genre">Select Game Genre</label>
      <select
        id="input-genre"
        value={game.genre}
        onChange={(event) =>
          onGameChange({ ...game, genre: event.target.value })
        }
      >
        <option>Select Genre</option>
        <option value="action">Action</option>
        <option value="horror">Horror</option>
        <option value="adventure">Adventure</option>
        <option value="racing">Racing</option>
        <option value="fighting">Fighting</option>
        <option value="sports">Sports</option>
      </select>

      <label htmlFor="input-price">Game's price</label>
      <input
        id="input-price"
        type="number"
        step="0.1"
        min={0}
        placeholder="Insert Price"
        value={game.price}
        onChange={(event) =>
          onGameChange({ ...game, price: event.target.valueAsNumber })
        }
      />
      <label htmlFor="input-cover">Game cover</label>
      <input
        id="input-cover"
        type="text"
        placeholder="Game Cover"
        value={game.cover}
        onChange={(event) =>
          onGameChange({ ...game, cover: event.target.value })
        }
      />
      <>
        <label htmlFor="input-screenshots">Game screenshots</label>
        <input
          id="input-screenshots"
          type="text"
          placeholder="Game Screenshots"

          // onChange={(event) =>
          //   onGameChange({ ...game, screenshots: event.target.value })
          // }
        />
        <ImageInput
          image={game.screenshots[0]}
          onImageChange={(screenshots) =>
            onGameChange({
              ...game,
              screenshots: [...game.screenshots, screenshots]
            })
          }
        />
        <ImageInput
          image={game.screenshots[1]}
          onImageChange={(screenshots2) =>
            onGameChange({
              ...game,

              screenshots: [...game.screenshots, screenshots2]
            })
          }
        />
        <ImageInput
          image={game.screenshots[2]}
          onChange={(screenshots3) =>
            onGameChange({
              ...game,

              screenshots: [...game.screenshots, screenshots3]
            })
          }
        />
      </>
      <label htmlFor="input-trailer">Game trailer</label>
      <input
        id="input-trailer"
        type="text"
        placeholder="Game Trailer"
        value={game.trailer}
        onChange={(event) =>
          onGameChange({ ...game, trailer: event.target.value })
        }
      />

      <label htmlFor="input-description">Game description</label>
      <textarea
        id="input-description"
        placeholder="Write here your game description"
        value={game.description}
        onChange={(event) =>
          onGameChange({ ...game, description: event.target.value })
        }
      />

      <button>{buttonLabel}</button>
    </form>
  );
};

export default GameForm;

//  {/* title: '', ✅
//       gameUrl: '', ✅
//       description: '',
//       genre: '', ✅
//       price: 'num', ✅
//       cover: '', ✅
//       screenshots: '', ✅
//       trailer: '' */}✅
