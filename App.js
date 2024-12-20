import HomeMenu from "./src/components/HomeMenu";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={Register}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeMenu"
            component={HomeMenu}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
