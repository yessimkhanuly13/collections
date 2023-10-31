import React, { useEffect, useState } from 'react'
import Input from '../utils/Input'
import Button from '../utils/Button'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('currentUser');
    setIsLogged(false);
  }

  useEffect(()=>{
    const user = localStorage.getItem('currentUser');

    
    if(user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }

    if(user && JSON.parse(user).roles.includes('admin')){
      setIsAdmin(true);
    }else{
      setIsAdmin(false)
    }
  },[])

  return (
    <div className='flex justify-between'>
      <Input name="Search" type="text" />
      <div className='flex'>
        {
          isLogged && isAdmin && (<Button name="Admin Panel" style="bg-lime-600" onClick={()=>navigate('/admin')}/>)
        }
        {
          !isLogged ? (
            <div>
              <Button name="Sign In" style="bg-lime-600" onClick={()=>navigate('/login')}/>
            </div>
          ) : (
            <Button name="Logout" style="bg-red-600" onClick={handleLogout}/>
          )
        }
      </div>
    </div>
  )
}

export default Navbar