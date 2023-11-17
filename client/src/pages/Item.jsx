import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PopupContext } from '../App';
import NavbarComponent from '../components/Navbar';

function Item() {
  const [item, setItem] = useState({});
  const {setMessage, url, darkMode, message} = useContext(PopupContext);
  const [tag, setTag] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const itemId = useParams();

  const handleMessage = (e) =>{
    const {value} = e.target;
    setComment(value);
    console.log(value);
  }

  const sendCommentToServer = () =>{
    axios.post(`${url}/items/addcomment/${item._id}`, {value: comment, username: currentUser.username})
      .then((res)=>{
        console.log(res.data.message);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  const getItemById = () =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
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
  }, [message])
  
  return (
    <div>
      <NavbarComponent/>
      <div className='w-full flex flex-col items-center gap-10 pb-10'>
        <div className='w-full text-center p-3'>
            <span className='text-3xl text-center font-bold'>{item.topic}</span>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-2xl text-center font-bold'>Description</span>
          <div className='flex p-3'>
            <p>{item.desc}</p>
          </div>
        </div>
        <span className='text-2xl font-bold text-center'>Fields</span>
        <div className={`grid grid-cols-${item.customField3_bool ? 3 : item.customField2_bool ? 2 : 1} gap-3 w-full`}>
          {
            item.customField1_bool && (
              <div className='flex flex-col flex justify-center items-center'>
                <div className='border text-center w-1/3 '>
                  <p className='text-xl font-bold'>{item.customField1_name}</p>
                  <p>{item.customField1_value}</p>
                </div>
              </div>
            )
          }
          {
          item.customField2_bool && (
            <div className='flex flex-col flex justify-center items-center'>
              <div className='border text-center w-1/3'>
                <p className='text-xl font-bold'>{item.customField2_name}</p>
                <p>{item.customField2_value}</p>
              </div>
            </div>
          )
        }
        {
          item.customField3_bool && (
            <div className='flex flex-col flex justify-center items-center'>
              <div className='border text-center w-1/3'>
                <p className='text-xl font-bold'>{item.customField3_name}</p>
                <p>{item.customField3_value}</p>
              </div>
            </div>
          )
        }
        </div>

        <span className='text-2xl text-center font-bold'>Tags</span>
        <div className='flex justify-center gap-2'>
              {
                item.tags && item.tags.map((tag)=>{
                  return (
                    <div className='shadow-md'>
                      {tag.value}
                      </div>
                  )
                })
              }
          </div>
        {
          isOwner && (
            <div className='flex flex-col w-full justify-center'>
              <div className='flex flex-col w-full items-center gap-1'>
                  {/* <Input placeholder="New tag" style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={(e)=>setTag(e.target.value)} />
                  <Button name="Add" style="bg-lime-600" onClick={addTag} />       */}
              </div>
            </div>
          )
        }
      <div className='w-full flex flex-col items-center justify-center'>
        <span className='text-2xl font-bold text-center'>Comments</span>
        <div className='w-5/6 border'>
          {
              item.comments && item.comments.map((comment)=>{
                return (
                  <p>{comment.value}</p>
                )
              })
          }
          <div className='flex'>
            {/* <div className='w-4/5'> */}
              {/* <Input style="w-full" onChange={handleMessage} type="text" placeholder="comment"/>
            </div>
            <Button style="bg-lime-600 w-1/5" name="Send" onClick={sendCommentToServer}/> */}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Item