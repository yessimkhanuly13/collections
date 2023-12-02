import { Route, Routes } from "react-router-dom"
import { Login, Registration, AdminPanel, Item, Collection, Home, Profile } from "../pages/index.js"
import { routes } from '../const/index.js'

export default function Router() {
    return (
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
          <Route path={routes.profile} element={<Profile/>}/>
          <Route path={routes.login} element={<Login/>}/>
          <Route path={routes.registration} element={<Registration/>}/>
          <Route path={routes.admin} element={<AdminPanel/>}/>
          <Route path={routes.collection} element={<Collection/>}/>
          <Route path={routes.item} element={<Item/>}/>
        </Routes>
    )
}