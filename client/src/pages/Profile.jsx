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
  }

  const getAllUserCollections = () =>{
    axios.get(`${url}/collections//user/${user._id}`)
      .then((res)=>{
        setCollections(res.data);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  const addNewCollection = () =>{
    setCollectionData({...collectionData, userId: user._id});
    axios.post(`${url}/collections/add`, {collectionData})
      .then((res)=>{
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('currentUser')));
    user && getAllUserCollections();
  },[])

  return (
    <div>
        <Navbar/>
        <div>
          <Input name="name" onChange={handleData}/>
          <Input name="theme" onChange={handleData}/>
          <Input name="description" onChange={handleData}/>
          <Button name="Add new Collection" onClick={addNewCollection}/>
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