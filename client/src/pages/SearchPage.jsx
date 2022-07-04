import { useEffect, useState } from 'react';
import { listGameData } from './../services/base';
import GameCard from '../components/GameCard';
import SearchBox from '../components/SearchBox';
import Form from 'react-bootstrap/Form';

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

  useEffect(() => {
    listGameData().then(data => {
      setGames(data.games);
    });
  }, []);

  const checkMax = Math.max(...games.map(o => o.price)) + 5;

  const onSearchChange = event => {
    const setSearchString = event.target.value.toLocaleLowerCase();
    setSearchField(setSearchString);
  };

  const [genres, setGenres] = useState([]);
  const [price, setPrice] = useState(0);

  const filteredGames = games.filter(game => {
    if (genres.length && !genres.includes(game.genre)) {
      return false;
    } else if (game.price >= price) {
      return false;
    }
    return game.title.toLocaleLowerCase().includes(searchField);
  });

  return (
    <div>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search games"
      />
      <br></br>
      {filteredGames.map(game => (
        // <ul>
        //   <li>{game.title}</li>
        // </ul>
        <GameCard key={game._id} game={game} />
      ))}
      {possibleGenres.map(genre => (
        <Form.Check
          label={genre.label}
          checked={genres.includes(genre.value)}
          onChange={event => {
            const checked = event.target.checked;
            if (checked) {
              setGenres([...genres, genre.value]);
            } else {
              setGenres(genres.filter(item => item !== genre.value));
            }
          }}
        />
      ))}
      <label>
        Price
        <input
          id="typeinp"
          type="range"
          min="0"
          max={checkMax}
          //value="1"
          onChange={event => {
            const number = event.target.value;

            setPrice(number);
          }}
          step="5"
        />
      </label>
    </div>
  );
};

export default SearchPage;
