import { useMutation } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries';

function AddAuthor() {

    const [showAlert,setShow] = useState(false);
    const [authorName,setAuthorName] = useState();
    const [authorAge,setAuthorAge] = useState();
    const [formInvalid,setInvalid] = useState(false);

    const [mutateAuthor,{data,loading,error}] = useMutation(addAuthorMutation,
        {
            variables: {
                name:authorName,
                age:parseInt(authorAge)
            },
            refetchQueries:[{query:getAuthorsQuery}]
        }
    )

    function addAuthor() {
        if(authorName && authorAge) {
            setInvalid(false);
            var age = parseInt(authorAge);
            mutateAuthor(
                {
                    name:authorName,
                    age:age
                }
            ).then(res =>{
                setShow(true);
                setTimeout(()=>{
                    setShow(false);
                },1600)
            })
            return 
        }
        setInvalid(true);
    }

  return (
    <div>
        <Box w={500} mt={16} padding={6} border="2px solid" borderColor="#f2f2f7" width={500} color="#323232" borderRadius="md">
            <FormControl isInvalid={formInvalid} >
                <Heading mb={6} size="md">Add Author</Heading>
                <VStack spacing="16px" align="left">
                <div>
                    <FormLabel>Author Name</FormLabel>
                    <Input type='text' required={true} onChange={(e)=>{setAuthorName(e.target.value)}} />
                    <FormErrorMessage>Please ente a name sigh</FormErrorMessage>
                </div>
                <div>
                    <FormLabel>Age</FormLabel>
                    <Input type='text' required={true} onChange={(e)=>{setAuthorAge(e.target.value)}} />
                    <FormErrorMessage>Please ente the authors age </FormErrorMessage>
                </div>
                <div>
                    <Button w="100%" type='submit' onClick={()=>{addAuthor()}}>
                        Add Author
                    </Button>
                </div>
                </VStack>
            </FormControl>
            {
                showAlert &&
                <Alert status='success' mt={4} >
                    <AlertIcon />
                    <AlertTitle>Author Added!</AlertTitle>
                </Alert>
            }
        </Box>
    </div>
  )
}

export default AddAuthor