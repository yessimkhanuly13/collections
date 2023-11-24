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
import { useTranslation } from "react-i18next";


function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const {t} = useTranslation();

  const {url, darkMode} = useContext(PopupContext)

  const getAllUsers = () =>{
    axios.get(`${url}/users/all`)
      .then((res)=>{
        setUsers(res.data);
        console.log(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
  } 

  const handleUserDelete = (id) =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
      axios.delete(`${url}/users/delete/${id}`)
        .then(()=>{
          getAllUsers();
          if(id == user._id){
            localStorage.removeItem('currentUser');
            navigate('/');
          }
        })
        .catch((e)=>{
          console.log(e);
        })
    }

  const handleUpdateUser = (id, path) =>{
    const user = JSON.parse(localStorage.getItem('currentUser'));
      axios.put(`${url}/users/${path}/${id}`)
        .then(()=>{
          getAllUsers();
          if(id == user._id && path === 'block'){
            localStorage.removeItem('currentUser')
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
          console.log(e);
        })
  }
   
  useEffect(()=>{
    getAllUsers();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if( user && !user.roles.includes('admin')){
      navigate('/');
    }else if(!user){
      navigate('/')
    }

  },[])


  return (
    <div className='grid grid-cols-1'>
      <NavbarComponent/>
      <div className='w-full mt-2'>
      <Table aria-label="Example table with dynamic content">
        <TableHeader >
           <TableColumn key="username">{t('admin_panel.username')}</TableColumn>
           <TableColumn key="role">{t('admin_panel.role')}</TableColumn>
           <TableColumn key="status">{t('admin_panel.status')}</TableColumn>
           <TableColumn key="delete">{t('admin_panel.delete')}</TableColumn>
           <TableColumn key="update">{t('admin_panel.update')}</TableColumn>
           <TableColumn key="block">{t('admin_panel.block')}</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user)=>{
            return (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.roles.includes('admin') ? 'Admin' : 'User'}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                      <div className="relative flex items-center p-3 gap-2">
                        <Tooltip color="danger" content={t('admin_panel.delete')}>
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon onClick={()=>handleUserDelete(user._id)}/>
                          </span>
                        </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>
                      <div className="relative flex items-center p-3 gap-2">
                       {user.roles.includes('admin') ? ( <Tooltip color="danger" content={t('admin_panel.update_hint')}>
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <EditIcon onClick={()=>handleUpdateUser(user._id, "user")}/>
                          </span>
                        </Tooltip>) 
                        : 
                        (<Tooltip color="danger" content={t('admin_panel.update_hint_2')}>
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <EditIcon onClick={()=>handleUpdateUser(user._id, "admin")}/>
                          </span>
                        </Tooltip>)
                        }
                    </div>
                  </TableCell>
                  <TableCell>
                      <div className="relative flex items-center p-3 gap-2">
                        {user.status === "Active" ? (
                        <Tooltip color="danger" content={t('admin_panel.block')}>
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <EyeFilledIcon onClick={()=>handleUpdateUser(user._id, "block")}/>
                          </span>
                        </Tooltip>) : (
                        <Tooltip color="danger" content={t('admin_panel.unblock')}>
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <EyeSlashFilledIcon onClick={()=>handleUpdateUser(user._id, "unblock")}/>
                            </span>
                        </Tooltip>)
                        }
                    </div>
                  </TableCell>
                </TableRow>
            )
          })}
        </TableBody>
    </Table>

      </div>
    </div>
  )
}

export default AdminPanel