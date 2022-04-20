import {
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  HttpLink,
  concat,
} from "@apollo/client";
import storage from './storage'
import { cache } from './cache';
import Constants from "expo-constants";


export function ProvideClient({ children }) {
  const authMiddleware = new ApolloLink(async (operation, forward) => {
    const token = await storage.read('token')

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    }));

    console.log('making request with token: ', token)
    return forward(operation);
  })

  const { manifest } = Constants
  const address = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift()
    : `api.example.com`;
  const port = 4000

  const httpLink = new HttpLink({
    uri: `http://${address}:${port}`
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
  })
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
