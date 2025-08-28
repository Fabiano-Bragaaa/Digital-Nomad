import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthUser } from "./AuthUser";

type AuthState = {
  authUser: AuthUser | null;
  isReady: boolean;
  saveAuth(authUser: AuthUser): Promise<void>;
  removeAuthUser(): Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  authUser: null,
  isReady: false,
  saveAuth: async () => {},
  removeAuthUser: async () => {},
});

const AUTH_KEY = "AUTH_KEY";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  async function saveAuth(user: AuthUser) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuthUser(user);
    router.replace("/");
  }

  async function removeAuthUser() {
    await AsyncStorage.removeItem(AUTH_KEY);
    setAuthUser(null);
  }

  async function loadAuthUser() {
    try {
      const user = await AsyncStorage.getItem(AUTH_KEY);
      if (user) {
        setAuthUser(JSON.parse(user));
      }
    } catch (error) {
      //TODO
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    loadAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, isReady, saveAuth, removeAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
