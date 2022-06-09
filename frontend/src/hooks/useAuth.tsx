import { AxiosResponse } from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { Api } from '../service/api';

type AuthContextProps = {
  token: string | null;
  auth: (email: string, password: string) => Promise<AuthReturnProps>;
}

type AuthProviderProps = {
  children?: React.ReactNode;
}

type ApiRequestAuth = {
  email: string;
  password: string;
}

type ApiResponseAuth = {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    inserted_at:  string;
    name: string;
    updated_at: string;
  };
}

type AuthReturnProps = {
  status: 'logged' | 'error';
  message: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storagedToken = localStorage.getItem('cnab:access-token');
    if (storagedToken) {
      return storagedToken;
    } else {
      return null;
    }
  });

  async function auth(email: string, password: string): Promise<AuthReturnProps> {
    return await Api.post<any, AxiosResponse<ApiResponseAuth>, ApiRequestAuth>(
      '/user/auth', 
      { 
        email,
        password,
      }
    ).then(response => {
      const { data } = response;
      setToken(data.token);

      localStorage.setItem('cnab:access-token', data.token);

      return {
        status: 'logged',
        message: data.message,
      } as AuthReturnProps;
    }).catch((error) => {
      const message = error.response.data.message as string;

      return {
        status: 'error',
        message,
      };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        auth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}