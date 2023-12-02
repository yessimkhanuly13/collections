import React, { useContext, useEffect, useState } from 'react'
import { NavbarComponent } from '../components/index';
import axios from 'axios';
import { PopupContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Table, TableBody, TableRow, TableColumn, LinkIcon, TableHeader, TableCell, Input} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { DeleteIcon, EditIcon } from '../icons/index';
import { useTranslation } from "react-i18next";
import { CURRENT_USER } from '../const';

function Profile() {
  const [isOwner, setIsOwner] = useState(false);
  const [collections, setCollections] = useState([]);
  const [editingCollectionId, setEditingCollectionId] = useState(null);

  const {t} = useTranslation();

  const userId = useParams();

  const {control, handleSubmit, reset} = useForm();

  const {url, darkMode} = useContext(PopupContext)

  const getAllUserCollections = () =>{
    reset();
    if(CURRENT_USER._id === userId.id || CURRENT_USER.roles.includes('admin')){
      setIsOwner(true);
    }

    axios.get(`${url}/collections/user/${userId.id}`)
      .then((res)=>{
        setCollections(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  const addNewCollection = (data) =>{
    axios.post(`${url}/collections/add`, {...data, userId: userId.id})
      .then(()=>{
        getAllUserCollections();
        reset();
      })
      .catch((e)=>{
        console.log(e);        
      })
  }

  const handleDelete = (id) =>{
    axios.delete(`${url}/collections/delete/${id}`)
      .then(()=>{
        getAllUserCollections();
      })
      .catch((e)=>{
        console.log(e);
      })
  }


  const handleSaveUpdate = (data, id) => {
    console.log({...data, id: id})
    axios.put(`${url}/collections/update/${id}`, data)
      .then(()=>{
        getAllUserCollections();
        setEditingCollectionId(null);
      })
      .catch((e)=>{
        console.log(e);
      })
  };


  useEffect(()=>{
    getAllUserCollections();
  },[])


  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
        <NavbarComponent/>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
          classNames={{
            body: `${darkMode ? "dark" : ""} text-foreground bg-background`,
            header: `${darkMode ? "dark" : ""}  text-foreground bg-background`,
            footer: `${darkMode ? "dark" : ""} text-foreground bg-background`,
            base: `${darkMode ? "dark" : ""} text-foreground bg-background`
          }}
        >
          <ModalContent className='flex flex-col items-center'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{t('buttons.add_new_collection')}</ModalHeader>
                <ModalBody>
                    <Controller control={control} name='name' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label={t('collection.name')}
                        defaultValue=""
                        className="max-w-xs"
                      />}/>
                      <Controller control={control} name='description' 
                      render={({field})=><Input
                        {...field}
                        isRequired
                        type="text"
                        label={t('collection.description')}
                        defaultValue=""
                        className="max-w-xs"
                      />}

                    />
                    <Controller name='theme' control={control}
                      render={({field})=><Select
                      {...field}
                      isRequired
                      label={t('collection.theme')}
                      placeholder={t('collection.select_theme')}
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
                    {t('buttons.add')}
                  </Button>
                <Button color="danger" onPress={onClose}>
                    {t('buttons.go_back')}
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <div className='flex flex-col'>
            {isOwner ? (<Table className='p-3' isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>{t('collection.name')}</TableColumn>
                <TableColumn>{t('collection.description')}</TableColumn>
                <TableColumn>{t('collection.theme')}</TableColumn>
                <TableColumn>{t('collection.items')}</TableColumn>
                <TableColumn>{t('collection.link')}</TableColumn>
                <TableColumn>{t('buttons.update')}</TableColumn>
                <TableColumn>{t('buttons.delete')}</TableColumn>
              </TableHeader>
              <TableBody>
                {collections.map((collection)=>{
                  return (
                    <TableRow key={collection._id}>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='name'
                          render={({field})=><Input {...field} defaultValue={collection.name} name='name' placeholder={t('collection.name')}/>}
                        />) 
                        :
                         collection.name}
                      </TableCell>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='description' 
                          render={({field})=><Input {...field} defaultValue={collection.description} name='description' placeholder={t('collection.description')}/>}
                        />) 
                        :
                        collection.description}
                      </TableCell>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (<Controller control={control} name='theme' 
                          render={({field})=><Select
                          {...field}
                          isRequired
                          label={t('collection.theme')}
                          placeholder={t('collection.select_theme')}
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
                        <Button onClick={()=>{setEditingCollectionId(null); reset()}}>{t('buttons.go_back')}</Button>
                        <Button onClick={handleSubmit((data)=>handleSaveUpdate(data, collection._id))}>{t('buttons.update')}</Button>
                      </div>) : (<EditIcon onClick={()=>setEditingCollectionId(collection._id)} />)}</div></TableCell>
                      <TableCell><div className="relative flex items-center p-3 gap-2 cursor-pointer"><DeleteIcon onClick={()=>handleDelete(collection._id)}/></div></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              </Table>) : (
                <Table className='p-3' isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>{t('collection.name')}</TableColumn>
                  <TableColumn>{t('collection.description')}</TableColumn>
                  <TableColumn>{t('collection.items')}</TableColumn>
                  <TableColumn>{t('collection.theme')}</TableColumn>
                  <TableColumn>{t('collection.link')}</TableColumn>
                </TableHeader>
                <TableBody>
                  {collections.map((collection)=>{
                    return (
                      <TableRow key={collection._id}>
                        <TableCell> 
                           {collection.name}
                        </TableCell>
                        <TableCell>
                          {collection.description}
                        </TableCell>
                        <TableCell>
                            {collection.theme}
                        </TableCell>
                        <TableCell>{collection.items.length}</TableCell>
                        <TableCell><Link to={`/collection/${collection._id}`}><LinkIcon/></Link></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                </Table>

              )}
          </div>
          {isOwner && (<div className='p-3 flex justify-end gap-3'>
            <Button color="success" variant='shadow' onPress={onOpen}>{t('buttons.add_new_collection')}</Button>
          </div>)}

         
    </div>
  )
}

export default Profile