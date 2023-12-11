import React from 'react'
import { itemTable } from '../utils/index'
import { Table, TableBody, TableColumn, TableHeader, LinkIcon, TableRow, TableCell } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { UnixToDate } from './index';

function ItemTable({items}) {
    const cols = itemTable();

    
    return (
        <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                {
                    cols.map((colValue)=>{
                        return (
                            <TableColumn>{colValue}</TableColumn>
                        )
                    })
                }
              </TableHeader>
              <TableBody>
                {items.map((item)=>{
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{item.desc}</TableCell>
                      <TableCell><UnixToDate unix={item.createdDate}/></TableCell>
                      <TableCell>{item.tags.length}</TableCell>
                      <TableCell><Link to={`/item/${item._id}`}><LinkIcon/></Link></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
    )
}

export default ItemTable