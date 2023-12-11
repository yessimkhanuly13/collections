import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { PopupContext } from '../App';
import { useNavigate } from 'react-router-dom';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeFilledIcon, EyeSlashFilledIcon } from '../icons/index';
import { NavbarComponent } from '../components/index';
import { useTranslation } from "react-i18next";
import { useLocalStorage } from '../utils';


function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { getItem, setItem, removeItem } = useLocalStorage()
  const {t} = useTranslation();
  const currentUser = getItem('currentUser')

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
      
      axios.delete(`${url}/users/delete/${id}`)
        .then(()=>{
          getAllUsers();
          if(id == currentUser._id){
            removeItem('currentUser');
            navigate('/');
          }
        })
        .catch((e)=>{
          console.log(e);
        })
    }

  const handleUpdateUser = (id, path) =>{
      axios.put(`${url}/users/${path}/${id}`)
        .then(()=>{
          getAllUsers();
          if(id == currentUser._id && path === 'block'){
            removeItem('currentUser')
            navigate('/');
          }
          if(id == currentUser._id && path === 'user'){
            const role = currentUser.roles.filter((role)=>role !== 'admin');
            currentUser.roles = role;
            removeItem('currentUser');
            setItem('currentUser', currentUser);
            navigate('/');
          }
        })
        .catch((e)=>{
          console.log(e);
        })
  }
   
  useEffect(()=>{
    getAllUsers();
    if( currentUser && !currentUser.roles.includes('admin')){
      navigate('/');
    }else if(!currentUser){
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