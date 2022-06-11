import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { Api } from "../service/api";

type User = {
  id: number;
  email: string;
  inserted_at: string;
  name: string;
  updated_at: string;
};

type AuthContextProps = {
  isLogged: boolean;
  token: string | null;
  user: User | null;
  auth: (email: string, password: string) => Promise<AuthReturnProps>;
};

type AuthProviderProps = {
  children?: React.ReactNode;
};

type ApiRequestAuth = {
  email: string;
  password: string;
};

type ApiResponseAuth = {
  message: string;
  token: string;
  user: User;
};

type AuthReturnProps = {
  isLogged: boolean;
  message: string;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storagedToken = localStorage.getItem("cnab:access-token");

    if (storagedToken) {
      return storagedToken;
    } else {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    const storagedUser = localStorage.getItem("cnab:user-data");

    if (storagedUser) {
      return JSON.parse(storagedUser);
    } else {
      return null;
    }
  });

  const [isLogged, setIsLogged] = useState<boolean>(false);

  async function auth(
    email: string,
    password: string
  ): Promise<AuthReturnProps> {
    return await Api.post<any, AxiosResponse<ApiResponseAuth>, ApiRequestAuth>(
      "/user/auth",
      { email, password }
    )
      .then((response) => {
        const { data } = response;
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("cnab:access-token", data.token);
        localStorage.setItem("cnab:user-data", JSON.stringify(data.user));

        return {
          isLogged: true,
          message: data.message,
        } as AuthReturnProps;
      })
      .catch((error) => {
        const message = error.response.data.message as string;

        return {
          isLogged: false,
          message,
        };
      });
  }

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        token,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
