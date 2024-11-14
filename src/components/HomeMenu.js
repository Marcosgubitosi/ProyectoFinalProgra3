import { StyleSheet, Text, View } from 'react-native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


function HomeMenu() {
  return (
      <Tab.Navigator >
        
          <Tab.Screen 
            options={ { headerShown: false }}
            name="Home" 
            component={Home}
          />
          <Tab.Screen 
            options={ { headerShown: false }}
            name="NewPost" 
            component={NewPost}
          />
          <Tab.Screen  
            options={ { headerShown: false }}
            name="Profile" 
            component={Profile} 
          />
        
      </Tab.Navigator>
    
  );
}

export default HomeMenu;