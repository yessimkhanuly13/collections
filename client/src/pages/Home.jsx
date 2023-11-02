import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { Error } from '../App';
import { Link } from 'react-router-dom';




function Home() {
  const [oldestItems, setOldestItems] = useState([]);
  const [collections, setCollections] = useState([]);

  const {setError, darkMode, url} = useContext(Error);

  const getAllItems = () =>{
    axios.get(`${url}/items/all`)
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
    axios.get(`${url}/collections/all`)
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
       <div className='grid grid-cols-2'>
          <div className='flex flex-col p-3'>
            <span className='text-center mb-2 text-xl font-bold'>Collections</span>
              <table className='border w-full text-center'>
                <thead className=''>
                  <tr className={ darkMode ? 'bg-slate-600' : 'bg-slate-50'}>
                    <th className='p-2'>Name</th>
                    <th className='p-2'>Description</th>
                    <th className='p-2'>Theme</th>
                    <th className='p-2'>Items</th>
                    <th className='p-2'>Link to Page</th>
                  </tr>
                </thead>
                {
                  collections.map((collection)=>{
                    return (
                      <tr>
                        <td className='p-1'>{collection.name}</td>
                        <td className='p-1 w-1/2'>{collection.description}</td>
                        <td className='p-1'>{collection.theme}</td>
                        <td className='p-1'>{collection.items.length}</td>
                        <td className='p-1 text-center'><Link to={`/collection/${collection._id}`}>link</Link></td>
                      </tr>
                    )
                  })
                }
              </table>
          </div>
          <div className='flex flex-col p-3'>
            <span className='text-center mb-2 text-xl font-bold'>Items</span>
            <table className='border w-full text-center'>
            <thead className='border'>
              <tr className={ darkMode ? 'bg-slate-600' : 'bg-slate-50'}>
                <th className='p-2'>Topic</th>
                <th className='p-2'>Description</th>  
                <th className='p-2'>Link to Page</th>
              </tr>
              </thead>
                {
                  oldestItems.map((item)=>{
                  return(
                    <tr>
                      <td className='p-1'>{item.topic}</td>
                      <td className='p-1 w-1/2'>{item.desc}</td>
                      <td className='p-1 text-center'><Link to={`/item/${item._id}`}>link</Link></td>
                    </tr>
                  )
                  })
                }
            </table>
          </div>
       </div>
    </div>
  )
}

export default Home