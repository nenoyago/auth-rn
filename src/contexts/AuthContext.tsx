import React, { createContext, ReactNode, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, [])

  async function loadStorageData() {
    const resultStoraged = await AsyncStorage.multiGet(['@RNAuth:user', '@RNAuth:token']);

    const [storagedUser, storagedToken] = resultStoraged.map((result, i, store) => {
      let value = store[i][1];

      return value;
    });

    if (storagedUser && storagedToken) {
      api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

      setUser(JSON.parse(storagedUser));
    }

    setLoading(false);
  }

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => setUser(null));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}