import { useEffect, useState } from 'react';
import { listGameData } from './../services/base';
import GameCard from '../components/GameCard';
import SearchBox from '../components/SearchBox';
import Form from 'react-bootstrap/Form';

const SearchPage = () => {
  const [games, setGames] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  useEffect(() => {
    listGameData().then((data) => {
      setGames(data.games);
    });
  }, []);

  useEffect(() => {
    const newFilteredGames = games.filter((game) => {
      console.log(game);
      return game.title.toLocaleLowerCase().includes(searchField);
    });
    setFilteredGames(newFilteredGames);
  }, [games, searchField]);

  const onSearchChange = (event) => {
    const setSearchString = event.target.value.toLocaleLowerCase();
    setSearchField(setSearchString);
  };

  return (
    <div>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search games"
      />
      <br></br>
      {filteredGames.map((game) => (
        // <ul>
        //   <li>{game.title}</li>
        // </ul>
        <GameCard key={game._id} game={game} />
      ))}
      <Form.Check
        // type=hello
        // id={`default-${type}`}
        label="Action"
      />
      <Form.Check
        // type=hello
        // id={`default-${type}`}
        label="Adventure"
      />
    </div>
  );
};

export default SearchPage;
