import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PopupContext } from '../App';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

function Collection() {
    const [collection, setCollection] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [itemdata, setItemData] = useState({
        topic:"",
        desc:""
    });
    const [tags, setTags] = useState([]);

    const collectionId = useParams();
    
    const {setMessage, url} = useContext(PopupContext)

    const getCollectionById = () =>{
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
            })
            .catch((e)=>{
                console.log(e);
                setMessage(e.response.data.message)
            })
    }

    const getLoggedUser = () =>{
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if(user && user._id === collection.userId){
            setIsOwner(true);
        }else{
            setIsOwner(false);
        }
    }

    const addNewItem = () =>{
        setItemData({...itemdata, userId: collection.userId, tags});
        axios.put(`${url}/additem/${collection.id}`, {itemdata})
            .then((res)=>{
                console.log(res.data);
                setMessage(res.data.message);
            })
            .catch((e)=>{
                console.log(e);
                setMessage(e.response.data.message);
            })
    }

    const handleData = (e) =>{
        const {name, value} = e.target;

        setItemData({...itemdata, [name]: value});
    }

    useEffect(()=>{
        getCollectionById();
        getLoggedUser();
    })

  return (
    <div>
        <Navbar/>
        <p>{collection.name}</p>
        <p>{collection.description}</p>
        <p>{collection.theme}</p>
        {collection.items && collection.items.map((item)=>{
            return (
                <div>
                    <p>{item.topic}</p>
                    <Link to={`/item/${item._id}`}></Link>
                </div>
            )
        })}
        { isOwner && (
            <div>
                <Input onChange={handleData} name="topic" />
                <Input onChange={handleData} name="desc" />
                <Input onChange={handleData} name="tags" />
                <Button name="Add new Item" style="bg-lime-600" onClick={addNewItem}/>
            </div>        
        )}
    </div>
  )
}

export default Collection   