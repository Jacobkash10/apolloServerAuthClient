import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const HttpLink = createHttpLink({
    uri: "http://localhost:5000/"
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(HttpLink),
    cache: new InMemoryCache()
})

export default client;