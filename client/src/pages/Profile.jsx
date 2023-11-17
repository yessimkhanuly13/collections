import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../components/Navbar';
import axios from 'axios';
import { PopupContext } from '../App';
import { Link } from 'react-router-dom';
import {Select, SelectItem, Input, Button} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';

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

  const {control, handleSubmit} = useForm();

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

  const addNewCollection = (data) =>{
    console.log(data);
    // axios.post(`${url}/collections/add`, {...data, userId: user._id})
    //   .then((res)=>{
    //     setMessage(res.data.message);
    //   })
    //   .catch((e)=>{
    //     console.log(e);
    //     setMessage(e.response.data.message);
        
    //   })
    //   setCollectionData(null);
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
        <NavbarComponent/>
        <div className='p-3 flex justify-around'>
          <form className='flex'>
            <Controller control={control} name='name' 
              render={({field})=><Input
                {...field}
                isRequired
                type="text"
                label="Name"
                defaultValue=""
                className="max-w-xs"
              />}

            />
             <Controller control={control} name='description' 
              render={({field})=><Input
                {...field}
                isRequired
                type="text"
                label="Name"
                defaultValue=""
                className="max-w-xs"
              />}

            />
            <Controller name='theme' control={control}
              render={({field})=><Select
              {...field}
              isRequired
              label="Theme"
              placeholder="Select a theme"
              defaultSelectedKeys={""}
              className="max-w-xs"
            >
                  <SelectItem key="Book" value="Book">
                    Book
                  </SelectItem>
                  <SelectItem key="Sign" value="Sign">
                    Sign
                  </SelectItem>
                  <SelectItem key="Silverware" value="Silverware">
                    Silverware
                  </SelectItem>
                </Select>
              }
            />
            <Button onClick={handleSubmit(addNewCollection)}>Add new Collection</Button>
            
            {/* <select className={ darkMode ? 'bg-black' : 'bg-white text-black'} name="theme" onChange={handleData}>
              <option value="Books">Books</option>
              <option value="Signs">Signs</option>
              <option value="Silverware">Silverware</option>
            </select> */}
            {/* <Button name="Add new Collection" style={ !darkMode ? 'bg-black text-white' : 'text-black bg-white'} onClick={addNewCollection}/> */}
          </form>
        </div>
        {/* <div className='p-2'>
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
                      <tr className={!darkMode ? 'odd:bg-slate-100 even:bg-slate-50' : 'bg-black'} key={collection._id}>
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
                        <Link className='flex justify-center'  to={`/collection/${collection._id}`}>
                          <div>
                            <svg width="800px" height="800px" viewBox="0 0 24 24" className="w-6 h-6" fill={darkMode ? "#000000" : "#edf0f2"} xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_429_11072)">
                            <path d="M11 3.99994H4V17.9999C4 19.1045 4.89543 19.9999 6 19.9999H18C19.1046 19.9999 20 19.1045 20 17.9999V12.9999" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 14.9999L20 3.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 3.99994H20V8.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_429_11072">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg> 
                          </div>  
                        </Link>
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
              </table> */}
        {/* </div> */}
    </div>
  )
}

export default Profile