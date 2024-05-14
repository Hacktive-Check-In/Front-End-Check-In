import { useState } from "react";
import { Text, View, Image, TextInput } from "react-native";
import { Fontisto } from "@expo/vector-icons";
const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <View className="flex-col items-center pt-7">
      <Image source={require("../../../public/banner.png")} className="w-4/5 h-32 rounded-2xl mb-5" />
      <View className=" w-4/5 bg-white flex-row flex it rounded-xl justify-center items-center">
        <Fontisto name="search" size={20} color="black" />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          className=" bg-white text-left w-4/5 rounded-xl px-2 py-2"
        />
      </View>
      <Text className="mt-5 text-left w-5/6 pl-2 text-lg font-semibold">Popular Restaurant</Text>
    </View>
  );
};

export default HomeScreen;
