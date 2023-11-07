import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import { PopupContext } from '../App';

function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const {setMessage, url, darkMode} = useContext(PopupContext);


  const handleChange = (e) =>{

    const {name, value} = e.target
    setUser({...user, [name]:value});

  }

  const handleRegistration = () =>{
    axios.post(`${url}/auth/registration`, user)
      .then(()=>{
        navigate('/');
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  return (
    <div className={!darkMode ? "min-h-screen flex items-center justify-center bg-gray-100" : "min-h-screen flex items-center justify-center bg-black"}>
      <div className={!darkMode ? "max-w-md w-full p-4 bg-white rounded-lg shadow-md" : "max-w-md w-full p-4 bg-black rounded-lg shadow-md"}>
        <div className="text-2xl text-center font-semibold mb-4">Registration</div>
        <div className="flex flex-col items-center">
          <Input  style={ darkMode ? 'bg-black' : 'bg-white text-black'} type="email" name="username" placeholder="Username" onChange={handleChange} />
          <Input  style={ darkMode ? 'bg-black mt-1' : 'bg-white text-black mt-1'} type="password" name="password" placeholder="Password" onChange={handleChange} />
          <p className={ !darkMode ? "text-sm text-gray-500 text-center my-2" : "text-sm text-white text-center my-2"}>
            Already have an account? <Link className="text-lime-600 hover:underline" to="/login">Sign In here</Link>
          </p>
        </div>
        <div className="flex justify-around mt-4">
          <Button name="Go Back" style="bg-red-600" onClick={() => navigate('/')} />
          <Button name="Submit" style="bg-lime-600" onClick={handleRegistration} />
        </div>
      </div>
    </div>
  )
}

export default Registration