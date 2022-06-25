import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AuthenticationContext from '../context/authentication';
import { profileLoad } from '../services/profile';

const ProfilePage = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  // const [games, setGames] = useState([]);

  useEffect(() => {
    profileLoad(id).then(data => {
      setProfile(data.profile);
      // setGames(data.games);
    });
  }, [id]);

  const { user } = useContext(AuthenticationContext);

  return (
    <div className="profile-page">
      {profile && (
        <header>
          <img src={profile.picture} alt={profile.name} />
          <h1>{profile.name}</h1>
        </header>
      )}
      {user && user._id === id && (
        <Link className="btn" to="/profile/edit">
          Edit Profile
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
