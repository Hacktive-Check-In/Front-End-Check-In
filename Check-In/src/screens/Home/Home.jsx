import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Test = [
  {
    id: 1,
    name: "KFC Jakarta Central",
    location: "Jakarta, Indonesia",
    description: "KFC Jakarta bietet eine umfassende Speisekarte.",
    rating: 4.5,
    imgUrl:
      "https://klasika.kompas.id/wp-content/uploads/2017/07/2707-Klasiloka-KFC_FEAT.jpg",
  },
  {
    id: 2,
    name: "Pizza Hut Bekasi",
    location: "Bekasi, Indonesia",
    description:
      "Pizza Hut provides excellent service, when you come here you will be satisfied",
    rating: 4.2,
    imgUrl:
      "https://images.bisnis.com/posts/2023/01/03/1614712/pzza-sarimelati-1.jpg",
  },
  {
    id: 3,
    name: "McDonald's Bogor",
    location: "Bogor, Indonesia",
    description: "In this place you will be served well and special",
    rating: 4.3,
    imgUrl: "https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/bg/img_visi.jpg",
  },
  {
    id: 4,
    name: "Burger King Bandung",
    location: "Bandung, Indonesia",
    description: "Wenn Sie hierher kommen, erhalten Sie viele Rabatte.",
    rating: 4.1,
    imgUrl:
      "https://images.bisnis.com/posts/2020/11/03/1313185/burger-king.jpg",
  },
  {
    id: 5,
    name: "Starbucks Jakarta",
    location: "Jakarta, Indonesia",
    description:
      "Jetzt sind die Preise bei Starbucks günstiger, es ist sicher, Kaffee zu genießen.",
    rating: 4.4,
    imgUrl:
      "https://asumsi.co/wp-content/uploads/1644398291857_starbucksge35acbd7b1920.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/restaurants`,
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        }
      );
      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const renderProfileItem = ({ item }) => {
    return (
      <View className="w-full  h-44 flex-row rounded-xl my-2">
        <Image
          source={{ uri: item.imgUrl }}
          style={{ width: "40%", height: "100%" }}
          className="rounded-l-xl"
        />
        <View className="p-5 w-3/5 bg-white rounded-r-xl justify-between">
          <View>
            <Text className="text-lg w-full">{item.name}</Text>
            <Text className="pt-2 text-sm">{item.address}</Text>
          </View>
          <View className="flex-row justify-end">
            <View className="bg-green-300 w-14 aspect-square rounded-full mr-2 flex items-center justify-center">
              <FontAwesome6 name="heart" size={24} color="white" />
            </View>
            <Pressable
              className="bg-green-600 w-14 aspect-square rounded-full flex items-center justify-center"
              onPress={() => {
                navigation.navigate("RestaurantDetails", {
                  restaurantId: item.id,
                });
              }}
            >
              <SimpleLineIcons name="notebook" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-col items-center py-7 px-5 w-full">
      <Image
        source={require("../../../public/banner.png")}
        className="w-full h-40 rounded-2xl mb-5"
      />

      <View className="bg-white flex-row rounded-xl justify-center items-center w-full">
        <Fontisto name="search" size={22} color="black" />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          className="bg-white text-left w-[90%] rounded-xl p-2.5"
        />
      </View>
      <Text className="mt-5 mb-2 text-left w-full pl-3 text-xl font-semibold">
        Our Restaurants
      </Text>
      <FlatList
        data={restaurants}
        key={restaurants.id}
        renderItem={renderProfileItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 260 }}
      />
    </View>
  );
};

export default HomeScreen;
