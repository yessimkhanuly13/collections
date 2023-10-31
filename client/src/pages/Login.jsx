import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../utils/Button';
import axios from 'axios';
import Input from '../utils/Input';
import { Error } from '../App';



function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  const {setError} = useContext(Error);

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
      <Input type="email" name="username" onChange={handleChange} />
      <Input type="password" name="password" onChange={handleChange} />
      <p>Don't have an account? <Link className='hover:text-lime-600' to="/registration">Register here</Link></p>
      <div className='flex'>
          <Button name="Go Back" style="bg-red-600" onClick={() => navigate('/')} />
          <Button name="Submit" style="bg-lime-600" onClick={handleLogin} />
      </div>
    </div>
  )
}

export default Login;
