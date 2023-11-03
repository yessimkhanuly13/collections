import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { PopupContext } from '../App';

function Profile() {
  const [user, setUser] = useState({});
  const [collectionData, setCollectionData] = useState({
    name:"",
    description:"",
    theme:""
  });
  const [collections, setCollections] = useState([]);
  const {setMessage, url} = useContext(PopupContext)

  const handleData = (e) =>{
    const {name, value} = e.target;

    setCollectionData({...collectionData, [name]:value});
    console.log(collectionData);
  }

  const getAllUserCollections = (user) =>{
    axios.get(`${url}/collections/user/${user._id}`)
      .then((res)=>{
        setCollections(res.data);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  const addNewCollection = () =>{
    console.log(collectionData);
    axios.post(`${url}/collections/add`, {name: collectionData.name, description: collectionData.description, userId: user._id, theme: collectionData.theme})
      .then((res)=>{
        setMessage(res.data.message);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
      setCollectionData(null);
  }

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    getAllUserCollections(currentUser);
    setUser(currentUser);
  },[])

  return (
    <div>
        <Navbar/>
        <div className='p-3'>
          <Input name="name" placeholder="Name" onChange={handleData}/>
          <Input name="theme" placeholder="Theme" onChange={handleData}/>
          <Input name="description" placeholder="Description" onChange={handleData}/>
          <Button name="Add new Collection" style='bg-black' onClick={addNewCollection}/>
        </div>
        <div>
            {
              collections.map((collection)=>{
                return (
                  <div>
                    <p>{collection.name}</p>
                  </div>
                )
              })
            }
        </div>
    </div>
  )
}

export default Profile