import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Error } from '../App';

function Item() {
  const [item, setItem] = useState({});
  const {setError} = useContext(Error);

  const id = useParams();

  useEffect(()=>{
    axios.get(`https://finalprojectserver.vercel.app/itmes/${id}`)
      .then((res)=>{
        setItem(res.data)
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message);
      })
  },[])
  
  return (
    <div>
      
    </div>
  )
}

export default Item