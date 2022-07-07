import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import AuthenticationContext from '../context/authentication';
import { signOutUser } from './../services/authentication';

const Navbar = () => {
  const { user, setUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
      navigate('/');
    });
  };
  return (
    <nav className="navigation">
      <Link className="Home-link" to="/">
        {' '}
        <img className="shark-logo" src="./../../Logo17.png" alt="GameShark" />
      </Link>
      <div className="pages-link">
        <Link to="/search">Browse Games</Link>
        {(user && (
          <>
            <img
              className="user-image"
              src={user.picture || './../../DefaultUserImg.png'}
              alt={user.name}
            />
            <Link to={`/profile/${user._id}`}>{user.name}'s Profile</Link>

            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/log-in">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
