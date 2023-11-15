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
import Collection from "./pages/Collection"

export const PopupContext = createContext();

function App() {
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);


  const url = import.meta.env.VITE_URL;

  useEffect(()=>{
    const mode = localStorage.getItem('theme');
    const body = document.body; 
    console.log(body)

    if(mode === 'light'){
      setDarkMode(false);
      // body.classList.remove("w-screen h-screen bg-black text-white bg-cover")
    }else{
      setDarkMode(true);
      // body.classList.add("w-screen h-screen bg-black text-white bg-cover")
    }

  }, [])
  
  return (
    <div className={ darkMode ? "w-screen h-screen bg-black text-white bg-cover" : "w-screen h-screen bg-cover" }>
      <PopupContext.Provider value={{message, setMessage, setDarkMode, darkMode, url}} >
        {message && <Popup message={message} handleCloseError={()=>setMessage('')} darkMode={darkMode}/>}
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
      </PopupContext.Provider>
    </div>
  )
}

export default App
