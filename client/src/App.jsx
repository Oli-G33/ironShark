import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import AddGamePage from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';
import BookmarksPage from './pages/BookmarksPage';
import SingleGamePage from './pages/SingleGamePage/SingleGamePage';
import ProfileEditPage from './pages/ProfileEditPage';
import SearchPage from './pages/SearchPage';
import AuthenticationContext from './context/authentication';
import { useState, useEffect } from 'react';
import { loadUserInformation } from './services/authentication';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserInformation().then((data) => {
      setUser(data.user);
    });
  }, []);
  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/game/add" element={<AddGamePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/game/:id" element={<SingleGamePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/game/:id/edit" element={<EditGamePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
};

export default App;
