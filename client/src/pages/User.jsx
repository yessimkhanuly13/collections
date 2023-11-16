import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Button from '../components/Button'
import Input from '../components/Input';
import { PopupContext } from '../App';
import NavbarComponent from '../components/Navbar';

function User() {
    const username = useParams();
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({});

    const {setMessage, url} = useContext(PopupContext);

    const getItems = (id) =>{
        axios.get(`${url}/items/${id}`)
            .then((res)=>{
                setItems(res.data);
            })
            .catch((e)=>{
                setMessage(e.response.data.message)
            })
    }

    const handleItem = (e) =>{
        const {name, value} = e.target;
        setItem({...item, [name]:value});
    }

    const addItem = () =>{
        setItem({...item, userId: user._id});
        axios.post(`${url}/items/add`, item)
            .then((res)=>{
                setItems([...items, res.data]);
            })
            .catch((e)=>{
                setMessage(e.response.data.message)
            })
    }

  
    useEffect(()=>{
      axios.get(`${url}/users/${username.id}`)
        .then((res)=>{
          setUser(res.data[0]);
        })
        .catch((e)=>{
          setMessage(e.response.data.message)
        })

        user && getItems(user._id)
    
    },[items])


  return (
    <div>
      <NavbarComponent/>
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