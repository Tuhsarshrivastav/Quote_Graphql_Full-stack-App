import {ApolloServer} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import typeDefs from './schemaGql.js'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.connect(process.env.db,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
  console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
  console.log("error connecting",err)
})
//import models here
import './models/Quotes.js'
import './models/User.js'

import {resolvers} from './resolvers.js'


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})

server.listen().then(({url})=>{
  console.log(`server is running ${url}`)
})