import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Button from '../utils/Button'
import Input from '../utils/Input';

function User() {
    const username = useParams();
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({});

    const getItems = (id) =>{
        axios.get(`http://localhost:3434/items/${id}`)
            .then((res)=>{
                setItems(res.data);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const handleItem = (e) =>{
        const {name, value} = e.target;
        setItem({...item, [name]:value});
    }

    const addItem = () =>{
        setItem({...item, userId: user._id});
        axios.post(`http://localhost:3434/items/add`, item)
            .then((res)=>{
                setItems([...items, res.data]);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

  
    useEffect(()=>{
      axios.get(`http://localhost:3434/users/${username.id}`)
        .then((res)=>{
          setUser(res.data[0]);
        })
        .catch((e)=>{
          console.log(e);
        })

        user && getItems(user._id)

    },[items])


  return (
    <div>
        {user._id && (
        <div>
            <Input type="text" onChange={handleItem} name="topic"/>
            <Input type="text" onChange={handleItem} name="desc"/>
            <Button name="Add" onClick={addItem} />
        </div>
         )}

    </div>
  )
}

export default User