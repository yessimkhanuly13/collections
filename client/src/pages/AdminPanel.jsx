import React, { useContext, useEffect } from 'react'
import { CurrentUser } from '../App'

function AdminPanel() {
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  
  useEffect(()=>{
    console.log(currentUser);
  },[])
  return (
    <div>{}</div>
  )
}

export default AdminPanel