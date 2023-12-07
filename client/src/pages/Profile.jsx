import React, { useContext, useEffect, useState } from 'react'
import { CollectionTable, NavbarComponent } from '../components/index';
import axios from 'axios';
import { PopupContext } from '../App';
import { useParams } from 'react-router-dom';
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import CollectionOwnerTable from '../components/CollectionOwnerTable';

function Profile() {
  const [isOwner, setIsOwner] = useState(false);
  const [collections, setCollections] = useState([]);

  const {t} = useTranslation();

  const userId = useParams();

  const {control, handleSubmit, reset} = useForm();

  const {url, darkMode} = useContext(PopupContext)

  const getAllUserCollections = () =>{
    reset();
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if(user._id === userId.id || user.roles.includes('admin')){
      setIsOwner(true);
    }

    axios.get(`${url}/collections/user/${userId.id}`)
      .then((res)=>{
        setCollections(res.data);
        console.log(res.data)
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
          {
            isOwner ? (
              <CollectionOwnerTable collections={collections} getAllUserCollections={getAllUserCollections} url={url}/>
            ) : (
                <CollectionTable collections={collections}/>
            )
          }
          </div>
          {
            isOwner && (<div className='p-3 flex justify-end gap-3'>
              <Button color="success" variant='shadow' onPress={onOpen}>{t('buttons.add_new_collection')}</Button>
            </div>)
          }

         
    </div>
  )
}

export default Profile