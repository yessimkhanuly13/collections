import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PopupContext } from '../App';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

function Collection() {
    const [collection, setCollection] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [itemdata, setItemData] = useState({
        topic:"",
        desc:""
    });
    const [tags, setTags] = useState([]);

    const collectionId = useParams();
    
    const {setMessage, url, darkMode} = useContext(PopupContext)

    const getCollectionById = () =>{
        const user = JSON.parse(localStorage.getItem('currentUser'));
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
                if(res.data.userId === user._id){
                    setIsOwner(true);
                }
            })
            .catch((e)=>{
                setMessage(e.response.data.message)
            })
    }


    const addNewItem = () =>{
        axios.put(`${url}/collections/additem/${collection._id}`, {userId: collection.userId, tags, topic: itemdata.topic, desc: itemdata.desc, })
            .then((res)=>{
                setMessage(res.data.message);
                setItemData({
                    topic:"",
                    desc:""
                });
            })
            .catch((e)=>{
                setMessage(e.response.data.message);
            })
    }

    const handleData = (e) =>{
        const {name, value} = e.target;

        setItemData({...itemdata, [name]: value});
        console.log(itemdata)
    }

    useEffect(()=>{
        getCollectionById();
    }, [])

  return (
    <div className='w-full'>
        <Navbar/>

        <div className='p-3 text-center'>
            <span className='text-xl font-bold'>{collection.name}</span>
        </div>
        <div className='grid grid-cols-4 gap-3 p-3'>
            { 
                isOwner && (
                    <div className='border flex flex-col items-center gap-3 p-2'>
                        <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="topic" placeholder="Topic" />
                        <Input style={ darkMode ? 'bg-black' : 'bg-white text-black'} onChange={handleData} name="desc" placeholder="Description"/>
                        <Button name="Add new Item" style="bg-lime-600 w-full" onClick={addNewItem}/>
                    </div>
            )}
            {
                collection.items && collection.items.map((item)=>{
                    return (
                        <div className='border flex flex-col items-center gap-3 p-2'>
                            <p>Topic: {item.topic}</p>    
                            <p>Desc: {item.desc}</p>
                            <p>Created date: {new Date(item.createdDate).toLocaleString()}</p>
                            {
                                isOwner && 
                                (
                                    <div className='flex w-full'>
                                        <Button name="Delete" style="bg-red-600 w-1/2"/>
                                        <Link to={`/item/${item._id}`} className='w-1/2'><Button name="Link" style="bg-lime-600 w-full"/></Link>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }  
        </div>      
    </div>
  )
}

export default Collection   