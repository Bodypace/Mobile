import React, { createContext, useContext } from 'react'
import storage from './storage';
import { gql, useApolloClient } from '@apollo/client';


export const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export function ProvideAuth({ setIsLoggedIn, children }) {
  const client = useApolloClient()

  const auth = {
    onAutoLogin: () => setIsLoggedIn(true),
    onAutoLogout: () => setIsLoggedIn(false),
    login: async (email, password) => {
      try {
        await storage.remove('token')
        const { data } = await client.query({
          query: LOGIN_QUERY,
          variables: {
            email, password
          },
        })

        await storage.store('email', email)
        await storage.store('password', password)
        await storage.store('token', data.login.token)
        setIsLoggedIn(true)
      } catch (e) {
        console.log(`login error: ${e.message}`)
      }
    },
    logout: async () => {
      return storage.remove('token').then(() => client.resetStore())
    }
  }

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
