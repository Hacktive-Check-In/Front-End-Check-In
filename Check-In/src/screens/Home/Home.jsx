import { useState } from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";

const Test = [
  {
    id: 1,
    name: "KFC Jakarta Central",
    location: "Jakarta, Indonesia",
    description: "KFC Jakarta bietet eine umfassende Speisekarte.",
    rating: 4.5,
    imgUrl: "https://klasika.kompas.id/wp-content/uploads/2017/07/2707-Klasiloka-KFC_FEAT.jpg",
  },
  {
    id: 2,
    name: "Pizza Hut Bekasi",
    location: "Bekasi, Indonesia",
    description: "Pizza Hut provides excellent service, when you come here you will be satisfied",
    rating: 4.2,
    imgUrl: "https://images.bisnis.com/posts/2023/01/03/1614712/pzza-sarimelati-1.jpg",
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
    imgUrl: "https://images.bisnis.com/posts/2020/11/03/1313185/burger-king.jpg",
  },
  {
    id: 5,
    name: "Starbucks Jakarta",
    location: "Jakarta, Indonesia",
    description: "Jetzt sind die Preise bei Starbucks günstiger, es ist sicher, Kaffee zu genießen.",
    rating: 4.4,
    imgUrl: "https://asumsi.co/wp-content/uploads/1644398291857_starbucksge35acbd7b1920.jpg",
  },
];

const renderProfileItem = ({ item }) => (
  <View className="w-4/5 bg-white h-44 flex-row rounded-xl justify-start mb-4">
    <Image source={{ uri: item.imgUrl }} style={{ width: "40%", height: "100%" }} className="rounded-l-xl" />
    <View className="pl-5 pt-5">
      <Text className="text-lg w-full">{item.name}</Text>
      <Text className="pt-2 text-sm">{item.location}</Text>
      <View className="flex-row justify-end pt-8 w-52 pr-3">
        <View className="bg-green-300 w-14 aspect-square rounded-full mr-2 flex items-center justify-center">
          <FontAwesome6 name="heart" size={24} color="white" />
        </View>
        <View className="bg-green-600 w-14 aspect-square rounded-full flex items-center justify-center">
          <SimpleLineIcons name="notebook" size={24} color="white" />
        </View>
      </View>
    </View>
  </View>
);

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="flex-col items-center pt-7">
      <Image source={require("../../../public/banner.png")} className="w-4/5 h-40 rounded-2xl mb-5" />
      <View className="w-4/5 bg-white flex-row rounded-xl justify-center items-center">
        <Fontisto name="search" size={20} color="black" />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          className="bg-white text-left w-4/5 rounded-xl px-2 py-2"
        />
      </View>
      <Text className="my-5 text-left w-5/6 pl-2 text-xl font-semibold">Our Restaurant</Text>
      <FlatList
        data={Test}
        renderItem={renderProfileItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 300 }}
      />
    </View>
  );
};

export default HomeScreen;
