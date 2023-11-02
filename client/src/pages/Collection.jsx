import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Error } from '../App';
import Navbar from '../components/Navbar';

function Collection() {
    const [collection, setCollection] = useState({});
    const collectionId = useParams();
    
    const {setError, url} = useContext(Error)

    const getCollectionById = () =>{
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
            })
            .catch((e)=>{
                console.log(e);
                setError(e.response.data.message)
            })
    }

    useEffect(()=>{
        getCollectionById();
    })
  return (
    <div>
        <Navbar/>
        <p>{collection.name}</p>
        <p>{collection.description}</p>
        <p>{collection.theme}</p>
        {collection.items && collection.items.map((item)=>{
            return (
                <p>{item.topic}</p>
            )
        })}
    </div>
  )
}

export default Collection   