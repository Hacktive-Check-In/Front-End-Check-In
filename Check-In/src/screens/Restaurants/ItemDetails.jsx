import { useState } from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { formatCurrency } from "../../../helpers/helper";
import Counter from "react-native-counters";

const Test = [
  {
    id: 1,
    RestaurantId: 1,
    name: "MIE GORENG",
    description: "Fried Egg Noodles, Prawn, Beef Ball,Chicken Sate",
    price: 125000,
    imgUrl: "https://asset.kompas.com/crops/032NyNKaO9X61kL1ZpU9AS4khrU=/52x28:954x629/750x500/data/photo/2020/11/19/5fb641f087a66.jpg",
  },
  {
    id: 2,
    RestaurantId: 1,
    name: "KING PRAWNS",
    description: "Spicy Sour Keung Sauce, Lingueine,Roasted Cherry Tomatoes",
    price: 398000,
    imgUrl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawns-88d2952.jpg",
  },
  {
    id: 3,
    RestaurantId: 1,
    name: "ASAM PADEH BOWL",
    description: "Prawns,Scallops,Garouper, Baby Octopus,Tamarind Chili Lime Leaf",
    price: 198000,
    imgUrl: "https://img-global.cpcdn.com/recipes/0cb7219daddbeeda/680x482cq70/asam-padeh-gajeboh-foto-resep-utama.jpg",
  },
  {
    id: 4,
    RestaurantId: 1,
    name: "CHARRED AUSTRALIAN WAGYU TENDERLOIN",
    description: "Beef Tenderloin,Pelawan Mushroom Sauce,Lobi Lobi Glaze, Mashed Potato",
    price: 780000,
    imgUrl: "https://i0.wp.com/yummylummy.com/wp-content/uploads/2018/12/Gary_Lum_Australian-Wagyu-beef-013.jpg?fit=2048%2C1638&ssl=1",
  },
  {
    id: 5,
    RestaurantId: 1,
    name: "BUMBU RUJAK BARBECUED GAROUPER",
    description: "Sustainbly Farmed Garouper Fillet",
    price: 280000,
    imgUrl: "https://img-global.cpcdn.com/recipes/e37993496d46f45c/680x482cq70/sosis-bumbu-rujak-foto-resep-utama.jpg",
  },
];

const onChange = (number, type) => {
  console.log(number, type); // 1, + or -
};

const renderProfileItem = ({ item }) => (
  <View className="container w-96 bg-white h-44 flex-row rounded-xl justify-start mb-4 shadow-2xl">
    <Image source={{ uri: item.imgUrl }} style={{ width: "40%", height: "100%" }} className="rounded-l-xl" />
    <View className="pl-5 py-2 flex flex-col justify-between">
      <View>
        <Text className="text-lg w-full">{item.name}</Text>
        <Text className="text-sm w-full">{item.description}</Text>
      </View>
      <Text className="text-sm">{formatCurrency(item.price)}</Text>
      <View className="flex flex-row pl-20">
        <Counter
          start={0}
          onChange={onChange}
          buttonStyle={{
            borderColor: "#333",
            borderWidth: 2,
            borderRadius: 25,
          }}
          buttonTextStyle={{
            color: "#333",
          }}
          countTextStyle={{
            color: "#333",
          }}
        />
      </View>
    </View>
  </View>
);

const ItemScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="flex-col items-center">
      <Text className="my-5 text-left w-5/6 pl-2 text-xl font-semibold">Our Item List</Text>
      <FlatList
        data={Test}
        renderItem={renderProfileItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}
      />
    </View>
  );
};

export default ItemScreen;
