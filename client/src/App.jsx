import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import AdminPanel from "./pages/AdminPanel"
import { createContext, useState } from "react"
import User from "./pages/User"
import Item from "./pages/Item"
import Home from "./pages/Home"

export const CurrentUser = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <>
      <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/items/:id" element={<Item/>}/>
        </Routes>
      </CurrentUser.Provider>
    </>
  )
}

export default App
