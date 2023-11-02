import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';
import Input from '../components/Input';
import { PopupContext } from '../App';



function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  const {setMessage, url} = useContext(PopupContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleLogin = () => {
    axios.post(`${url}/auth/login`, user)
      .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/profile');
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
        setUser({});
      });
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <div className="text-2xl text-center font-semibold mb-4">Login</div>
        <div className="flex flex-col items-center">
          <Input type="email" name="username" placeholder="Username" onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <p className="text-sm text-gray-500 text-center my-2">
            Don't have an account? <Link className="text-lime-600 hover:underline" to="/registration">Register here</Link>
          </p>
        </div>
        <div className="flex justify-around mt-4">
          <Button name="Go Back" style="bg-red-600" onClick={() => navigate('/')} />
          <Button name="Submit" style="bg-lime-600" onClick={handleLogin} />
        </div>
      </div>
    </div>
  )
}

export default Login;
