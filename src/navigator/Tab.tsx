import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { selectAuth } from "../core/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { getAsyncStorage } from "../utils/asyncStorage";
import { fetchUserThunk } from "../core/redux/auth/authThunks";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Screens/Dashboard";
import Profile from "../Screens/Profile";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";
import Settings from "../Screens/Settings";
import Wallets from "../Screens/Wallets";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Categories from "../Screens/Categories";
import Transactions from "../Screens/Transactions";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTab() {
  // const { auth } = React.useContext(AuthContext);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const checkAuth = async () => {
    const token = await getAsyncStorage("token");
    if (token && auth.isAuth === false) {
      dispatch(fetchUserThunk());
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return auth.isAuth ? (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="Wallets"
          component={Wallets}
          options={{
            headerRight: () => <Button onPress={() => alert("Create a wallet")} title="+" color="#00cc00" />,
          }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerRight: () => <Button onPress={() => alert("Create a wallet")} title="+" color="#00cc00" />,
          }}
        />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Signup" component={Signup} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppTab;
