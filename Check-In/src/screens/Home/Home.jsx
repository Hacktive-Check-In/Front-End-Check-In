import { useEffect, useState, useCallback } from "react";
import { Text, View, Image, TextInput, FlatList, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import debounce from "lodash/debounce";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async (searchQuery) => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/restaurants?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
        },
      });
      setRestaurants(response.data);
      console.log(restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants("");
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      getRestaurants(query);
    }, 500),
    []
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const renderProfileItem = ({ item }) => {
    return (
      <View className="w-full h-44 flex-row rounded-xl my-2">
        <Image source={{ uri: item.imgUrl }} style={{ width: "40%", height: "100%" }} className="rounded-l-xl" />
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-col items-center py-7 px-5 w-full">
        <Image source={require("../../../public/banner.png")} className="w-full h-40 rounded-2xl mb-5" />
        <View className="bg-white flex-row rounded-xl justify-center items-center w-full">
          <Fontisto name="search" size={22} color="black" />
          <TextInput
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearchChange}
            className="bg-white text-left w-[90%] rounded-xl p-2.5"
          />
        </View>
        <Text className="mt-5 mb-2 text-left w-full pl-3 text-xl font-semibold">Our Restaurants</Text>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProfileItem}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 260 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
