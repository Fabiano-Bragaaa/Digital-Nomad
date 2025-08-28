import { useStorage } from "@/src/infra/storage/StorageContext";
import { router, SplashScreen } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthUser } from "./AuthUser";

type AuthState = {
  authUser: AuthUser | null;
  isReady: boolean;
  saveAuth(authUser: AuthUser): Promise<void>;
  removeAuthUser(): Promise<void>;
};

SplashScreen.preventAutoHideAsync()

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
  const {storage} = useStorage()

  async function saveAuth(user: AuthUser) {
    await storage.setItem(AUTH_KEY, user);
    setAuthUser(user);
    router.replace("/");
  }

  async function removeAuthUser() {
    await storage.removeItem(AUTH_KEY);
    setAuthUser(null);
  }

  async function loadAuthUser() {
    try {

      // await new Promise(resolve => setTimeout(resolve, 2000))

      const user = await storage.getItem<AuthUser>(AUTH_KEY);
      if (user) {
        setAuthUser(user);
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

  useEffect(() => {
    if(isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])

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
