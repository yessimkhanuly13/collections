import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { PopupContext } from '../App';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import { InputController, InputPassEndContent } from '../components/index';


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
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/');
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
            <InputController 
              control={control} 
              name="username" 
              type="email" 
              label={t('auth.username')}
              placeholder={t('auth.enter_username')}
              errors={errors.username?.message}/>

            <InputController
              control={control}
              name="password"
              type={ isVisible ? "text" : "password"}
              label={t('auth.pass')}
              placeholder={t('auth.enter_pass')}
              errors={errors?.password?.message}
              endContent={<InputPassEndContent isVisible={isVisible} setIsVisible={setIsVisible}/>}
              className="mt-2"
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
