import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { Error } from '../App';
import { Link } from 'react-router-dom';




function Home() {
  const [oldestItems, setOldestItems] = useState([]);
  const [collections, setCollections] = useState([]);

  const {setError} = useContext(Error);

  const getAllItems = () =>{
    axios.get('https://finalprojectserver.vercel.app/items/all')
      .then((res)=>{
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

  const getCollections = () =>{
    axios.get('https://finalprojectserver.vercel.app/collections/all')
      .then((res)=>{
        setCollections(getBiggestCollections(res.data));
      })
      .catch((e)=>{
        console.log(e);
        setError(e.response.data.message);
      })
  }
  
  const getBiggestCollections = (collections) =>{
    const updatedCollections = collections.sort((a, b) => a.items.length - b.items.length);
    console.log(updatedCollections);
    return updatedCollections.slice(0, 5);
  }  

  useEffect(()=>{
    getAllItems();
    getCollections();
  },[])

  return (
    <div>
       <Navbar/>
        {
          oldestItems.map((item)=>{
          return(
           <Link to={`/item/${item._id}`}>{item.topic}</Link>
          )
          })
        }

        {
          collections.map((collection)=>{
            return (
              <Link to={`/collection/${collection._id}`}>{collection.name}</Link>
            )
          })
        }
    </div>
  )
}

export default Home