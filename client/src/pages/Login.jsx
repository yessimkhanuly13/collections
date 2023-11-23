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
import { useTranslation } from "react-i18next";


function Login() {
  const navigate = useNavigate();
  const {url, darkMode} = useContext(PopupContext);
  const [isVisible, setIsVisible] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const {t} = useTranslation();


  const schema = yup.object().shape({
      username: yup.string().required(t('auth.username_check')),
      password: yup.string().min(4, t('auth.pass_len_check')).required(t('auth.pass_check'))
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
        <div className="text-2xl text-center font-semibold mb-4">{t('auth.login')}</div>
        <div className='text-l text-center text-rose-600 mb-2'>{errMessage}</div>
        <form>
          <div className="flex flex-col items-center">
          <Controller name='username' control={control} 
              render={({field})=><Input 
              {...field} 
              isRequired
              errorMessage={errors.username?.message}
              type="email" 
              label={t('auth.enter_username')}  
              placeholder={t('auth.enter_username')} 
              />}
            />
            <Controller name='password' control={control}
              render={({field})=><Input
              {...field}
              isRequired
              errorMessage={errors.password?.message}
              label={t('auth.pass')}
              placeholder={t('auth.enter_pass')}
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
              {t('auth.dont_have_an_account')} <Link className="text-lime-600 hover:underline" to="/registration">{t('auth.register_here')}</Link>
            </p>
          </div>
          <div className="flex justify-around mt-4">
              <Button variant='shadow' color='danger' onClick={()=>navigate('/')}>{t('buttons.go_back')}</Button>
              <Button variant='shadow' color='success' onClick={handleSubmit(handleLogin)}>{t('buttons.submit')}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
