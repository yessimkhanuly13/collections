import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { Error } from '../App';
import { Link } from 'react-router-dom';


function Home() {
  const [items, setItems] = useState([]);
  const [oldestItems, setOldestItems] = useState([]);

  const {setError} = useContext(Error);

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

  useEffect(()=>{
    getAllItems();
  },[])

  return (
    <div>
       <Navbar/>
        {oldestItems.map((item)=>{
          return(
           <Link to={`/item/${item._id}`}>{item.topic}</Link>
          )
        })}
    </div>
  )
}

export default Home