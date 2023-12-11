import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent, Sidebar, ItemTable, CollectionTable } from "../components/index.js"
import axios from 'axios';
import { PopupContext } from '../App';
import { Button } from "@nextui-org/react";




function Home() {
  const [oldestItems, setOldestItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tags, setTags] = useState([]);
  const [itemsByTag, setItemsByTag] = useState([]);
  const [isCollection, setIsCollection] = useState(true);
  const [isItems, setIsItems] = useState(false);
  const [isTags, setIsTags] = useState(false);

  const {url} = useContext(PopupContext);

  const getAllItems = () =>{
    axios.get(`${url}/items/all`)
      .then((res)=>{
        setOldestItems(getOldestItems(res.data));
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  const getOldestItems = (items) =>{
    const updatedItems = items.sort((a, b)=> b.createdDate - a.createdDate);
    console.log(updatedItems);
    return updatedItems.slice(0, 5);
  }

  const getCollections = () =>{
    axios.get(`${url}/collections/all`)
      .then((res)=>{
        setCollections(getBiggestCollections(res.data));
      })
      .catch((e)=>{
        console.log(e)
      })
  }
  
  const getBiggestCollections = (collections) =>{
    const updatedCollections = collections.sort((a, b) => b.items.length - a.items.length);
    console.log(updatedCollections);
    return updatedCollections.slice(0, 5);
  }

  const getAllTags = () =>{
    axios.get(`${url}/tag/all`)
      .then((res)=>{
        setTags(res.data)
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  const getItemsByTag = (id) =>{
    axios.get(`${url}/tag/all/${id}`)
      .then((res)=>{
        console.log(res.data)
        setItemsByTag(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  useEffect(()=>{
    getAllItems();
    getCollections();
    getAllTags();
  },[])

  return (
    <div>
       <NavbarComponent/>
       <div className='grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 pr-2'>
          <Sidebar collections={collections} items={oldestItems} tags={tags} vision={{setIsCollection, setIsItems, setIsTags}}/>
         <div className='col-span-1 md:col-span-3'>
          {
            isCollection  &&  (
              <div className='flex flex-col'>
                <CollectionTable collections={collections}/>
              </div>
            )
          }
          { 
            isItems && (
              <div className='flex flex-col'> 
                <ItemTable items={oldestItems}/>
              </div>
            )
          }
          { 
            isTags && (
              <div className='flex flex-col col-span-2 mb-3'>
                  <div className='grid grid-cols-3  md:grid-cols-6 gap-2 text-center'>
                    {
                      tags.map((tag)=>{
                        return (
                          <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <Button className='font-bold' variant='bordered' onClick={()=>getItemsByTag(tag._id)}>{tag.value}</Button>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
            )
          }
          { 
            isTags && itemsByTag.length > 0 && (
              <ItemTable items={itemsByTag}/>
            )
          }
          </div>
       </div>
    </div>
  )
}

export default Home