import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import AdminPanel from "./pages/AdminPanel"
import User from "./pages/User"
import Item from "./pages/Item"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { createContext, useEffect, useState } from "react"
import Popup from "./components/Popup"
import Collection from "../../server/models/Collection"

export const Error = createContext();

function App() {
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    
  }, [])

  return (
    <div className={ darkMode ? "w-screen h-screen bg-black text-white" : "w-screen h-screen" }>
      <Error.Provider value={{error, setError, setDarkMode, darkMode}} >
        {error && <Popup message={error} handleCloseError={()=>setError('')}/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/collection/:id" element={<Collection/>}/>
          <Route path="/item/:id" element={<Item/>}/>
        </Routes>
      </Error.Provider>
    </div>
  )
}

export default App
