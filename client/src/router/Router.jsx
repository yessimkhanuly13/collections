import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Registration from "../pages/Registration"
import AdminPanel from "../pages/AdminPanel"
import Item from "../pages/Item"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Collection from "../pages/Collection"

export default function Router() {
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/collection/:id" element={<Collection/>}/>
          <Route path="/item/:id" element={<Item/>}/>
        </Routes>
    )
}