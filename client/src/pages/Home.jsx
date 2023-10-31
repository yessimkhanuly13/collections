import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { Error } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../utils/Button';




function Home() {
  const [items, setItems] = useState([]);
  const [oldestItems, setOldestItems] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const {setError} = useContext(Error);

  const navigate = useNavigate();

  const getAllItems = () =>{
    axios.get('https://finalprojectserver.vercel.app/items/all')
      .then((res)=>{
        setItems(res.data);
        setOldestItems(getOldestItems(res.data));
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message);
      })
  }

  const getOldestItems = (items) =>{
    const updatedItems = items.sort((a, b)=> a.createdDate - b.createdDate);
    console.log(updatedItems);
    return updatedItems.slice(0, 10);
  } 

  const handleLogout = () =>{
    localStorage.removeItem('currentUser');
    setIsLogged(false);
  }

  useEffect(()=>{
    getAllItems();
    
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
    <div>
       <Navbar/>
        {oldestItems.map((item)=>{
          return(
           <Link to={`/item/${item._id}`}>{item.topic}</Link>
          )
        })}

      <div className='flex'>
        {
          isLogged && isAdmin && (<Button name="Admin Panel" style="bg-lime-600" onClick={()=>navigate('/admin')}/>)
        }
        {
          !isLogged ? (
            <div>
              <Button name="Sign In" style="bg-lime-600" onClick={()=>navigate('/login')}/>
            </div>
          ) : (
            <Button name="Logout" style="bg-red-600" onClick={handleLogout}/>
          )
        }
      </div>
    </div>
  )
}

export default Home