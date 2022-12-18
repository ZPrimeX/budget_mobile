import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Screens/Dashboard";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppDrawer;
