import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import axios from 'axios';
import { CurrentUser } from '../App';
import Input from '../utils/Input';

function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = () => {
    axios.post(`http://localhost:3434/auth/login`, user)
      .then((res) => {
        setCurrentUser(res.data);
        // navigate('/profile/:id');
      })
      .catch((e) => {
        console.log(e);
        setUser({});
      });
  }

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className='flex flex-col items-center'>
      <Input type="email" name="username" onChange={handleChange} />
      <Input type="password" name="password" onChange={handleChange} />
      <Button name="Go back" onClick={() => navigate('/')} />
      <Button name="Submit" onClick={handleLogin} />
    </div>
  )
}

export default Login;
