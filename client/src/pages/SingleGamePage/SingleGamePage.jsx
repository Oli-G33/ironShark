import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const SingleGamePage = () => {

  const {gameInfo} = props;

  const [game, setGame] = useState(null)
  let {id} = useParams();

  useEffect(() => {
    getGame(id).then((gameData))
  })
  
  return (
  <div>
    <h1>SingleGamePage<h1>
    </div>

)
};

export default SingleGamePage;
