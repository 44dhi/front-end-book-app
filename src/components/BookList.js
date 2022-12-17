/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {useQuery} from '@apollo/client';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Box,
    CircularProgress,
    Flex,
    Text,
    Spacer,
  } from '@chakra-ui/react'
import { deleteBookMutation, getBooksQuery } from '../queries/queries';
import '../index.css';


function BookList() {

    const {loading,data,error} = useQuery(getBooksQuery);

    const [deleteBook] = useMutation(deleteBookMutation,{
        variables:{
            id:''
        },
        refetchQueries:[{query:getBooksQuery}]
    })

  return (
    <div style={{marginTop:'20px'}}>
        <Box  p={6} border="2px solid" borderColor="#f2f2f7" width={500} color="#323232" borderRadius="md">
            {
                loading ?
                <Flex dir='row' align="center" gap={4} >
                    <CircularProgress isIndeterminate></CircularProgress>
                    <Text fontWeight="bold" color="#323232" >Getting Books...</Text>
                </Flex>
                :
                error ?
                <div>{error.message}</div>
                :
                <OrderedList spacing={3}>
                    {
                    data.books.map((key,index) => {
                        return <ListItem key={index} >
                            <Flex cursor="pointer" className='flex-container' id={'author-' + key.index} position="relative" zIndex={100} onClick={()=>{
                                deleteBook({variables:{
                                    id:key.id
                                }})
                                }}>
                                <Text color="#323232" fontSize="md" fontWeight="medium" >{key.name}</Text>
                                <Spacer />
                                <Text color="#a9a9b5"  fontSize="md" id={'text-' + key.index}  >{key.author.name}</Text>
                                <Text color="red" className='hidden-text' fontSize="md" id={'text-' + key.index}>Delete</Text>
                            </Flex>
                        </ListItem>
                    })
                    }
                </OrderedList>
            }
        </Box>
    </div>
  )
} 

export default BookList;