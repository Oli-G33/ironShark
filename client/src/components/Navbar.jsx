import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/authentication/sign-up">Sign up</Link>
      <Link to="/authentication/login">Log in</Link>
      {/* <Link to="/">{user.name}'s Profile</Link> */}
      <Link to="/authentication/sign-out">Sign out</Link>
    </nav>
  );
};

export default Navbar;
