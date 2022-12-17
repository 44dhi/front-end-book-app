import './App.css';
import BookList from './components/BookList';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import AddBook from './components/AddBook';
import { Box, ChakraProvider, Flex, Heading, Spacer } from '@chakra-ui/react'
import AddAuthor from './components/AddAuthor';


//client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
 

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Box m={4}>
          <div className="main">
            <Flex direction="row" gap={4}>
              <Flex direction="column" align="center">
                <div>
                  <Heading>📖 44dhi Reading List</Heading>
                  <BookList />
                </div>
                <Spacer/>
                <AddBook />
              </Flex>
              <AddAuthor />
            </Flex>
          </div> 
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
