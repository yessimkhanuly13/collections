import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import AdminPanel from "./pages/AdminPanel"
import { createContext, useEffect, useState } from "react"
import axios from 'axios';

export const CurrentUser = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState({});
  
  useEffect(()=>{
    axios.get('http://localhost:3434/users')
      .then((res)=>{
        setUsers(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  },[])
  
  return (
    <>
      {users && (<div>{JSON.stringify(users)}</div>)}
      <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
        </Routes>
      </CurrentUser.Provider>
    </>
  )
}

export default App
