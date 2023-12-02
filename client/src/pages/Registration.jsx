import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { Button } from "@nextui-org/react";
import { PopupContext } from '../App';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next';
import { InputController, InputPassEndContent } from '../components/index';

function Registration() {
  const navigate = useNavigate();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfPass, setIsVisibleConfPass] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const {t} = useTranslation();

  const schema = yup.object().shape({
    username: yup.string().required(t('auth.username_check')),
    password: yup.string().min(4, t('auth.pass_len_check')).required(t('auth.pass_check')),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], t('auth.pass_confirm_check')).required(t('auth.pass_confirm'))
  })

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });


  const {url, darkMode} = useContext(PopupContext);


  const handleRegistration = (data) =>{
    axios.post(`${url}/auth/registration`, data)
      .then(()=>{
        navigate('/login');
      })
      .catch((e)=>{
        setErrMessage(e.response.data.message);
      })
  }

  return (
    <div className={!darkMode ? "min-h-screen flex items-center justify-center bg-gray-100" : "min-h-screen flex items-center justify-center bg-black"}>
      <div className={!darkMode ? "max-w-md w-full p-4 bg-white rounded-lg shadow-md" : "max-w-md w-full p-4 bg-black rounded-lg shadow-md"}>
        <div className="text-2xl text-center font-semibold mb-4">{t('auth.registration')}</div>
        <div className='text-l text-center text-rose-600 mb-2'>{errMessage}</div>
        <form>
          <div className="flex flex-col items-center">
            <InputController 
              name='username' 
              control={control}
              placeholder={t('auth.enter_username')}
              label={t('auth.username')}
              type='email'
              errors={errors?.username?.message}
            />
            <InputController
              name='password' 
              control={control}
              placeholder={t('auth.enter_pass')}
              label={t('auth.pass')}
              type={isVisiblePass ? "text" : "password"}
              errors={errors?.password?.message}
              endContent={
                <InputPassEndContent isVisible={isVisiblePass} setIsVisible={setIsVisiblePass}/>
              }
              style="mt-2"
            />
            <InputController 
              name='confirmPassword' 
              control={control}
              placeholder={t('auth.enter_pass')}
              label={t('auth.pass')}
              type={isVisibleConfPass ? "text" : "password"}
              errors={errors?.confirmPassword?.message}
              endContent={
                <InputPassEndContent isVisible={isVisibleConfPass} setIsVisible={setIsVisibleConfPass}/>
              }
              style="mt-2"
            />
              <p className={ !darkMode ? "text-sm text-gray-500 text-center my-2" : "text-sm text-white text-center my-2"}>
                {t('auth.already_have_an_account')} <Link className="text-lime-600 hover:underline" to="/login">{t('auth.sign_in_here')}</Link>
              </p>
            </div>
            <div className="flex justify-around mt-4">
                <Button variant='shadow' color='danger' onClick={()=>navigate('/')}>{t('buttons.go_back')}</Button>
                <Button variant='shadow' color='success' onClick={handleSubmit(handleRegistration)}>{t('buttons.submit')}</Button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Registration