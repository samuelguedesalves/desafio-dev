import type { User } from "../types/User";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { Api } from "../service/api";

type AuthContextProps = {
  isLogged: boolean;
  token: string | null;
  user: User | null;
  auth: (email: string, password: string) => Promise<AuthReturnProps>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<SignUpReturnProps>;
  logout: () => void;
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

type ApiRequestSignUp = {
  name: string;
  email: string;
  password: string;
};

type ApiResponseSignUp = {
  message: string;
  token: string;
  user: User;
};

type SignUpMessageErrors = {
  email?: string[];
  password?: string[];
};

type SignUpReturnProps = {
  isLogged: boolean;
  message: string | SignUpMessageErrors;
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

  async function signUp(
    name: string,
    email: string,
    password: string
  ): Promise<SignUpReturnProps> {
    return await Api.post<
      any,
      AxiosResponse<ApiResponseSignUp>,
      ApiRequestSignUp
    >("/user/create", { name, email, password })
      .then((response) => {
        const { data } = response;

        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("cnab:access-token", data.token);
        localStorage.setItem("cnab:user-data", JSON.stringify(data.user));

        return {
          isLogged: true,
          message: data.message,
        };
      })
      .catch((error) => {
        const message = error.response.data.message as SignUpMessageErrors;

        return {
          isLogged: false,
          message: message,
        };
      });
  }

  function logout() {
    localStorage.removeItem("cnab:access-token");
    localStorage.removeItem("cnab:user-data");

    setToken(null);
    setUser(null);
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
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
