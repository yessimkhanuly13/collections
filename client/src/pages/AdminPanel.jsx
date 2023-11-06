import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const {setMessage, url} = useContext(PopupContext)

  const getAllUsers = () =>{
    axios.get(`${url}/users/all`)
      .then((res)=>{
        setUsers(res.data);
      })
      .catch((e)=>{
        setMessage(e.response.data.message)
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
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    selectedUsers.forEach((id)=>{
      axios.delete(`${url}/users/delete/${id}`)
        .then((res)=>{
          setMessage(res.data.message);
          getAllUsers();
          if(id == user._id){
            localStorage.removeItem('currentUser');
            navigate('/');
          }
        })
        .catch((e)=>{
          setMessage(e.response.data.message)
        })
    })
  }

  const handleUpdateUser = (path) =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));

    selectedUsers.forEach((id)=>{
      axios.put(`${url}/users/${path}/${id}`)
        .then((res)=>{
          setMessage(res.data.message);
          getAllUsers();
          if(id == user._id && path === 'block'){
            localStorage.removeItem('currenUser')
            navigate('/');
          }
          if(id == user._id && path === 'user'){
            const role = user.roles.filter((role)=>role !== 'admin');
            user.roles = role;
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
          }
        })
        .catch((e)=>{
          setMessage(e.response.data.message)
        })
    })
  }
   
  useEffect(()=>{
    getAllUsers();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if( user && !user.roles.includes('admin')){
      navigate('/');
      setMessage('For admins only!');
    }else if(!user){
      navigate('/')
    }

  },[])


  return (
    <div className='flex flex-col items-center p-2'>

      <div>
        <Button name="Block" style="bg-red-600" onClick={()=>handleUpdateUser('block')}/>
        <Button name="Unblock" style="bg-lime-600" onClick={()=>handleUpdateUser('unblock')}/>
        <Button name="Delete" style="bg-red-600" onClick={handleUserDelete}/>
        <Button name="Give Admin" style="bg-lime-600" onClick={()=>handleUpdateUser('admin')}/>
        <Button name="Remove Admin" style="bg-red-600" onClick={()=>handleUpdateUser('user')}/>
        <Button name="Go Back" style="bg-lime-600" onClick={()=>navigate('/')}/>
      </div>

      <table className='border w-4/6 m-4'>
        <thead className=''>
          <tr className='bg-slate-50'>
            <th className='p-2'><input checked={check} onChange={handleSelectAllUsers}  type='checkbox'/></th>
            <th className='p-2'>ID</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Roles</th>
          </tr>
        </thead>
          <tbody className='text-center'>
              {users && users.map((user, index) => {
                  return (
                    <tr className='odd:bg-white even:bg-slate-100' key={index}>
                        <td><input onChange={()=>handleChange(user._id)} checked={selectedUsers.includes(user._id)} type='checkbox'/></td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.roles.includes('admin') ? "admin" : "user" }</td>
                    </tr>
                  )})}
          </tbody>
      </table>

    </div>
  )
}

export default AdminPanel