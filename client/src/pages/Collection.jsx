import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PopupContext } from '../App';
import NavbarComponent from '../components/Navbar';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Card, CardHeader, Divider, CardBody, CardFooter, LinkIcon} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';


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
    
    const {setMessage, url, darkMode, message} = useContext(PopupContext)

    const getCollectionById = () =>{
        const user = JSON.parse(localStorage.getItem('currentUser'));
        axios.get(`${url}/collections/${collectionId.id}`)
            .then((res)=>{
                setCollection(res.data)
                if(res.data.userId === user._id){
                    setIsOwner(true);
                }
            })
            .catch((e)=>{
                setMessage(e.response.data.message)
            })
    }


    const addNewItem = (data) =>{

        axios.put(`${url}/collections/additem/${collection._id}`, {userId: collection.userId, ...data })
            .then(()=>{
                getCollectionById();
            })
            .catch((e)=>{
                setMessage(e.response.data.message);
            })
    }

    const deleteItem = (id) =>{
        axios.delete(`${url}/collections/deleteitem/${collection._id}?id=${id}`)
            .then((res)=>{
                getCollectionById();
            })
            .catch((e)=>{
                console.log(e);
                setMessage(e.response.data.message)
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
        >
          <ModalContent className='flex flex-col items-center'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add new item</ModalHeader>
                <ModalBody className='grid grid-cols-4 gap-3'>

                        <Controller control={control} name='topic' 
                        render={({field})=><Input
                            {...field}
                            isRequired
                            type="text"
                            label="Topic"
                            className="max-w-xs col-span-2"
                        />}/>

                        <Controller control={control} name='desc' 
                        render={({field})=><Input
                            {...field}
                            isRequired
                            type="text"
                            label="Description"
                            className="max-w-xs col-span-2"
                        />}/>
                        
                        <Controller control={control} name='customField1_bool'
                        render={({field})=>
                            <Checkbox {...field} className='col-span-4' isSelected={field.value} >
                                Custom Field
                            </Checkbox>}/>

                       {customField1 && (<Controller control={control} name='customField1_name' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Name"
                        className="max-w-xs col-span-2"
                      />}/>)}

                       {customField1 && <Controller control={control} name='customField1_value' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Value"
                        className="max-w-xs col-span-2"
                      />}/>}

                       {customField1 && <Controller control={control} name='customField2_bool'
                        render={({field})=>
                            <Checkbox {...field} className='col-span-4' isSelected={field.value} >
                                Custom Field
                            </Checkbox>}/>}

                      {customField2 && (<Controller control={control} name='customField2_name' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Name"
                        className="max-w-xs col-span-2"
                      />}/>)}

                       {customField2 && (<Controller control={control} name='customField2_value' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Value"
                        className="max-w-xs col-span-2"
                      />}/>)}

                        {customField2 && <Controller control={control} name='customField3_bool'
                        render={({field})=>
                            <Checkbox {...field} className='col-span-4' isSelected={field.value} >
                                Custom Field
                            </Checkbox>}/>}

                      {customField2 && customField3 && ( <Controller control={control} name='customField3_name' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Name"
                        className="max-w-xs col-span-2"
                      />}/>)}

                       {customField2 && customField3 && (<Controller control={control} name='customField3_value' 
                      render={({field})=><Input
                      isRequired
                        {...field}
                        type="text"
                        label="Custom Field Value"
                        className="max-w-xs col-span-2"
                      />}/>)}
                      
                </ModalBody>
                <ModalFooter className='flex w-1/3 justify-around'>
                <Button color="success" variant="flat" onPress={onClose} onClick={handleSubmit((data)=>addNewItem(data))}>
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
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 p-5'>
            {/* <div className='flex flex-col items-center justify-center border rounded p-2'>
                <span className='text-center font-bold text-xl'>Description</span>
                <p>{collection.description}</p>
                <p>{collection.items && collection.items.length}</p>

                {isOwner && (<Button onPress={onOpen}>New Item</Button>)} 
            </div> */}
            <div className='cols-span-1  md:col-span-4'>
                <div className='flex justify-center p-2'>
                    <h1 className='font-bold text-2xl'>{collection.name}</h1>
                </div>
                <Divider/>
                <div className='flex flex-col items-center gap-3'>
                    <span className='font-bold text-xl'>Theme:</span>
                    <p>{collection.theme}</p>
                    <span className='font-bold text-xl'>Description:</span>
                    <p>{collection.description}</p>
                </div>
                <Divider/>
                <div className='flex flex-col items-center gap-3 pb-3'>
                    <span className='font-bold text-xl'>Items: {collection.items ? collection.items.length : 0}</span>
                    {isOwner && (<Button variant='shadow' color='success' onPress={onOpen}>Add new item</Button>)}
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
                                <span className='font-bold text-xl'>Description:</span>
                                <p>{item.desc}</p>
                                {item.customField1_bool && <div className={`grid grid-cols-1 md:grid-cols-${item.customField3_bool ? 3 : item.customField2_bool ? 2 : 1}`}>
                                    <span className='col-span-1 md:col-span-4 text-center font-bold text-xl'>Custom fields:</span>
                                    {
                                        item.customField1_bool && (
                                            <div className='flex flex-col p-2'>
                                                <span className='text-l font-bold text-center'>{item.customField1_name}:</span>
                                                <span>{item.customField1_value}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        item.customField2_bool && (
                                            <div className='flex flex-col p-2'>
                                                <span className='text-l font-bold text-center'>{item.customField2_name}:</span>
                                                <span>{item.customField2_value}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        item.customField3_bool && (
                                            <div className='flex flex-col p-2'>
                                                <span className='text-l font-bold text-center'>{item.customField3_name}:</span>
                                                <span>{item.customField3_value}</span>
                                            </div>
                                        )
                                    }
                                </div>}
                            </CardBody>
                            <Divider/>
                            <CardFooter className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <Button variant='shadow' color='success' onClick={()=>navigate(`/item/${item._id}`)}><LinkIcon/></Button>
                                <Button variant='shadow' color="danger" onClick={()=>deleteItem(item._id)}>Delete</Button>
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