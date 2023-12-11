import React, { useState } from 'react'
import { Select, SelectItem, Button, Table, TableBody, TableRow, TableColumn, LinkIcon, TableHeader, TableCell, Input} from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { DeleteIcon, EditIcon } from '../icons/index';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { collectionTableOwner } from '../utils/index';
import InputController from './InputController';


function CollectionOwnerTable({collections, getAllUserCollections, url}) {
    const [editingCollectionId, setEditingCollectionId] = useState(null);
    const {control, handleSubmit, reset} = useForm();
    const cols = collectionTableOwner()
    const {t} = useTranslation()

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

  return (
    <Table className='p-3' isStriped aria-label="Example static collection table">
              <TableHeader>
                {
                    cols.map((colValue)=>{
                        return(
                            <TableColumn>{colValue}</TableColumn>
                        )
                    })
                }
              </TableHeader>
              <TableBody>
                {collections.map((collection)=>{
                  return (
                    <TableRow key={collection._id}>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (
                            <InputController 
                                control={control}
                                name='name'
                                placeholder={t('collection.name')}
                                defaultValue={collection.name}
                            />
                        ) 
                        :
                         collection.name}
                      </TableCell>
                      <TableCell>{editingCollectionId === collection._id ? 
                        (
                            <InputController
                                control={control}
                                name="description"
                                defaultValue={collection.description}
                                placeholder={t('collection.description')}
                            />
                        ) 
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
                      <TableCell>
                        {collection.items.length}
                      </TableCell>
                      <TableCell>
                        <Link to={`/collection/${collection._id}`}>
                            <LinkIcon/>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center p-3 gap-2 cursor-pointer">{
                            editingCollectionId === collection._id ? (
                                <div className='flex gap-2'>
                                    <Button onClick={()=>{setEditingCollectionId(null); reset()}}>{t('buttons.go_back')}</Button>
                                    <Button onClick={handleSubmit((data)=>handleSaveUpdate(data, collection._id))}>{t('buttons.update')}</Button>
                                </div>
                                ) : (
                                <EditIcon onClick={()=>setEditingCollectionId(collection._id)} />
                                )
                            }
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center p-3 gap-2 cursor-pointer">
                            <DeleteIcon onClick={()=>handleDelete(collection._id)}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              </Table>
  )
}

export default CollectionOwnerTable