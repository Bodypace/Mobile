import React, { createContext, useContext } from "react";
import storage from "./storage";
import { gql, useApolloClient } from "@apollo/client";

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

const GET_REGISTER_CODE_MUTATION = gql`
  mutation GetRegisterCode($email: String!, $password: String!) {
    getRegisterCode(email: $email, password: $password) {
      success
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $code: String!) {
    register(email: $email, password: $password, code: $code) {
      success
    }
  }
`;

export function ProvideAuth({ setIsLoggedIn, children }) {
  const client = useApolloClient();

  const auth = {
    onAutoLogin: () => setIsLoggedIn(true),
    onAutoLogout: () => setIsLoggedIn(false),
    login: async (email, password) => {
      await storage.remove("token");
      const { data } = await client.query({
        query: LOGIN_QUERY,
        variables: {
          email,
          password,
        },
      });

      await storage.store("email", email);
      await storage.store("password", password);
      await storage.store("token", data.login.token);
      setIsLoggedIn(true);
    },
    logout: async () => {
      return storage.remove("token").then(() => client.resetStore());
    },
    getRegisterCode: async (email, password) => {
      console.log("getRegisterCode()");
      const response = await client.mutate({
        mutation: GET_REGISTER_CODE_MUTATION,
        variables: {
          email,
          password,
        },
      });
      console.log("getRegisterCode:", { response });
    },
    register: async (email, password) => {
      const response = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          email,
          password,
          code,
        },
      });
    },
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
