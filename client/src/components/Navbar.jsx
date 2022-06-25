import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import AuthenticationContext from '../context/authentication';
import { signOutUser } from './../services/authentication';

const Navbar = () => {
  const { user, setUser } = useContext(AuthenticationContext);
  console.log(user);

  const handleSignOut = () => {
    signOutUser().then(() => {
      setUser(null);
    });
  };
  return (
    <nav>
      <Link to="/">Home</Link>

      {(user && (
        <>
          <aside>
            <Link to={`/profile/${user._id}`}>{user.name}'s Profile</Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </aside>
        </>
      )) || (
        <>
          <aside>
            <Link to="/log-in">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </aside>
        </>
      )}
    </nav>
  );
};

export default Navbar;
