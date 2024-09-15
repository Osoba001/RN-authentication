import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './src/user_modules/SignIn/SignInScreen';
import SignupScreen from './src/user_modules/signup/SigupScreen';
import { Colors } from './src/shared/Colors';
import { useContext, useEffect, useState } from 'react';
import AuthProvider, { AuthContext } from './src/user_modules/authentication/AuthContext';
import ExpensesContextProvider, { ExpensesContext } from './src/expenseTracker/ExpenseContext';
import IconButton from "./src/shared/components/IconButton";
import { NavigationContainer } from '@react-navigation/native';
import TokenManager from './src/user_modules/authentication/TokenManager';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomePage from './src/user_modules/HomePage';
import { init } from './src/expenseTracker/ExpensesDb';
import AllExpenses from './src/expenseTracker/screens/AllExpenses';
import RecentExpenses from './src/expenseTracker/screens/RecentExpenses';
import ManageExpense from './src/expenseTracker/screens/ManageExpense';
import { ExpenseTrackerNavRoutes } from './src/expenseTracker/Constants';
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "White",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: Colors.accent500,
        initialRouteName: ExpenseTrackerNavRoutes.All_Expenses,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate(ExpenseTrackerNavRoutes.Manage_Expense);
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name={ExpenseTrackerNavRoutes.Recent_Expenses}
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={ExpenseTrackerNavRoutes.All_Expenses}
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};


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
    <ExpensesContextProvider> 
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
              name="ExpenseOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ExpenseTrackerNavRoutes.Manage_Expense}
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
    </Stack.Navigator>
    </ExpensesContextProvider>
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
          login(token, user);
        }
        await init();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsTryingToLogin(false);
      }
    }
    prepare();
  }, []);

  if (isTryingToLogin) {
    return <ActivityIndicator size="large" color={Colors.primary500} />;
  }

  return <Navigation />;
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
