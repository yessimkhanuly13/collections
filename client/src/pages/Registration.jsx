import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '../utils/Button';
import Input from '../utils/Input';
import Popup from '../components/Popup';

function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const [error, setError] = useState('');

  const handleChange = (e) =>{

    const {name, value} = e.target
    setUser({...user, [name]:value});

  }

  const handleRegistration = () =>{
    axios.post(`https://finalprojectserver.vercel.app/auth/registration`, user)
      .then(()=>{
        navigate('/');
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message);
      })
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {error && <Popup message={error} handleCloseError={()=>setError('')}/>}
      <div className='flex flex-col'>
        <Input type="email" name="username" onChange={handleChange}/>
        <Input type="password" name="password" onChange={handleChange}/>
      </div>
      <div className='flex'>
        <Button name="Go Back" style="bg-red-600" onClick={()=>navigate('/')} />
        <Button name="Submit" style="bg-lime-600" onClick={handleRegistration} />
      </div>
    </div>
  )
}

export default Registration