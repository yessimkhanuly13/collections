import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PopupContext } from '../App';
import { NavbarComponent, InputController, CheckboxController } from '../components/index';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Card, CardHeader, Divider, CardBody, CardFooter, LinkIcon} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { CURRENT_USER } from '../const';

function Collection() {
    const [collection, setCollection] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    const {control, handleSubmit, reset, watch} = useForm();
    const customField1 = watch("customField1_bool", false);
    const customField2 = watch("customField2_bool", false);
    const customField3 = watch("customField3_bool", false);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate();
    const collectionId = useParams();

    const {t} = useTranslation();
    
    const {url, darkMode, message} = useContext(PopupContext)

    const getCollectionById = () =>{
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
                if(res.data.userId === CURRENT_USER._id || CURRENT_USER.roles.includes('admin')){
                    setIsOwner(true);
                }
            })
            .catch((e)=>{
                console.log(e)
            })
    }


    const addNewItem = (data) =>{

        axios.put(`${url}/collections/additem/${collection._id}`, {userId: collection.userId, ...data })
            .then(()=>{
                getCollectionById();
                reset();
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const deleteItem = (id) =>{
        axios.delete(`${url}/collections/deleteitem/${collection._id}?id=${id}`)
            .then(()=>{
                getCollectionById();
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    

    useEffect(()=>{
        getCollectionById();
    }, [])

  return (
    <div className='w-full'>
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
                <ModalHeader className="flex flex-col gap-1">{t('buttons.add_new_item')}</ModalHeader>
                <ModalBody className='grid grid-cols-4 gap-3'>

                    <InputController
                            control={control}
                            type="text"
                            label={t('item.topic')}
                            name="topic"
                            style="max-w-xs col-span-2"
                    />

                    <InputController
                            control={control}
                            type="text"
                            label={t('item.desc')}
                            style="max-w-xs col-span-2"
                            name="topic"
                    />

                    <CheckboxController 
                            control={control} 
                            name="customField1_bool"
                            style="col-span-4"
                            bool={customField1}
                            value={t('item.custom_field_bool')}
                    />

                    { 
                        customField1 && (
                            <>
                                <InputController 
                                    name='customField1_name'
                                    control={control}
                                    label={t('item.custom_field_name')}
                                    style="col-span-2"
                                    type="text"
                                />

                                <InputController 
                                    name='customField1_value'
                                    control={control}
                                    label={t('item.custom_field_value')}
                                    style="max-w-xs col-span-2"
                                    type="text"
                                />
                            </>
                        )
                    }

                    <CheckboxController 
                            control={control} 
                            name="customField2_bool"
                            style="col-span-4"
                            bool={customField2}
                            value={t('item.custom_field_bool')}
                    />

                    { 
                        customField2 && (
                            <>
                                <InputController 
                                    name='customField2_name'
                                    control={control}
                                    label={t('item.custom_field_name')}
                                    style="col-span-2"
                                    type="text"
                                />

                                <InputController 
                                    name='customField2_value'
                                    control={control}
                                    label={t('item.custom_field_value')}
                                    style="max-w-xs col-span-2"
                                    type="text"
                                />
                            </>
                        )
                    }

                    <CheckboxController 
                            control={control} 
                            name="customField3_bool"
                            style="col-span-4"
                            bool={customField3}
                            value={t('item.custom_field_bool')}
                    />

                    { 
                        customField3 && (
                            <>
                                <InputController 
                                    name='customField3_name'
                                    control={control}
                                    label={t('item.custom_field_name')}
                                    style="col-span-2"
                                    type="text"
                                />

                                <InputController 
                                    name='customField3_value'
                                    control={control}
                                    label={t('item.custom_field_value')}
                                    style="max-w-xs col-span-2"
                                    type="text"
                                />
                            </>
                        )
                    }

                </ModalBody>
                <ModalFooter className='flex w-1/3 justify-around'>
                <Button color="success" variant="flat" onPress={onClose} onClick={handleSubmit((data)=>addNewItem(data))}>
                    {t('buttons.add')}
                  </Button>
                <Button color="danger" onClick={()=>reset()} onPress={onClose}>
                    {t('buttons.go_back')}
                  </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 p-5'>
            <div className='cols-span-1  md:col-span-4'>
                <div className='flex justify-center p-2'>
                    <h1 className='font-bold text-2xl'>{collection.name}</h1>
                </div>
                <Divider/>
                <div className='flex flex-col items-center gap-3'>
                    <span className='font-bold text-xl'>{t('collection.theme')}:</span>
                    <p>{collection.theme}</p>
                    <span className='font-bold text-xl'>{t('collection.description')}:</span>
                    <p>{collection.description}</p>
                </div>
                <Divider/>
                <div className='flex flex-col items-center gap-3 pb-3'>
                    <span className='font-bold text-xl'>{t('collection.items')}: {collection.items ? collection.items.length : 0}</span>
                    {isOwner && (<Button variant='shadow' color='success' onPress={onOpen}>{t('buttons.add_new_item')}</Button>)}
                </div>
            </div>
            {
                collection.items && collection.items.map((item)=>{
                    return (                    
                        <Card>
                            <CardHeader className='flex justify-center p-2'>
                                <span className='text-center font-bold text-xl'>{item.topic}</span>
                            </CardHeader>
                            <Divider/>
                            <CardBody className='flex flex-col items-center gap-3'>
                                <span className='font-bold text-xl'>{t('item.desc')}:</span>
                                <p>{item.desc}</p>
                                {item.customField1_bool && <div className={`grid grid-cols-1`}>
                                    <span className='col-span-1 text-center font-bold text-xl'>{t('item.custom_field_bool')}:</span>
                                    {
                                        item.customField1_bool && (
                                            <div className='flex gap-3'>
                                                <span className='text-l font-bold text-center'>{item.customField1_name}</span>
                                                <span>:</span>
                                                <span> {item.customField1_value}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        item.customField2_bool && (
                                            <div className='flex gap-3'>
                                                <span className='text-l font-bold text-center'>{item.customField2_name}</span>
                                                <span>:</span>
                                                <span>{item.customField2_value}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        item.customField3_bool && (
                                            <div className='flex gap-3'>
                                                <span className='text-l font-bold text-center'>{item.customField3_name}</span>
                                                <span>:</span>
                                                <span>{item.customField3_value}</span>
                                            </div>
                                        )
                                    }
                                </div>}
                            </CardBody>
                            <Divider/>
                            <CardFooter className={`grid grid-cols-1 ${isOwner ? "md:grid-cols-2 gap-2" : "md:grid-cols-1"}`}>
                                <Button variant='shadow' color='success' onClick={()=>navigate(`/item/${item._id}`)}><LinkIcon/></Button>
                                {isOwner && (<Button variant='shadow' color="danger" onClick={()=>deleteItem(item._id)}>{t('buttons.delete')}</Button>)}
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Collection   