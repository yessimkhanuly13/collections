import React from 'react'
import { Table, TableBody, TableColumn, TableHeader, LinkIcon, TableRow, TableCell } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { collectionTable } from '../utils';

function CollectionTable({collections}) {
    const cols = collectionTable();

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
                {collections.map((collection)=>{
                  return (
                    <TableRow key={collection._id}>
                      <TableCell>{collection.name}</TableCell>
                      <TableCell>{collection.description}</TableCell>
                      <TableCell>{collection.theme}</TableCell>
                      <TableCell>{collection.items.length}</TableCell>
                      <TableCell><Link to={`/collection/${collection._id}`}><LinkIcon/></Link></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
        </Table>
    )
}

export default CollectionTable