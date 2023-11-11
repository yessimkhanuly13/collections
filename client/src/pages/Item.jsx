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
  const [tags, setTags] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const itemId = useParams();
  
  const getTags = () =>{
    axios.get(`${url}/all`)
      .then((res)=>{
        setTags(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  }



  const getItemById = () =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    axios.get(`${url}/items/${itemId.id}`)
      .then((res)=>{
        setItem(res.data)
        if(res.data.userId === user._id){
          setIsOwner(true);
        }
        console.log(res.data.userId)
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  const addTag = () =>{
      axios.put(`${url}/items/addtag/${itemId.id}`, {tag: tag})
      .then((res)=>{
        setMessage(res.data.message);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  useEffect(()=>{
    getItemById();
  }, [])
  
  return (
    <div>
      <Navbar/>
      <div className='w-full text-center p-3'>
          <span className='text-2xl text-center font-bold'>{item.topic}</span>
      </div>
      {
        isOwner && (
          <div>
            <span className='text-xl'>Tags:</span>
            {
              tags.map((tag)=>{
                return (
                  <div className='shadow-md'>
                    {tag.value}
                    </div>
                )
              })
            }
            <div className='flex'>
                <Input placeholder="New tag" style={ darkMode ? 'bg-black m-1' : 'bg-white text-black m-1'} onChange={(e)=>setTag(e.target.value)} />
                <Button name="Add" style="bg-lime-600 mt-1" onClick={addTag} />      
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Item