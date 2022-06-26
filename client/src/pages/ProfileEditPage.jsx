import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../components/AuthenticationForm';
import AuthenticationContext from '../context/authentication';

const ProfileEditPage = () => {
  const [user, setUser] = useState(AuthenticationContext);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Profile</h1>
      <AuthenticationForm user={user} onUserChange={setUser} />
    </div>
  );
};

export default ProfileEditPage;
