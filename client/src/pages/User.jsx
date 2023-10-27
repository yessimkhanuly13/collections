import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

function User() {
    const username = useParams();

    const [user, setUser] = useState({});
  
    useEffect(()=>{
      axios.get(`http://localhost:3434/users/${username.id}`)
        .then((res)=>{
          setUser(res.data[0]);
          console.log(res.data);
        })
        .catch((e)=>{
          console.log(e);
        })
    },[])


  return (
    <div>{user._id}</div>
  )
}

export default User