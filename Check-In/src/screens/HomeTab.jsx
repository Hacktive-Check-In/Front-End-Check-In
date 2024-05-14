import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/Home";
import { FontAwesome, Foundation, MaterialIcons } from "@expo/vector-icons";
import FavoriteScreen from "./Home/Favorite";
import InvoiceScreen from "./Home/Invoice";
import ProfileScreen from "./Home/Profile";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 40,
          backgroundColor: "black",
          height: 70,
          paddingHorizontal: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size, focused }) => <Foundation name="home" size={24} color={focused ? "white" : "grey"} /> }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="favorite" size={24} color={focused ? "white" : "grey"} /> }}
      />
      <Tab.Screen
        name="Invoice List"
        component={InvoiceScreen}
        options={{ tabBarIcon: ({ color, size, focused }) => <FontAwesome name="list" size={24} color={focused ? "white" : "grey"} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size, focused }) => <FontAwesome name="user-circle" size={24} color={focused ? "white" : "grey"} /> }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
