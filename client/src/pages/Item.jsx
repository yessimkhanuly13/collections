import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PopupContext } from '../App';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';

function Item() {
  const [item, setItem] = useState({});
  const {setMessage, url, darkMode} = useContext(PopupContext);
  const [tag, setTag] = useState("");

  const itemId = useParams();

  const addTag = () =>{
    console.log('clicked');
    axios.put(`${url}/items/addtag/${itemId.id}`, {tag: tag})
      .then((res)=>{
        setMessage(res.data.message);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

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
          <Input placeholder="Tag" style={ darkMode ? 'bg-black m-1' : 'bg-white text-black m-1'} onChange={(e)=>setTag(e.target.value)} />
          <Button name="Add" style="bg-lime-600" onClick={addTag} />      
      </div>
      <div>
        {item.topic}
      </div>
    </div>
  )
}

export default Item