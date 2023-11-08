import React, { useContext, useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { PopupContext } from '../App';
import { Link } from 'react-router-dom';




function Home() {
  const [oldestItems, setOldestItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tags, setTags] = useState([]);

  const {setMessage, darkMode, url} = useContext(PopupContext);

  const getAllItems = () =>{
    axios.get(`${url}/items/all`)
      .then((res)=>{
        setOldestItems(getOldestItems(res.data));
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  const getOldestItems = (items) =>{
    const updatedItems = items.sort((a, b)=> b.createdDate - a.createdDate);
    console.log(updatedItems);
    return updatedItems.slice(0, 10);
  }

  const getCollections = () =>{
    axios.get(`${url}/collections/all`)
      .then((res)=>{
        setCollections(getBiggestCollections(res.data));
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }
  
  const getBiggestCollections = (collections) =>{
    const updatedCollections = collections.sort((a, b) => b.items.length - a.items.length);
    console.log(updatedCollections);
    return updatedCollections.slice(0, 5);
  }
  
  const converUnixToDate = (unix) =>{

      const currentTime = Date.now();
      const secondsAgo = Math.floor((currentTime - unix)/1000);
    
    
      if (secondsAgo < 60) {
        return 'just now';
      } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
      } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      } else if (secondsAgo < 604800) {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
      } else {
        const date = new Date(unix);
        return date.toLocaleString();
      }
  }

  const getAllTags = () =>{
    axios.get(`${url}/tag/all`)
      .then((res)=>{
        setTags(res.data)
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message)
      })
  }

  const getItemsByTag = (id) =>{
    axios.get(`${url}/tag/all/${id}`)
      .then((res)=>{
        console.log(res.data);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
      })
  }

  useEffect(()=>{
    getAllItems();
    getCollections();
    getAllTags();
  },[])

  return (
    <div>
       <Navbar/>
       <div className='grid grid-cols-1 md:grid-cols-2'>
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
                      <tr className={!darkMode ? 'odd:bg-slate-100 even:bg-slate-50' : 'bg-black'}>
                        <td className='p-1'>{collection.name}</td>
                        <td className='p-1 w-1/2'>{collection.description}</td>
                        <td className='p-1'>{collection.theme}</td>
                        <td className='p-1'>{collection.items.length}</td>
                        <td className='p-1 text-center'><Link className='flex justify-center' to={`/collection/${collection._id}`}>
                            <div>
                              <svg width="800px" height="800px" viewBox="0 0 24 24" className="w-6 h-6" fill={darkMode ? "#000000" : "#edf0f2"} xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_429_11072)">
                                <path d="M11 3.99994H4V17.9999C4 19.1045 4.89543 19.9999 6 19.9999H18C19.1046 19.9999 20 19.1045 20 17.9999V12.9999" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 14.9999L20 3.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 3.99994H20V8.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_429_11072">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg> 
                            </div>
                          </Link></td>
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
                <th className='p-2'>Created Date</th>
                <th className='p-2'>Link to Page</th>
              </tr>
              </thead>
                {
                  oldestItems.map((item)=>{
                  return(
                    <tr className={!darkMode ? 'odd:bg-slate-100 even:bg-slate-50' : 'bg-black'}>
                      <td className='p-1'>{item.topic}</td>
                      <td className='p-1 w-1/2'>{item.desc}</td>
                      <td className='p-1'>{converUnixToDate(item.createdDate)}</td>
                      <td className='p-1 text-center'><Link className='flex justify-center' to={`/item/${item._id}`}>
                        <div>
                          <svg width="800px" height="800px" viewBox="0 0 24 24" className="w-6 h-6" fill={darkMode ? "#000000" : "#edf0f2"} xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_429_11072)">
                          <path d="M11 3.99994H4V17.9999C4 19.1045 4.89543 19.9999 6 19.9999H18C19.1046 19.9999 20 19.1045 20 17.9999V12.9999" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9 14.9999L20 3.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15 3.99994H20V8.99994" stroke={!darkMode ? "#000000" : "#edf0f2"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_429_11072">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg> 
                        </div>
                      </Link></td>
                    </tr>
                  )
                  })
                }
            </table>
          </div>
          <div className='flex flex-col p-3 col-span-2'>
          <span className='text-center mb-2 text-xl font-bold'>Tags</span>
              <div className='grid grid-cols-10 gap-2 text-center'>
                {tags.map((tag)=>{
                  return (
                    <div onClick={()=>getItemsByTag(tag._id)} className='bg-slate-300 border shadow-md rounded cursor-pointer hover:bg-white'>
                      {tag.value}
                    </div>
                  )
                })}
              </div>
          </div>
       </div>
    </div>
  )
}

export default Home