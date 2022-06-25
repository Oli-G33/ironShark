import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import CartPage from './pages/CartPage';
import BookmarksPage from './pages/BookmarksPage';
import SingleGamePage from './pages/SingleGamePage/SingleGamePage';
import ProfileEditPage from './pages/ProfileEditPage';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authentication/sign-up" element={<SignUpPage />} />
        <Route path="/authentication/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/game/:id" element={<SingleGamePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
