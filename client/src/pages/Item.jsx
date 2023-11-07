import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PopupContext } from '../App';
import Navbar from '../components/Navbar';

function Item() {
  const [item, setItem] = useState({});
  const {setMessage, url} = useContext(PopupContext);

  const itemId = useParams();

  useEffect(()=>{
    axios.get(`${url}/items/${itemId.id}`)
      .then((res)=>{
        setItem(res.data)
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  },[])
  
  return (
    <div>
      <Navbar/>
      <div>
          <span>Topic: {item.topic}</span>
      </div>
    </div>
  )
}

export default Item