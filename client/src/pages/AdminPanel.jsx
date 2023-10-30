import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../utils/Button'
import { Error } from '../App';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const {setError} = useContext(Error)

  const getAllUsers = () =>{
    axios.get('https://finalprojectserver.vercel.app/users/all')
      .then((res)=>{
        setUsers(res.data);
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message)
      })
  } 


  const handleChange = (userId) =>{
    if(!selectedUsers.includes(userId)){
      setSelectedUsers([...selectedUsers, userId])
    }else{
      setSelectedUsers(selectedUsers.filter((id)=> id !== userId ))
    }
  }

  const handleSelectAllUsers = () =>{
      const allUsers = users.map((user)=> user._id)

      if(check){
        setSelectedUsers([]);
      }else{
        setSelectedUsers(allUsers);
      }
      setCheck(!check);
  }

  const handleUserDelete = () =>{
    selectedUsers.forEach((id)=>{
      axios.delete(`https://finalprojectserver.vercel.app/users/delete/${id}`)
        .then((res)=>{
          console.log(res.data);
          getAllUsers();
        })
        .catch((e)=>{
          console.log(e);
          setError(e.response.data.message)
        })
    })
  }

  const handleUpdateUser = (path) =>{
    selectedUsers.forEach((id)=>{
      axios.put(`https://finalprojectserver.vercel.app/users/${path}/${id}`)
        .then((res)=>{
          console.log(res.data)
          getAllUsers();
        })
        .catch((e)=>{
          console.log(e);
          setError(e.response.data.message)
        })
    })
  }
   
  useEffect(()=>{
    getAllUsers();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user.roles.includes('admin')){
      navigate('/');
      setError('For admins only!');
    }

  },[])


  return (
    <>

      <Button name="Delete" style="bg-red-600" onClick={handleUserDelete}/>
      <Button name="Block" style="bg-red-600" onClick={()=>handleUpdateUser('block')}/>
      <Button name="Unblock" style="bg-lime-600" onClick={()=>handleUpdateUser('unblock')}/>
      <Button name="Give Admin" style="bg-lime-600" onClick={()=>handleUpdateUser('admin')}/>
      <Button name="Remove Admin" style="bg-red-600" onClick={()=>handleUpdateUser('user')}/>

      <table className='border w-screen mt-4'>
        <thead className='border'>
          <tr className='bg-slate-50'>
            <th className='border p-2'><input checked={check} onChange={handleSelectAllUsers}  type='checkbox'/></th>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Role</th>
          </tr>
        </thead>
          <tbody className='border text-center'>
              {users && users.map((user, index) => {
                  return (
                    <tr className='odd:bg-white even:bg-slate-100' key={index}>
                        <td><input onChange={()=>handleChange(user._id)} checked={selectedUsers.includes(user._id)} type='checkbox'/></td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.roles[0]}</td>
                    </tr>
                  )})}
          </tbody>
      </table>

    </>
  )
}

export default AdminPanel