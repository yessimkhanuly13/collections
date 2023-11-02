import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Error } from '../App';
import Navbar from '../components/Navbar';

function Item() {
  const [item, setItem] = useState({});
  const {setError, url} = useContext(Error);

  const itemId = useParams();

  useEffect(()=>{
    axios.get(`${url}/items/${itemId.id}`)
      .then((res)=>{
        setItem(res.data)
        console.log(itemId.id)
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message);
      })
  },[])
  
  return (
    <div>
      <Navbar/>
      <p>{item.topic}</p>
      <p>{item.desc}</p>
      <p>{item.topic}</p>
    </div>
  )
}

export default Item