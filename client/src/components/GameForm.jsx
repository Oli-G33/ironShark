const GameForm = ({ game, onGameChange, onGameSubmit, buttonLabel }) => {
  const handleGameFormSubmission = (event) => {
    event.preventDefault();
    onGameSubmit();
  };

  return (
    <form onSubmit={handleGameFormSubmission}>
      {/* title: '', ✅
      gameUrl: '', ✅
      description: '', 
      genre: '', ✅
      price: 'num', 
      inStock:'true', 
      fileSize: 'mb', 
      owner: '', 
      cover: '', 
      screenshots: '', 
      trailer: '' */}

      <label htmlFor="input-title">Game Title</label>
      <label htmlFor="input-gameUrl">Game's Url</label>
      <label htmlFor="input-genre">Select Game Genre</label>
      <select
        id="input-genre"
        value={game.genre}
        onChange={(event) =>
          onGameChange({ ...game, genre: event.target.value })
        }
      >
        <option value="action">Action</option>
        <option value="horror ">Horror</option>
        <option value="adventure">Adventure</option>
        <option value="racing">Racing</option>
        <option value="fighting ">Fighting</option>
        <option value="sports">Sports</option>
      </select>
    </form>
  );
};

//export default GameForm;
