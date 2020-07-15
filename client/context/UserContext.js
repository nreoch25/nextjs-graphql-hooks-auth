import React, { createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import CURRENT_USER_QUERY from "../graphql/current-user.query";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const me = loading || data;
  console.log("USER CONTEXT", me);
  return <UserContext.Provider value={me}>{children}</UserContext.Provider>;
};

export default UserContext;
