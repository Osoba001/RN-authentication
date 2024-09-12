import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/user_modules/SignIn/SignInScreen';
import SignupScreen from './src/user_modules/signup/SigupScreen';
import { Colors } from './src/shared/Colors';
import { useContext, useEffect, useState } from 'react';
import AuthProvider, { AuthContext } from './src/user_modules/authentication/AuthContext';
import IconButton from "./src/shared/components/IconButton";
import { NavigationContainer } from '@react-navigation/native';
import TokenManager from './src/user_modules/authentication/TokenManager';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import HomePage from './src/user_modules/HomePage';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { accessToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {accessToken ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingToLogin, setIsTryingToLogin] = useState(true);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await TokenManager.getTokenAsync();
        if (token) {
          const user = await TokenManager.getUserAsync();
          login(token, user)
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsTryingToLogin(false);
      }
    }
    prepare();
  }, []);

  if(isTryingToLogin)
    return <AppLoading />
  
  return <Navigation />
}



export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}
