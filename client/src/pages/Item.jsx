import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PopupContext } from '../App';
import NavbarComponent from '../components/Navbar';
import { Divider, Button, Input, Card, User } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { converUnixToDate } from '../functions/unixtodate';

function Item() {
  const [item, setItem] = useState({});
  const {setMessage, url, darkMode, message} = useContext(PopupContext);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const itemId = useParams();

  const {control, handleSubmit} = useForm();

  const sendCommentToServer = (data) =>{
    const username = JSON.parse(localStorage.getItem('currentUser')).username;
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(data.value)
    axios.post(`${url}/items/addcomment/${item._id}`, {value: data.value, username, userId})
      .then(()=>{
        getItemById();
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  const getItemById = () =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    axios.get(`${url}/items/${itemId.id}`)
      .then((res)=>{
        setItem(res.data)
        if(res.data.userId === user._id || user.roles.includes('admin')){
          setIsOwner(true);
        }
        console.log(res.data.comments)
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  const addTag = (data) =>{
      axios.put(`${url}/items/addtag/${itemId.id}`, {tag: data.tag})
      .then(()=>{
        getItemById();
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  useEffect(()=>{
    console.log( JSON.parse(localStorage.getItem('currentUser')).username)
    getItemById();
  }, [])
  
  return (
    <div>
      <NavbarComponent/>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 p-5'>
        <div className='col-span-1 md:col-span-4'>
              <div className='flex justify-center p-3'>
                    <h1 className='font-bold text-2xl'>{item.topic}</h1>
                </div>
                <Divider/>
                <div className='flex gap-3 p-5 items-center'>
                    <span className='font-bold'>Description:</span>
                    <p>{item.desc}</p>
                </div>
                <Divider/>
                <div className='flex gap-3 p-5 items-center'>
                    <span className='font-bold '>Tags:</span>
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
                          Add
                        </Button>
                      </div>)}
                <Divider/>
                {item.customField1_bool && (
                  <div className='flex flex-col justify-center p-5'>
                      <span className='font-bold'>Custom fields:</span>
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
                  <span className='font-bold'>Comments:</span>
                    <div className='flex gap-3 p-5'>
                      <div className='grid grid-cols-6 gap-2'>
                          {
                          item.comments && item.comments.map((comment)=>{
                            return (
                              <div className='col-span-6'>
                                  <div className="ml-4">
                                    <div className='flex justify-between'>
                                      <h4 clas onClick={()=>navigate(`/profile/${comment.userId}`)} className="font-semibold cursor-pointer">{comment.username}</h4>
                                      <h4>{converUnixToDate(comment.createdDate)}</h4>
                                    </div>
                                    <p className="text-gray-600">{comment.value}</p>
                                  </div>
                              </div>
                            )
                          })
                        }
                        <Controller name='value' control={control}
                          render={({field})=><Input
                          {...field}
                          type="text"
                          label="Comment"
                          variant=""
                          className="col-span-5"
                        />}/>
                        <div className='flex items-center'>
                          <Button
                            onClick={handleSubmit((sendCommentToServer))}
                            variant='shadow'
                            color='success'
                            className="col-span-1"
                          >
                            Send
                          </Button> 
                        </div>
                      </div>             
                      </div>
                </div>
        </div>      
      </div>
    </div>
  )
}

export default Item