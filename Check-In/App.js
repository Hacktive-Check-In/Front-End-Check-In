import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { Text, View } from "react-native";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { NativeWindStyleSheet } from "nativewind";

const Stack = createNativeStackNavigator();

export default function App() {

  /** Ini function untuk check apakah sudah login apa belum */

  // const [isSignedIn, setIsSignedIn] = useState(false)

  // useEffect(() => {
  //   SecureStore.getItemAsync("access_token")
  //     .then(result => {
  //       if (result) {
  //         setIsSignedIn(true)
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [])

  /** End of check function*/

  return (
    // <View style={styles.container}>
    // <View className="flex-1 justify-center items-center bg-white">

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingScreen}
          options={({ route }) => ({
            title: "Landing",
            headerShown: false
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ route }) => ({
            title: "Landing",
            headerShown: false
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ route }) => ({
            title: "Landing",
            headerShown: false
          })}
        />

      </Stack.Navigator>

    </NavigationContainer>


    // {/* <StatusBar style="auto" /> */ }
    // {/* </View> */ }
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

NativeWindStyleSheet.setOutput({
  default: "native",
});
