import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import axios from 'axios';
import Input from '../utils/Input';
import Popup from '../components/Popup';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = () => {
    axios.post(`https://finalprojectserver.vercel.app/auth/login`, user)
      .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/profile');
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
        setUser({});
      });
  }


  return (
    <div className='flex flex-col items-center'>
      {error && <Popup message={error} handleCloseError={()=>setError('')}/>}
      <Input type="email" name="username" onChange={handleChange} />
      <Input type="password" name="password" onChange={handleChange} />
      <Button name="Go back" style="bg-red-600" onClick={() => navigate('/home')} />
      <Button name="Submit" style="bg-lime-600" onClick={handleLogin} />
    </div>
  )
}

export default Login;
