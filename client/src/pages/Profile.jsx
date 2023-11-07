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
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [editedCollection, setEditedCollection] = useState({
    name: "",
    description: "",
    theme: "",
  });

  const {setMessage, url, darkMode, message} = useContext(PopupContext)

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

 const handleUpdate = (id) => {
  const col = collections.find((collection) => collection._id === id);

    setEditingCollectionId(id);
    setEditedCollection({
      name: col.name,
      description: col.description,
      theme: col.theme,
    });
  };

  const handleEditData = (e) => {
    const { name, value } = e.target;
    setEditedCollection({...editedCollection, [name]: value});
  }

  const handleSaveUpdate = (id) => {
    console.log(editedCollection);
    axios.put(`${url}/collections/update/${id}`, editedCollection)
      .then((res)=>{
        setMessage(res.data.message);
        setEditingCollectionId(null);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
        console.log(e);
      })
  };

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    getAllUserCollections(currentUser);
    setUser(currentUser);
  },[message])

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
                    <th className='p-2'>Update</th>
                  </tr>
                </thead>
                {
                  collections.map((collection, index)=>{
                    return (
                      <tr key={collection._id}>
                        <td className='p-1'>{index + 1}</td>
                        <td className='p-1'>
                        {editingCollectionId === collection._id ? (
                          <input
                            className='text-center'
                            type="text"
                            name="name"
                            placeholder='Name'
                            onChange={(e) => handleEditData(e)}
                          />
                        ) : (
                          collection.name
                        )}
                      </td>
                      <td className='p-1 w-1/3'>
                        {editingCollectionId === collection._id ? (
                          <input
                            className='text-center'
                            type="text"
                            name="description"
                            placeholder='Descrtiption'
                            onChange={(e) => handleEditData(e)}
                          />
                        ) : (
                          collection.description
                        )}
                      </td>
                      <td className='p-1'>
                        {editingCollectionId === collection._id ? (
                          <select
                            name="theme"
                            onChange={(e) => handleEditData(e)}
                            className='text-center'
                            placeholder='Theme'
                          >
                            <option value="Books">Books</option>
                            <option value="Signs">Signs</option>
                            <option value="Silverware">Silverware</option>
                          </select>
                        ) : (
                          collection.theme
                        )}
                      </td>
                      <td className='p-1'>{collection.items.length}</td>
                      <td className='p-1 text-center'>
                        <Link to={`/collection/${collection._id}`}>link</Link>
                      </td>
                      <td className='p-1'>
                        <Button
                          name="Del"
                          style="bg-red-600"
                          onClick={() => handleDelete(collection._id)}
                        />
                      </td>
                      <td className='p-1'>
                        {editingCollectionId === collection._id ? (
                          <div className='flex flex-col'>
                            <Button name="Update" style="bg-lime-600" onClick={() => handleSaveUpdate(collection._id)} />
                            <Button name="Cancel" style="bg-red-600 mt-1" onClick={() => setEditingCollectionId(null)} />
                          </div>
                        ) : (
                          <Button name="Edit" style="bg-lime-600" onClick={() => handleUpdate(collection._id)} />
                        )}
                      </td>
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