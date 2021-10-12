import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from "../views/SignIn";

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign In" component={SignIn}/>
    </AuthStack.Navigator>
  );
}

