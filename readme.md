This is a GraphQL project with mock sample data from https://www.mockaroo.com/

There are 2 implemations being implemented

Query
getAllUsers

query{
  getAllUsers {
    id
    first_name
    email
    email
  }
}


Mutation
CreateUser

mutation{
  createUser(first_name:"ashok",last_name:"kumar",email:"ashok@gmail.com",gender:"male") {
    first_name
    email
    email
  }
}


