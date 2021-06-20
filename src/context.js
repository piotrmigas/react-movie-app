import React from "react";

export const Context = React.createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = React.useState(undefined);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default UserProvider;
