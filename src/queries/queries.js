import { gql } from "@apollo/client";

export const getBooksQuery = gql`
{
    books{
        name
        id
        author{
            name
        }
    }
}
` 

export const getAuthorsQuery = gql`
{
    authors{
        id
        name
    }
}`

export const addBookMutation = gql`
    mutation AddBook($name:String!,$genre:String!,$authorId:ID){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }
`

export const addAuthorMutation = gql`
mutation AddAuthor($name:String!, $age:Int!) {
    addAuthor(name:$name,age:$age) {
        name
        id
    }
}
`
export const deleteBookMutation = gql`
    mutation DeleteBook($id:ID!) {
        deleteBook(id:$id) {
            name
            id
        }
    }
`