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
    profileLoad(id).then((data) => {
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
          <div className="profile-games-container">
            <h1>Games created by {profile.name}</h1>
            <div className="profile-games-wrapper">
              <div className="profile-games">
                {games.map((game) => (
                  <ul className="li" key={game._id}>
                    <div className="image">
                      <img
                        className="image__img"
                        src={game.cover}
                        alt={game.title}
                      />
                      <div className="image__overlay image__overlay--blur">
                        <div className="image__title">
                          <li className="li">
                            <Link to={`/game/${game._id}`}>{game.title}</Link>
                          </li>
                        </div>
                        <p className="image__description"></p>
                      </div>
                    </div>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default ProfilePage;
