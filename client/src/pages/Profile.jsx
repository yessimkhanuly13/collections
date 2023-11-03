import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { PopupContext } from '../App';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({});
  const [collectionData, setCollectionData] = useState({
    name:"",
    description:"",
    theme:""
  });
  const [collections, setCollections] = useState([]);
  const {setMessage, url, darkMode} = useContext(PopupContext)

  const handleData = (e) =>{
    console.log(e);
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

  const handleDelete = (id) =>{
    console.log('clicled')
    axios.delete(`${url}/collections/delete/${id}`)
      .then((res)=>{
        setMessage(res.data.message);
        getAllUserCollections(user);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    getAllUserCollections(currentUser);
    setUser(currentUser);
  },[])

  return (
    <div>
        <Navbar/>
        <div className='p-3 flex justify-around'>
          <Input name="name" placeholder="Name" onChange={handleData}/>
          <Input name="description" placeholder="Description" onChange={handleData}/>
          <select name="theme" onChange={handleData}>
            <option value="Books">Books</option>
            <option value="Signs">Signs</option>
            <option value="Silverware">Silverware</option>
          </select>
          <Button name="Add new Collection" style='bg-black' onClick={addNewCollection}/>
        </div>
        <div className='p-2'>
        <table className='border w-full text-center'>
                <thead className=''>
                  <tr className={ darkMode ? 'bg-slate-600' : 'bg-slate-50'}>
                    <th className='p-2'>Index</th>
                    <th className='p-2'>Name</th>
                    <th className='p-2'>Description</th>
                    <th className='p-2'>Theme</th>
                    <th className='p-2'>Items</th>
                    <th className='p-2'>Link to Page</th>
                    <th className='p-2'>Del</th>
                  </tr>
                </thead>
                {
                  collections.map((collection, index)=>{
                    return (
                      <tr>
                        <td className='p-1'>{index+1}</td>
                        <td className='p-1'>{collection.name}</td>
                        <td className='p-1 w-1/2'>{collection.description}</td>
                        <td className='p-1'>{collection.theme}</td>
                        <td className='p-1'>{collection.items.length}</td>
                        <td className='p-1 text-center'><Link to={`/collection/${collection._id}`}>link</Link></td>
                        <td className='p-1'><Button name="Del" style="bg-red-600" onClick={()=>handleDelete(collection._id)}/></td>
                      </tr>
                    )
                  })
                }
              </table>
        </div>
    </div>
  )
}

export default Profile