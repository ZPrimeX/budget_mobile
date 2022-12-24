import React, { ReactNode } from "react";

export const AuthContext = React.createContext({ auth: false });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={{ auth: false }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
