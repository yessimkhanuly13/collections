import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Input, Button} from "@nextui-org/react";
import axios from 'axios';
import { PopupContext } from '../App';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



function Login() {
  const navigate = useNavigate();
  const {url, darkMode} = useContext(PopupContext);
  const [isVisible, setIsVisible] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const schema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required")
  })

  const {control, handleSubmit, formState: {errors}  } = useForm({resolver: yupResolver(schema)});



  const handleLogin = (data) => {
    axios.post(`${url}/auth/login`, data)
      .then((res) => { 
        navigate(`/profile/${res.data._id}`);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log(e);
        setErrMessage(e.response.data.message);
      });
  }


  return (
    <div className={!darkMode ? "min-h-screen flex items-center justify-center bg-gray-100" : "min-h-screen flex items-center justify-center bg-black"}>
      <div className={!darkMode ? "max-w-md w-full p-4 bg-white rounded-lg shadow-md" : "max-w-md w-full p-4 bg-black rounded-lg shadow-md"}>
        <div className="text-2xl text-center font-semibold mb-4">Login</div>
        <div className='text-l text-center text-rose-600 mb-2'>{errMessage}</div>
        <form>
          <div className="flex flex-col items-center">
          <Controller name='username' control={control} 
              render={({field})=><Input 
              {...field} 
              isRequired
              errorMessage={errors.username?.message}
              type="email" 
              label="Email"  
              placeholder="Enter your email" 
              />}
            />
            <Controller name='password' control={control}
              render={({field})=><Input
              {...field}
              isRequired
              errorMessage={errors.password?.message}
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
            />}         
            />
            <p className={!darkMode ? "text-sm text-gray-500 text-center my-2" : "text-sm text-white text-center my-2"}>
              Don't have an account? <Link className="text-lime-600 hover:underline" to="/registration">Register here</Link>
            </p>
          </div>
          <div className="flex justify-around mt-4">
              <Button variant='shadow' color='danger' onClick={()=>navigate('/')}>Go Back</Button>
              <Button variant='shadow' color='success' onClick={handleSubmit(handleLogin)}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
