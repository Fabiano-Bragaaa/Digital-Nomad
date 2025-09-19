import HomeScreen from '@/app/(protected)/(tabs)'
import TabLayout from '@/app/(protected)/(tabs)/_layout'
import ExploreScreen from '@/app/(protected)/(tabs)/explore'
import ProfileScreen from '@/app/(protected)/(tabs)/profile'
import ProtectedLayout from '@/app/(protected)/_layout'
import CityDetailsScreen from '@/app/(protected)/city-details/[id]'
import SignInScreen from '@/app/sign-in'
import SignUpScreen from '@/app/sign-up'
import { ThemeProvider } from '@shopify/restyle'
import { renderRouter } from 'expo-router/testing-library'
import { PropsWithChildren } from 'react'
import { AuthContext, AuthProvider } from '../domain/auth/AuthContext'
import { AuthUser } from '../domain/auth/AuthUser'
import { Repositories } from '../domain/Repositories'
import { Toast } from '../infra/feedbackService/adapters/toast/Toast'
import { toastFeedback } from '../infra/feedbackService/adapters/toast/ToastFeedback'
import { FeedbackProvider } from '../infra/feedbackService/FeedbackProvider'
import { inMemoryRepository } from '../infra/repositories/adapters/inMemory'
import { RepositoryProvider } from '../infra/repositories/RepositoryProvider'
import { inMemoryStorage } from '../infra/storage/adapters/InMemoryStorage'
import { StorageProvider } from '../infra/storage/StorageContext'
import { AppStack } from '../ui/navigation/AppStack'
import theme from '../ui/theme/theme'

import UpdatedPasswordScreen from '@/app/(protected)/update-password'
import UpdateProfileScreen from '@/app/(protected)/update-profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { queryClientOptions } from './queryClientOptions'


type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function MockedAuthProvider({children}: PropsWithChildren) {

  const authUser:AuthUser = {
    email: 'test@test.com',
    fullname: 'Test User',
    id: '1',
    createdAt: '2025-09-03T12:13:09.324292Z',
  }

  return (
    <AuthContext.Provider value={{
      isReady: true,
      authUser,
      saveAuth: async () => {},
      removeAuthUser: async () => {},
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export function renderApp(options?: {isAuthenticated?: boolean, repository?: DeepPartial<Repositories>}) {

  const finalRepository:Repositories = 
    merge(cloneDeep(inMemoryRepository), options?.repository ?? {})
  

  const FinalAuthProvider = options?.isAuthenticated ? MockedAuthProvider : AuthProvider
  const queryClient = new QueryClient(queryClientOptions)

  function Wrapper({children}: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
      <StorageProvider storage={inMemoryStorage}>
        <FinalAuthProvider>
          <FeedbackProvider value={toastFeedback}>
            <RepositoryProvider value={finalRepository}>
              <ThemeProvider theme={theme}>
                {children}
                <Toast/>
              </ThemeProvider>
            </RepositoryProvider>
          </FeedbackProvider>
        </FinalAuthProvider>
      </StorageProvider>
      </QueryClientProvider>
    );
  }

  renderRouter({
    _layout: () => <AppStack/>,
    "(protected)/_layout": () => <ProtectedLayout/>,
    "(protected)/(tabs)/_layout": () => <TabLayout/>,
    "(protected)/(tabs)/index": () => <HomeScreen/>,
    "(protected)/(tabs)/explore": () => <ExploreScreen/>,
    "(protected)/(tabs)/profile": () => <ProfileScreen/>,
    "(protected)/(tabs)/city-details/[id]": () => <CityDetailsScreen/>,
    "(protected)/update-profile": () => <UpdateProfileScreen/>,
    "(protected)/update-password": () => <UpdatedPasswordScreen/>,
    "sign-in": () => <SignInScreen/>,
    "sign-up": () => <SignUpScreen/>,
  }, {wrapper: Wrapper, initialUrl: '/'})
}