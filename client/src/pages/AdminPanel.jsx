import React, { useContext, useEffect, useState } from 'react'
import { CurrentUser } from '../App'
import axios from 'axios'

function AdminPanel() {
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
    axios.get('http://localhost:3434/users/all')
      .then((res)=>{
        setUsers(res.data);
      })
  },[])
  return (
    <div>
      <table className='border w-screen mt-4'>
        <thead className='border'>
          <tr className='bg-slate-50'>
            <th className='border p-2'>Index</th>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Role</th>
          </tr>
        </thead>
          <tbody className='border'>
              {users && users.map((user, index) => {
                  return (
                    <tr className='odd:bg-white even:bg-slate-100' key={index}>
                        <td>{index+1}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.roles[0]}</td>
                    </tr>
                  )})}
          </tbody>
      </table>
    </div>
  )
}

export default AdminPanel