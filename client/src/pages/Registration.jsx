import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Button from '../utils/Button';
import Input from '../utils/Input';
import { Error } from '../App';

function Registration() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username:"",
    password:"",
  });

  const {setError} = useContext(Error);


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
      <div className='flex flex-col items-center'>
        <Input type="email" name="username" onChange={handleChange}/>
        <Input type="password" name="password" onChange={handleChange}/>
        <p>Already have an account? <Link className='hover:text-lime-600' to="/login">Sign In here</Link></p>
      </div>
      <div className='flex'>
        <Button name="Go Back" style="bg-red-600" onClick={()=>navigate('/')} />
        <Button name="Submit" style="bg-lime-600" onClick={handleRegistration} />
      </div>
    </div>
  )
}

export default Registration