import { StyleSheet, Text, View } from 'react-native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();


function HomeMenu() {
  return (
      <Tab.Navigator >
        
          <Tab.Screen 
            name="Home" 
            component={Home}
            options={{headerShown: false, tabBarIcon: () => <AntDesign name='home' size = {24} color="black" />}}
          />
          <Tab.Screen 
            name="NewPost" 
            component={NewPost}
            options={{headerShown: false, tabBarIcon: () => <AntDesign name='plussquareo' size = {24} color="black" />}}
          />
          <Tab.Screen  
            name="Profile" 
            component={Profile} 
            options={{headerShown: false, tabBarIcon: () => <AntDesign name='user' size = {24} color="black" />}}
          />
        
      </Tab.Navigator>
    
  );
}

export default HomeMenu;