import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function RestaurantDetails({ navigation, route }) {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState({});

  const getRestaurantbyId = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        }
      );
      setRestaurant(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantbyId();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeContainer} className="px-5">
          <View style={styles.topContainer} className=" w-full mb-5 ">
            <View className="h-4/5 bg-[#f0ece8] rounded-2xl my-1">
              <Image
                className="h-full w-full rounded-2xl"
                source={{
                  uri: `${restaurant.imgUrl}`,
                }}
              />
            </View>
            <View className="h-1/5 my-1 bg-[#f0ece8] rounded-2xl flex flex-row justify-around ">
              <View className="flex justify-center w-1/2 border-r-2 border-stone-300 mt-2.5 max-h-12">
                <Text className="text-2xl font-normal text-center">
                  15 Mins
                </Text>
                <Text className="text-lg font-normal text-center text-gray-500">
                  Delivery
                </Text>
              </View>
              <View className="flex justify-center   w-1/2 mt-2.5 max-h-12">
                <Text className="text-2xl font-normal text-center">
                  ⭐ {restaurant?.rating?.toFixed(2)}
                </Text>
                <Text className="text-lg font-normal text-center text-gray-500">
                  Rating
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.midContainer} className=" h-1/4 w-full">
            <View className="py-4">
              <Text className="text-5xl font-semibold">{restaurant.name}</Text>
            </View>
            <View className="gap-0.5">
              <Text className="text-base">{restaurant.address}</Text>
              <Text className="text-base">Tel: 14022</Text>
            </View>
            <Text className="text-lg mt-1">Restaurant Information</Text>
          </View>
          <View
            style={styles.botContainer}
            className="h-1/4 w-full flex justify-between"
          >
            <View className="h-5/6 flex align-middle">
              <ScrollView>
                <Text className="tracking-widest">
                  {restaurant.description}
                </Text>
              </ScrollView>
            </View>
            <View className="w-full justify-center align-middle text-center">
              <Pressable
                className="mx-24 mt-0.5"
                onPress={() => {
                  navigation.navigate("ItemDetails", {
                    restaurantId: restaurant.id,
                  });
                }}
              >
                <Text className="text-center bg-[#78c4a4] text-xl rounded-full py-3">
                  Food Lists
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    display: "flex",
    backgroundColor: "#faf7f5",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    height: "45%",
  },
});
