const express = require('express')
const app = express()
const port = 3000
const userData = require("./mock.json");
const {GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLInt, GraphQLList} = require("graphql");
const graphql = require("graphql");

const { graphqlHTTP } = require("express-graphql");
const UserType = new GraphQLObjectType({
  name : "User",
  fields : () => ({
    id : { type: GraphQLInt},
    first_name : { type: GraphQLString},
    last_name : { type: GraphQLString},
    email : { type: GraphQLString},
    gender : { type: GraphQLString},
    ip_address : {type : GraphQLString}
  })
})

// [{"id":1,"first_name":"Tymon","last_name":"Zanini","email":"tzanini0@wunderground.com","gender":"Male","ip_address":"146.3.186.74"},
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields : {
    getAllUsers : {
      type : new GraphQLList(UserType),
      args : {id : {type : GraphQLInt}},
      resolve(parent,args)
      {
        return userData;
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name : "Mutation",
  fields : {
    createUser: {
      type : UserType,
      args : {
        first_name : { type : GraphQLString},
        last_name : { type : GraphQLString},
        email : { type : GraphQLString},
        gender : { type : GraphQLString},
        ip_address : { type : GraphQLString},
      },
      resolve(parent,args){
        // db.query("Insert into")
        userData.push({
          id:userData.length+1,
          first_name: args.first_name,
          last_name : args.last_name,
          email : args.email,
          ip_address : args.ip_address
          })
        return args;
      }
    }
  }
});
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);