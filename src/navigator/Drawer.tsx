import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Screens/Dashboard";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import { useAppDispatch, useAppSelector } from "../core/redux/hooks";
import { selectAuth } from "../core/redux/auth/authSlice";
import Settings from "../Screens/Settings";
import { getAsyncStorage } from "../utils/asyncStorage";
import { fetchUserThunk } from "../core/redux/auth/authThunks";

const Drawer = createDrawerNavigator();

function AppDrawer() {
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
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppDrawer;
