/* eslint-disable no-unused-vars */
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Divider, Heading, Input, Select, SelectField, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries';



function AddBook() {

    const {data,error,loading} = useQuery(getAuthorsQuery);
    
    const [bookName,setBookName] = useState();
    const [genre,setGenre] = useState();
    const [authorId,setAuthorId] = useState();
    const [formError,setError] = useState(false);

    //queries
    const [addBook, {mutationData,mutationLoading,mutationError}] = useMutation(addBookMutation,{
        variables:{
            name:'',
            genre:'',
            authorId:''
        },
        refetchQueries:[{
            query:getBooksQuery,
        }]
    });

    function submitForm(e) {

        if(bookName && genre && authorId) {
            addBook({
               variables:{
                name:bookName,
                genre:genre,
                authorId:authorId
               }
            })
            return
        }

        setError(true);
        return
    }

  return (
    <div>
        <Box  w={500} mt={6} padding={6} border="2px solid" borderColor="#f2f2f7" width={500} color="#323232" borderRadius="md">
            <FormControl isRequired id='add-book' isInvalid={formError} >
                <Heading mb={6} size="lg">Add Book</Heading>
                <VStack spacing="16px" align="left">
                    <div>
                        <FormLabel>Book Name</FormLabel>
                        <Input type='text' onChange={(e)=>{setBookName(e.target.value)}}  required={true} />
                        <FormErrorMessage>Please Enter a book name</FormErrorMessage>
                    </div>
                    <div>
                        <FormLabel>Genre</FormLabel>
                        <Input type='text' onChange={(e)=>{setGenre(e.target.value)}} required={true} />
                        <FormErrorMessage>Please Enter a genre</FormErrorMessage>
                    </div>
                    <div>
                        <FormLabel>Author</FormLabel>
                        <Select placeholder='Select Author' onChange={(e)=>{setAuthorId(e.target.value)}} >
                            {
                                loading ? <option>Loading....</option> :
                                data.authors.map((key,index)=>{
                                    return <option value={key.id} key={index}>{key.name}</option>
                                })
                            }
                        </Select>
                        <FormErrorMessage>Please select an Author</FormErrorMessage>
                    </div>
                    <div>
                        <Button type='submit' w="100%" onClick={(e)=>{submitForm(e)}} >
                            Submit
                        </Button>
                    </div>
                </VStack>
            </FormControl>

        </Box>
    </div>
  )
}

export default AddBook