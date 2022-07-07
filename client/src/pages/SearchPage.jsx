import { useEffect, useState } from 'react';
import { listGameData } from './../services/base';
import GameCard from '../components/GameCard';
import SearchBox from '../components/SearchBox';
import Form from 'react-bootstrap/Form';
import './SearchPage.scss';

const possibleGenres = [
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Horror', value: 'horror' },
  { label: 'Racing', value: 'racing' },
  { label: 'Sports', value: 'sports' }
];

const SearchPage = () => {
  const [games, setGames] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [genres, setGenres] = useState([]);
  const [price, setPrice] = useState(0);
  const filteredGames = games.filter((game) => {
    if ((genres.length && !genres.includes(game.genre)) || price < game.price) {
      return false;
    }
    // else if (game.price > price) {
    //   return false;
    // }
    return game.title.toLocaleLowerCase().includes(searchField);
  });
  useEffect(() => {
    listGameData().then((data) => {
      setGames(data.games);
    });
  }, []);

  const checkMax = Math.max(...games.map((o) => o.price)) + 5;
  console.log(checkMax);

  const onSearchChange = (event) => {
    const setSearchString = event.target.value.toLocaleLowerCase();
    setSearchField(setSearchString);
  };

  console.log(filteredGames);
  return filteredGames.length ? (
    <div>
      <div className="search-bar">
        <SearchBox
          className="game-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search games"
        />
      </div>
      <br></br>
      {/* {filteredGames.length &&
        filteredGames.map((game) => {
          return (
            <>
              <p>hello</p>
            </>
          );
        })} */}

      <div className="content-container">
        <div className="card-wrapper">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

        <div className="game-filter">
          {possibleGenres.map((genre) => (
            <Form.Check
              label={genre.label}
              checked={genres.includes(genre.value)}
              onChange={(event) => {
                const checked = event.target.checked;
                if (checked) {
                  setGenres([...genres, genre.value]);
                } else {
                  setGenres(genres.filter((item) => item !== genre.value));
                }
              }}
            />
          ))}

          <label>
            Price below {price} €
            <input
              id="typeinp"
              type="range"
              min="0"
              max={checkMax}
              step="5"
              onChange={(event) => {
                const number = event.target.value;
                console.log(number);
                setPrice(number);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div>
        <div className="search-bar">
          <SearchBox
            className="game-search-box"
            onChangeHandler={onSearchChange}
            placeholder="search games"
          />
        </div>
        <br></br>
        {/* {filteredGames.length &&
        filteredGames.map((game) => {
          return (
            <>
              <p>hello</p>
            </>
          );
        })} */}

        <div className="content-container">
          <div className="card-wrapper">
            {games.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>

          <div className="game-filter">
            {possibleGenres.map((genre) => (
              <Form.Check
                label={genre.label}
                checked={genres.includes(genre.value)}
                onChange={(event) => {
                  const checked = event.target.checked;
                  if (checked) {
                    setGenres([...genres, genre.value]);
                  } else {
                    setGenres(genres.filter((item) => item !== genre.value));
                  }
                }}
              />
            ))}

            <label>
              Price below {price} €
              <input
                id="typeinp"
                type="range"
                min="0"
                max={checkMax}
                step="5"
                onChange={(event) => {
                  const number = event.target.value;
                  console.log(number);
                  setPrice(number);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
