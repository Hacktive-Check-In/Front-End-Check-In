import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { Text, View } from "react-native";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { NativeWindStyleSheet } from "nativewind";
import HomeScreen from "./src/screens/Home/Home";
import HomeTabs from "./src/screens/HomeTab";
import InvoiceResponse from "./src/screens/Home/InvoiceResponse";
import MidtransWebView from "./src/screens/Home/MidtransWebview";
import RestaurantDetails from "./src/screens/Restaurants/RestaurantDetails";
import InvoiceDetailScreen from "./src/screens/Invoice Detail/InvoiceDetail";
import ItemScreen from "./src/screens/Restaurants/ItemDetails";
import { PaperProvider } from "react-native-paper";
import { PaperDateProvider } from "react-native-paper-dates";

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
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandingPage"
            component={LandingScreen}
            options={({ route }) => ({
              title: "Landing",
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={({ route }) => ({
              title: "Landing",
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={({ route }) => ({
              title: "Landing",
              headerShown: false,
            })}
          />
          {/* <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="InvoiceResponse" component={InvoiceResponse} options={{ headerShown: false }} />
            <Stack.Screen name="Restaurant Details" component={RestaurantDetails} options={{ headerShown: true }} />
            <Stack.Screen name="Midtrans" component={MidtransWebView} options={{ headerShown: false }} />
            <Stack.Screen name="Invoice Details" component={InvoiceDetailScreen} options={{ headerShown: true }} /> */}
          <Stack.Screen name="Item Details" component={ItemScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

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
