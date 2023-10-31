import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import AdminPanel from "./pages/AdminPanel"
import User from "./pages/User"
import Item from "./pages/Items"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { createContext, useState } from "react"
import Popup from "./components/Popup"

export const Error = createContext();

function App() {
  const [error, setError] = useState('');


  return (
    <div className="w-screen">
      <Error.Provider value={{error, setError}} >
        {error && <Popup message={error} handleCloseError={()=>setError('')}/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/items/:id" element={<Item/>}/>
        </Routes>
      </Error.Provider>
    </div>
  )
}

export default App
