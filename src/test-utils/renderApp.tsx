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
import { Toast } from '../infra/feedbackService/adapters/toast/Toast'
import { toastFeedback } from '../infra/feedbackService/adapters/toast/ToastFeedback'
import { FeedbackProvider } from '../infra/feedbackService/FeedbackProvider'
import { inMemoryRepository } from '../infra/repositories/adapters/inMemory'
import { RepositoryProvider } from '../infra/repositories/RepositoryProvider'
import { inMemoryStorage } from '../infra/storage/adapters/InMemoryStorage'
import { StorageProvider } from '../infra/storage/StorageContext'
import { AppStack } from '../ui/navigation/AppStack'
import theme from '../ui/theme/theme'

function MockedAuthProvider({children}: PropsWithChildren) {

  const authUser:AuthUser = {
    email: 'test@test.com',
    fullname: 'Test User',
    id: '1',
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


export function renderApp(options?: {isAuthenticated?: boolean}) {

  const FinalAuthProvider = options?.isAuthenticated ? MockedAuthProvider : AuthProvider

  function Wrapper({children}: PropsWithChildren) {
    return (
      <StorageProvider storage={inMemoryStorage}>
        <FinalAuthProvider>
          <FeedbackProvider value={toastFeedback}>
            <RepositoryProvider value={inMemoryRepository}>
              <ThemeProvider theme={theme}>
                {children}
                <Toast/>
              </ThemeProvider>
            </RepositoryProvider>
          </FeedbackProvider>
        </FinalAuthProvider>
      </StorageProvider>
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
    "sign-in": () => <SignInScreen/>,
    "sign-up": () => <SignUpScreen/>,
  }, {wrapper: Wrapper, initialUrl: '/'})
}