import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProfilePage.scss';

import AuthenticationContext from '../../context/authentication';
import { profileLoad } from '../../services/profile';

const ProfilePage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    profileLoad(id).then(data => {
      console.log(data.profile);
      setProfile(data.profile);
      setGames(data.games);
    });
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="profile-page">
      {profile && (
        <header>
          <img
            src={profile.picture || './../../DefaultUserImg.png'}
            alt={profile.name}
          />
          <h1>{profile.name}</h1>
          <h3>{profile.email}</h3>
          <h1>Games created by {profile.name}</h1>
          {games.map(game => (
            <ul key={game._id}>
              <li>
                <Link to={`/game/${game._id}`}>{game.title}</Link>
              </li>
            </ul>
          ))}
        </header>
      )}

      {user && user._id === id && (
        <div>
          <Link className="btn" to="/profile/edit">
            Edit Profile
          </Link>
          <div>
            <Link to="../game/add">Upload Game</Link>{' '}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
