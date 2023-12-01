import { Route, Routes } from "react-router-dom"
import { Login, Registration, AdminPanel, Item, Collection, Home, Profile } from "../pages/index.js"

export default function Router() {
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/collection/:id" element={<Collection/>}/>
          <Route exact path="/item/:id" element={<Item/>}/>
        </Routes>
    )
}