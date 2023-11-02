import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Error } from '../App';

function Collection() {
    const [collection, setCollection] = useState({});
    const id = useParams();
    
    const {setError, url} = useContext(Error)

    const getCollectionById = () =>{
        axios.get(`${url}/collections/${id}`)
            .then((res)=>{
                setCollection(res.data[0])
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
    </div>
  )
}

export default Collection   