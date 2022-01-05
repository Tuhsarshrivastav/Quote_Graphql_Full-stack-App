import {ApolloServer} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import {resolvers} from './resolvers.js'
import typeDefs from './schemaGql.js'



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