import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from "../components/Navbar"
import axios from 'axios';
import { PopupContext } from '../App';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, LinkIcon, Button} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import UnixToDate from '../components/Unixtodate';




function Home() {
  const [oldestItems, setOldestItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tags, setTags] = useState([]);
  const [itemsByTag, setItemsByTag] = useState([]);
  const [isCollection, setIsCollection] = useState(true);
  const [isItems, setIsItems] = useState(false);
  const [isTags, setIsTags] = useState(false);

  const {t} = useTranslation();

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
    return updatedItems.slice(0, 5);
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
        console.log(res.data)
        setItemsByTag(res.data);
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
       <NavbarComponent/>
       <div className='grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 pr-2'>
          <Sidebar collections={collections} items={oldestItems} tags={tags} vision={{setIsCollection, setIsItems, setIsTags}}/>
         <div className='col-span-1 md:col-span-3'>
         {isCollection &&  <div className='flex flex-col'>
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>{t('collection.name')}</TableColumn>
                <TableColumn>{t('collection.description')}</TableColumn>
                <TableColumn>{t('collection.theme')}</TableColumn>
                <TableColumn>{t('collection.items')}</TableColumn>
                <TableColumn>{t('collection.link')}</TableColumn>
              </TableHeader>
              <TableBody>
                {collections.map((collection)=>{
                  return (
                    <TableRow key={collection._id}>
                      <TableCell>{collection.name}</TableCell>
                      <TableCell>{collection.description}</TableCell>
                      <TableCell>{collection.theme}</TableCell>
                      <TableCell>{collection.items.length}</TableCell>
                      <TableCell><Link to={`/collection/${collection._id}`}><LinkIcon/></Link></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              </Table>
          </div>}
         { isItems && <div className='flex flex-col'> 
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>{t('item.topic')}</TableColumn>
                <TableColumn>{t('item.desc')}</TableColumn>
                <TableColumn>{t('item.created_date')}</TableColumn>
                <TableColumn>{t('item.tags')}</TableColumn>
                <TableColumn>{t('item.link')}</TableColumn>
              </TableHeader>
              <TableBody>
                {oldestItems.map((item)=>{
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{item.desc}</TableCell>
                      <TableCell><UnixToDate unix={item.createdDate}/></TableCell>
                      <TableCell>{item.tags.length}</TableCell>
                      <TableCell><Link to={`/item/${item._id}`}><LinkIcon/></Link></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>}
        { isTags && <div className='flex flex-col col-span-2 mb-3'>
              <div className='grid grid-cols-3  md:grid-cols-6 gap-2 text-center'>
                {tags.map((tag)=>{
                  return (
                    <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                      <Button className='font-bold' variant='bordered' onClick={()=>getItemsByTag(tag._id)}>{tag.value}</Button>
                    </div>
                  )
                })}
              </div>
          </div>}
          { 
            isTags && itemsByTag.length > 0 && (

              <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>{t('item.topic')}</TableColumn>
                <TableColumn>{t('item.desc')}</TableColumn>
                <TableColumn>{t('item.created_date')}</TableColumn>
                <TableColumn>{t('item.tags')}</TableColumn>
                <TableColumn>{t('item.link')}</TableColumn>
              </TableHeader>
              <TableBody>
                {itemsByTag.map((item)=>{
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{item.desc}</TableCell>
                      <TableCell><UnixToDate unix={item.createdDate}/></TableCell>
                      <TableCell>{item.tags.length}</TableCell>
                      <TableCell><Link to={`/item/${item._id}`}><LinkIcon/></Link></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )
          }
          </div>
       </div>
    </div>
  )
}

export default Home