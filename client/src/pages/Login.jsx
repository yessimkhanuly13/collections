import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Input, Button} from "@nextui-org/react";
import axios from 'axios';
import { PopupContext } from '../App';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';



function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const {setMessage, url, darkMode} = useContext(PopupContext);
  const [isVisible, setIsVisible] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(e.target.name)
  }

  const handleLogin = () => {
    axios.post(`${url}/auth/login`, user)
      .then((res) => {
        navigate('/profile');
        localStorage.setItem('currentUser', JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response.data.message);
        setUser({});
      });
  }


  return (
    <div className={!darkMode ? "min-h-screen flex items-center justify-center bg-gray-100" : "min-h-screen flex items-center justify-center bg-black"}>
      <div className={!darkMode ? "max-w-md w-full p-4 bg-white rounded-lg shadow-md" : "max-w-md w-full p-4 bg-black rounded-lg shadow-md"}>
        <div className="text-2xl text-center font-semibold mb-4">Login</div>
        <div className="flex flex-col items-center">
          <Input isRequired type="email" label="Email"  placeholder="Enter your email" name='username' onChange={handleChange}/>
          <Input
            isRequired
            name="password"
            label="Password"
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={()=>setIsVisible(!isVisible)}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className='mt-2'
            onChange={handleChange}
          />

          <p className={!darkMode ? "text-sm text-gray-500 text-center my-2" : "text-sm text-white text-center my-2"}>
            Don't have an account? <Link className="text-lime-600 hover:underline" to="/registration">Register here</Link>
          </p>
        </div>
        <div className="flex justify-around mt-4">
            <Button variant='shadow' color='danger' onClick={()=>navigate('/')}>Go Back</Button>
            <Button variant='shadow' color='success' onClick={handleLogin}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;
