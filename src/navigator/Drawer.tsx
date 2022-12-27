import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Screens/Dashboard";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import { useAppSelector } from "../core/redux/hooks";
import { selectAuth } from "../core/redux/auth/authSlice";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  // const { auth } = React.useContext(AuthContext);
  const auth = useAppSelector(selectAuth);
  return auth.isAuth ? (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
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
