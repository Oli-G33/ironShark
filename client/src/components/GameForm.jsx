import ImageInput from './ImageInput';
import './GameForm.scss';

const GameForm = ({ game, onGameChange, onGameSubmit, buttonLabel }) => {
  const handleGameFormSubmission = (event) => {
    event.preventDefault();
    onGameSubmit();
  };

  return (
    <div className="addForm">
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
          <option value="Action">Action</option>
          <option value="Horror">Horror</option>
          <option value="Adventure">Adventure</option>
          <option value="Racing">Racing</option>
          <option value="Fighting">Fighting</option>
          <option value="Sports">Sports</option>
        </select>

        <label htmlFor="input-price">Game's price</label>
        <input
          id="input-price"
          type="number"
          step="1"
          min={1}
          placeholder="Insert Price"
          value={game.price}
          onChange={(event) =>
            onGameChange({ ...game, price: event.target.valueAsNumber })
          }
        />
        <label htmlFor="input-cover">Game cover</label>
        {/* <input
        id="input-cover"
        // type="text"
        // placeholder="Game Cover"
        // value={game.cover}
        // onChange={(event) =>
        //   onGameChange({ ...game, cover: event.target.value })
        // }
      /> */}
        <ImageInput
          image={game.cover}
          onImageChange={(cover2) =>
            onGameChange({
              ...game,
              cover: cover2
            })
          }
        />
        <>
          <label htmlFor="input-screenshots">Game screenshots</label>
          {/* <input
          id="input-screenshots"
          type="text"
          placeholder="Game Screenshots"

          // onChange={(event) =>
          //   onGameChange({ ...game, screenshots: event.target.value })
          // }
        /> */}
          <ImageInput
            image={game.screenshots[0]}
            onImageChange={(screenshots) =>
              onGameChange({
                ...game,
                screenshots: [...game.screenshots, screenshots]
              })
            }
          />
          <br></br>
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

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <button>{buttonLabel}</button>
      </form>
    </div>
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
