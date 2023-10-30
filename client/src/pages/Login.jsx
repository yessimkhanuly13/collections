import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import axios from 'axios';
import Input from '../utils/Input';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = () => {
    axios.post(`https://finalprojectserver.vercel.app/auth/login`, user)
      .then((res) => {
        navigate(`/users/${res.data.username}`);
      })
      .catch((e) => {
        console.log(e);
        setUser({});
      });
  }

  useEffect(() => {
      
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <Input type="email" name="username" onChange={handleChange} />
      <Input type="password" name="password" onChange={handleChange} />
      <Button name="Go back" style="bg-red-600" onClick={() => navigate('/home')} />
      <Button name="Submit" style="bg-lime-600" onClick={handleLogin} />
    </div>
  )
}

export default Login;
