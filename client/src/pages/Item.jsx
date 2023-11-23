import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PopupContext } from '../App';
import NavbarComponent from '../components/Navbar';
import { Divider, Button, Input, Card, User } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { converUnixToDate } from '../functions/unixtodate';
import { LikeBtn } from '../icons/LikeBtn';
import { LikedBtn } from '../icons/LikedBtn';
import { useTranslation } from "react-i18next";

function Item() {
  const [item, setItem] = useState({});
  const {setMessage, url, darkMode} = useContext(PopupContext);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const navigate = useNavigate();

  const {t} = useTranslation();
  const itemId = useParams();

  const {control, handleSubmit, reset} = useForm();

  const sendCommentToServer = (data) =>{
    const username = JSON.parse(localStorage.getItem('currentUser')).username;
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    axios.post(`${url}/items/addcomment/${item._id}`, {value: data.value, username, userId})
      .then(()=>{
        reset({value: ""});
        getItemById();
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  const getItemById = () =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user && setCurrentUsername(user.username);
    axios.get(`${url}/items/${itemId.id}`)
      .then((res)=>{

        const comments = res.data.comments; 
        comments.sort((a, b)=> a.createdDate - b.createdDate);
        res.data.comments = comments;
        
        setItem(res.data)
        if(user && res.data.userId === user._id || user && user.roles.includes('admin')){
          setIsOwner(true);
        }
        console.log(res.data.comments)
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })

      setTimeout(getItemById, 3000);
  }

  const addTag = (data) =>{
      axios.put(`${url}/items/addtag/${itemId.id}`, {tag: data.tag})
      .then(()=>{
        getItemById();
        reset({tag: ""})
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  const addLike = (commentId) =>{
    if(currentUsername === null){
      return;
    }
    axios.put(`${url}/items/addlike/${item._id}/${currentUsername}?commentId=${commentId}`)
      .then(()=>{
        getItemById();
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  useEffect(()=>{
    getItemById();
  }, [])
  
  return (
    <div className='h-full'>
      <NavbarComponent/>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 p-5'>
        <div className='col-span-1 md:col-span-4'>
              <div className='flex justify-center p-3'>
                    <h1 className='font-bold text-2xl'>{item.topic}</h1>
                </div>
                <Divider/>
                <div className='flex gap-3 p-5 items-center'>
                    <span className='font-bold'>{t('item.desc')}:</span>
                    <p>{item.desc}</p>
                </div>
                <Divider/>
                <div className='flex gap-3 p-5 items-center'>
                    <span className='font-bold '>{t('item.tags')}:</span>
                        <div className='flex justify-around gap-3'>
                          {item.tags && item.tags.map((tag)=>{
                            return (
                              <div className=''>
                                <Button className='font-bold' variant='bordered'>{tag.value}</Button>
                              </div>
                            )
                          })}
                        </div>
                </div>
                {isOwner && (
                      <div className='flex items-center gap-3 p-5'>
                         <Controller name='tag' control={control}
                          render={({field})=><Input
                          {...field}
                          type="text"
                          label="New tag"
                          placeholder=""
                          className="max-w-xs"
                        />}/>
                        <Button onClick={handleSubmit(addTag)} variant='shadow' color='success'>
                          {t('buttons.add')}
                        </Button>
                      </div>)}
                <Divider/>
                {item.customField1_bool && (
                  <div className='flex flex-col justify-center p-5'>
                      <span className='font-bold'>{t('item.custom_field_bool')}:</span>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                        <Card className='flex gap-3 p-4 items-center justify-center'>
                          <div className='flex gap-3'>
                            <p>{item.customField1_name}:</p>
                            <p>{item.customField1_value}</p>
                          </div>
                        </Card>
                        {item.customField2_bool && (<Card className='flex gap-3 items-center justify-center'>
                          <div className='flex gap-3'>
                            <p>{item.customField2_name}:</p>
                            <p>{item.customField2_value}</p>
                          </div>
                        </Card>)}
                        {item.customField3_bool && (<Card className='flex gap-3 items-center justify-center'>
                          <div className='flex gap-3'>
                            <p>{item.customField3_name}:</p>
                            <p>{item.customField3_value}</p>
                          </div>
                        </Card>)}
                      </div>
                  </div>)}
                  <Divider/>
                <div className='flex flex-col items-center'>
                  <span className='font-bold'>{t('item.comments')}:</span>
                    <div className='flex gap-3 p-5'>
                      <div className='grid grid-cols-6 gap-2'>
                          {
                          item.comments && item.comments.map((comment)=>{
                            return (
                              <div className='col-span-6'>
                                  <div className="">
                                    <div className='flex justify-between'>
                                      <div className='flex items-center gap-1'>
                                        <h4 onClick={()=>navigate(`/profile/${comment.userId}`)} className="font-semibold cursor-pointer">{comment.username}</h4>
                                        <h4 className='text-default-400 text-xs'>{converUnixToDate(comment.createdDate)}</h4>
                                        </div>
                                      <div className='flex gap-1  items-center'>
                                        <div className='text-xs'>{comment.likes.length > 1 ? `${comment.likes.length} likes` : `${comment.likes.length} like` } </div>
                                        <div className='flex justify-end cursor-pointer' onClick={()=>addLike(comment._id)}>{comment.likes.includes(currentUsername) ? (<LikedBtn/>) :(<LikeBtn/>)}</div>
                                      </div>
                                    </div>
                                    <p className="text-default-600">{comment.value}</p>
                                  </div>
                              </div>
                            )
                          })
                        }
                        {JSON.parse(localStorage.getItem('currentUser')) && (<Controller name='value' control={control}
                          render={({field})=><Input
                          {...field}
                          type="text"
                          label={t('item.comment')}
                          variant=""
                          className="col-span-5"
                        />}/>)}
                        {JSON.parse(localStorage.getItem('currentUser')) && (<div className='flex items-center'>
                          <Button
                            onClick={handleSubmit((sendCommentToServer))}
                            variant='shadow'
                            color='success'
                            className="col-span-1"
                          >
                            {t('buttons.submit')}
                          </Button> 
                        </div>)}
                      </div>             
                      </div>
                </div>
        </div>      
      </div>
      {
        currentUsername
      }
    </div>
  )
}

export default Item