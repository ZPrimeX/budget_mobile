import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../Screens/Dashboard";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import { AuthContext } from "../context/AuthProvider";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  const { auth } = React.useContext(AuthContext);
  return auth ? (
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
