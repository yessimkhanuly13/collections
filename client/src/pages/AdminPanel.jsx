import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import { EditIcon } from '../icons/EditIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import NavbarComponent from '../components/Navbar';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';


function AdminPanel() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const {setMessage, url, darkMode} = useContext(PopupContext)

  const getAllUsers = () =>{
    axios.get(`${url}/users/all`)
      .then((res)=>{
        setUsers(res.data);
        console.log(res.data)
      })
      .catch((e)=>{
        setMessage(e.response.data.message)
      })
  } 

  const handleUserDelete = (id) =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
      axios.delete(`${url}/users/delete/${id}`)
        .then((res)=>{
          setMessage(res.data.message);
          getAllUsers();
          if(id == user._id){
            localStorage.removeItem('currentUser');
            navigate('/');
          }
        })
        .catch((e)=>{
          setMessage(e.response.data.message)
        })
    }

  const handleUpdateUser = (id, roles, type) =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));

    let path;

      axios.put(`${url}/users/${path}/${id}`)
        .then((res)=>{
          setMessage(res.data.message);
          getAllUsers();
          if(id == user._id && path === 'block'){
            localStorage.removeItem('currenUser')
            navigate('/');
          }
          if(id == user._id && path === 'user'){
            const role = user.roles.filter((role)=>role !== 'admin');
            user.roles = role;
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
          }
        })
        .catch((e)=>{
          setMessage(e.response.data.message)
        })
  }
   
  useEffect(()=>{
    getAllUsers();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if( user && !user.roles.includes('admin')){
      navigate('/');
      setMessage('For admins only!');
    }else if(!user){
      navigate('/')
    }

  },[])

    const columns = [
      {
        key: "username",
        label: "USERNAME",
      },
      {
        key: "roles",
        label: "ROLE",
      },
      {
        key: "status",
        label: "STATUS",
      },
      {
        key:"delete",
        label: "DELETE"
      },
      {
        key:"update",
        label: "UPDATE"
      },
      {
        key:"block",
        label:"BLOCK"
      }
    ];


  return (
    <div className='grid grid-cols-1'>
      <NavbarComponent/>
      <div className='w-full mt-2'>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item._id}>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.roles.includes('admin') ? 'Admin' : 'User'}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                  <div className="relative flex items-center p-3 gap-2">
                    <Tooltip color="danger" content="Delete">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon onClick={()=>handleUserDelete(item._id)}/>
                      </span>
                    </Tooltip>
                </div>
              </TableCell>
              <TableCell>
                  <div className="relative flex items-center p-3 gap-2">
                    <Tooltip color="danger" content="Update role">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <EditIcon onClick={()=>handleUpdateUser(item._id, item.roles)}/>
                      </span>
                    </Tooltip>
                </div>
              </TableCell>
              <TableCell>
                  <div className="relative flex items-center p-3 gap-2">
                    {item.status === "Active" ? (
                    <Tooltip color="danger" content="Block">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <EyeFilledIcon onClick={()=>handleUpdateUser(item._id, [], "block")}/>
                      </span>
                    </Tooltip>) : (
                    <Tooltip color="danger" content="Unblock">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <EyeSlashFilledIcon onClick={()=>handleUpdateUser(item._id, [], "unblock")}/>
                        </span>
                    </Tooltip>)
                    }
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
    </Table>

      </div>
    </div>
  )
}

export default AdminPanel