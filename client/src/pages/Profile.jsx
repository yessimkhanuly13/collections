import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../components/Navbar';
import axios from 'axios';
import { PopupContext } from '../App';
import { Link } from 'react-router-dom';
import {Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Table, TableBody, TableRow, TableColumn, LinkIcon, TableHeader, TableCell, Input} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { DeleteIcon } from '../icons/DeleteIcon';
import { EditIcon } from '../icons/EditIcon';

function Profile() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [editingCollectionId, setEditingCollectionId] = useState(null);


  const {control, handleSubmit, reset} = useForm();

  const {setMessage, url, darkMode, message} = useContext(PopupContext)

  const getAllUserCollections = (user) =>{
    axios.get(`${url}/collections/user/${user._id}`)
      .then((res)=>{
        setCollections(res.data);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }

  const addNewCollection = (data) =>{
    axios.post(`${url}/collections/add`, {...data, userId: user._id})
      .then((res)=>{
        setMessage(res.data.message);
      })
      .catch((e)=>{
        console.log(e);
        setMessage(e.response.data.message);
        
      })
      setCollectionData(null);
  }

  const handleDelete = (id) =>{
    console.log('clicled')
    axios.delete(`${url}/collections/delete/${id}`)
      .then((res)=>{
        setMessage(res.data.message);
        getAllUserCollections(user);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
      })
  }


  const handleSaveUpdate = (data, id) => {
    console.log({...data, id: id})
    axios.put(`${url}/collections/update/${id}`, data)
      .then((res)=>{
        setMessage(res.data.message);
        setEditingCollectionId(null);
      })
      .catch((e)=>{
        setMessage(e.response.data.message);
        console.log(e);
      })
  };


  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    getAllUserCollections(currentUser);
    setUser(currentUser);
  },[message])


  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
        <NavbarComponent/>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent className='flex flex-col items-center'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add new collection</ModalHeader>
                <ModalBody>
                    <Controller control={control} name='name' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label="Name"
                        className="max-w-xs"
                      />}/>
                      <Controller control={control} name='description' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label="Description"
                        className="max-w-xs"
                      />}

                    />
                    <Controller name='theme' control={control}
                      render={({field})=><Select
                      {...field}
                      isRequired
                      label="Theme"
                      placeholder="Select a theme"
                      className="max-w-xs"
                    >
                          <SelectItem key="Book" value="Book">
                            Book
                          </SelectItem>
                          <SelectItem key="Sign" value="Sign">
                            Sign
                          </SelectItem>
                          <SelectItem key="Silverware" value="Silverware">
                            Silverware
                          </SelectItem>
                        </Select>
                      }
                    />
                </ModalBody>
                <ModalFooter className='flex flex-col w-1/3 justify-around'>
                <Button color="success" variant="flat" onPress={onClose} onClick={handleSubmit(addNewCollection)}>
                    Add
                  </Button>
                <Button color="danger"  onPress={onClose}>
                    Go Back
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent className='flex flex-col items-center'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add new collection</ModalHeader>
                <ModalBody>
                    <Controller control={control} name='name' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label="Name"
                        defaultValue=""
                        className="max-w-xs"
                      />}/>
                      <Controller control={control} name='description' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label="Description"
                        defaultValue=""
                        className="max-w-xs"
                      />}

                    />
                    <Controller name='theme' control={control}
                      render={({field})=><Select
                      {...field}
                      isRequired
                      label="Theme"
                      placeholder="Select a theme"
                      defaultSelectedKeys={""}
                      className="max-w-xs"
                    >
                          <SelectItem key="Book" value="Book">
                            Book
                          </SelectItem>
                          <SelectItem key="Sign" value="Sign">
                            Sign
                          </SelectItem>
                          <SelectItem key="Silverware" value="Silverware">
                            Silverware
                          </SelectItem>
                        </Select>
                      }
                    />
                </ModalBody>
                <ModalFooter className='flex flex-col w-1/3 justify-around'>
                <Button color="success" variant="flat" onPress={onClose} onClick={handleSubmit(addNewCollection)}>
                    Add
                  </Button>
                <Button color="danger"  onPress={onClose}>
                    Go Back
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <div className='flex flex-col'>
            <Table className='p-3' isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Theme</TableColumn>
                <TableColumn>Items</TableColumn>
                <TableColumn>Link</TableColumn>
                <TableColumn>Update</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {collections.map((collection)=>{
                  return (
                    <TableRow key={collection._id}>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='name'
                          render={({field})=><Input {...field} defaultValue={collection.name} name='name' placeholder='Name'/>}
                        />) 
                        :
                         collection.name}
                      </TableCell>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='description' 
                          render={({field})=><Input {...field} defaultValue={collection.description} name='description' placeholder='Description'/>}
                        />) 
                        :
                        collection.description}
                      </TableCell>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='theme' 
                          render={({field})=><Select
                          {...field}
                          isRequired
                          label="Theme"
                          placeholder="Select a theme"
                          defaultSelectedKeys={[collection.theme]}
                          className="max-w-xs"
                        >
                            <SelectItem key="Book" value="Book">
                              Book
                            </SelectItem>
                            <SelectItem key="Sign" value="Sign">
                              Sign
                            </SelectItem>
                            <SelectItem key="Silverware" value="Silverware">
                              Silverware
                            </SelectItem>
                          </Select>}
                        />) 
                          :
                          collection.theme}
                      </TableCell>
                      <TableCell>{collection.items.length}</TableCell>
                      <TableCell><Link to={`/collection/${collection._id}`}><LinkIcon/></Link></TableCell>
                      <TableCell><div className="relative flex items-center p-3 gap-2 cursor-pointer">{editingCollectionId === collection._id ? (<div className='flex gap-2'>
                        <Button onClick={()=>{setEditingCollectionId(null); reset()}}>Cancel</Button>
                        <Button onClick={handleSubmit((data)=>handleSaveUpdate(data, collection._id))}>Update</Button>
                      </div>) :(<EditIcon onClick={()=>setEditingCollectionId(collection._id)} />)}</div></TableCell>
                      <TableCell><div className="relative flex items-center p-3 gap-2 cursor-pointer"><DeleteIcon onClick={()=>handleDelete(collection._id)}/></div></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              </Table>
          </div>
          <div className='p-3 flex justify-end gap-3'>
            <Button color="success" variant='shadow' onPress={onOpen}>New Collection</Button>
          </div>
    </div>
  )
}

export default Profile