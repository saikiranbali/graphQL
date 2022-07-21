const express = require('express')
const app = express()
const port = 3000
const {GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLInt, GraphQLList} = require("graphql");
const graphql = require("graphql");
const schema=require("./Schemas/index.js");
const { graphqlHTTP } = require("express-graphql");


// [{"id":1,"first_name":"Tymon","last_name":"Zanini","email":"tzanini0@wunderground.com","gender":"Male","ip_address":"146.3.186.74"},


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