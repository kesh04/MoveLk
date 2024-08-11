import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Screen/Login';
import Detail from './src/Screen/Detail';
import TabNavigation from './src/custom/TabNavigation';
import Logout from './src/page/Logout';
import Map from './src/map/Map';
import Splash from './src/Screen/Splash';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator > 
      {/* <Stack.Screen name="Splash" component={Splash}  options={{ headerShown: false }} /> */}

        {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Detail" component={Detail} /> */}
        <Stack.Screen options={{ headerShown: false }} name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Map" component={Map} options={{ headerTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
