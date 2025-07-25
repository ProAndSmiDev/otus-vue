import {ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client/core"

const httpLink = createHttpLink({
    uri: 'https://countries.trevorblades.com/',
})

const cache = new InMemoryCache()
const client: ApolloClient<Countries> = new ApolloClient({
    link: httpLink,
    cache,
})

export default client

