import React, { useContext, useEffect, useState } from 'react'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Navbar,  NavbarBrand, NavbarContent, NavbarItem, Button, Input} from "@nextui-org/react";
import { Link } from 'react-router-dom';


function NavbarComponent() {
  const {setDarkMode, darkMode} = useContext(PopupContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {url} = useContext(PopupContext);

  const navigate = useNavigate();

  const handleChange = (e) =>{
      axios.get(`${url}/search?q=${e.target.value}`)
      .then((res)=>{
        setSearchResults(res.data);
        console.log(res.data);
      })
      .catch((e)=>{console.log(e)})
      console.log(`${url}/search?q=${e.target.value}`)
  } 
  

  const toggleMode = () =>{
    if(darkMode){
      localStorage.setItem('theme', 'light');
    }else{
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  }

  const handleLogout = () =>{
    localStorage.removeItem('currentUser');
    setIsLogged(false);
    navigate('/');
  }
  
  useEffect(()=>{
    const user = localStorage.getItem('currentUser');
  
    if(user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }
  
    if(user && JSON.parse(user).roles.includes('admin')){
        setIsAdmin(true);
    }else{
        setIsAdmin(false)
    }
  },[])


  return (
    <Navbar>
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4">
        <Link to="/">
          <p className="hidden sm:block font-bold text-inherit">Collections</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
    
      <Input
        onChange={handleChange}
        placeholder="Type to search..."
        size="sm"
        type="search"
      />

    <NavbarContent justify="end">
        {
          !isLogged ? 
              (
                <NavbarItem className="flex">
                    <Button color="success" variant="shadow" onClick={()=>navigate('/login')}>
                        Sign In
                    </Button>
                </NavbarItem>
              ) : (
                  <NavbarItem className="flex">
                      <Button color="danger" variant="shadow" onClick={handleLogout}>
                          Log out
                      </Button>
                    </NavbarItem>
              )
        }
      </NavbarContent>

  </Navbar>
  )
}

export default NavbarComponent