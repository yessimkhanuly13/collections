import React, { useEffect, useState } from 'react'
import Button from '../utils/Button'
import { useNavigate } from 'react-router-dom';

function Profile() {

    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem('currentUser');
        navigate('/login');
    }

    useEffect(()=>{
        const user = localStorage.getItem('currentUser');
        if(!user){
            navigate('/login');
        }else{
            setCurrentUser(JSON.parse(user));
        }
    },[])

  return (
    <div>
        {currentUser.username}
        <Button onClick={logOut} name="Log Out" style="bg-red-600"/>
    </div>
  )
}

export default Profile