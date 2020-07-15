import React, { createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import CURRENT_USER_QUERY from "../graphql/current-user.query";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const me = loading || data;
  return <UserContext.Provider value={me}>{children}</UserContext.Provider>;
};

export default UserContext;
