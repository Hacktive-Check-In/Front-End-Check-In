import React, { useCallback, useState } from "react";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { formatCurrency } from "../../../helpers/helper";
import Counter from "react-native-counters";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DatePickerModal, TimePickerModal, en, registerTranslation } from "react-native-paper-dates";
import { Button } from "react-native-paper";

registerTranslation("en", en);

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
  <View className="container w-full bg-white h-52 flex-row rounded-xl justify-start mb-4 shadow-2xl">
    <Image source={{ uri: item.imgUrl }} style={{ width: "40%", height: "100%" }} className="rounded-l-xl" />
    <View className="pl-5 py-2 flex flex-col justify-between w-3/5 pr-2">
      <View className="gap-1">
        <Text className="text-lg w-full font-semibold ">{item.name}</Text>
        <Text className="text-sm w-full text-gray-600">{item.description}</Text>
      </View>
      <Text className="text-sm">{formatCurrency(item.price)}</Text>
      <View className="flex flex-row justify-end">
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
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const onDismissDate = useCallback(() => {
    setOpenDate(false);
  }, [setOpenDate]);

  const onConfirmDate = useCallback(
    (params) => {
      setOpenDate(false);
      setDate(params.date);
    },
    [setOpenDate, setDate]
  );

  const onDismissTime = useCallback(() => {
    setOpenTime(false);
  }, [setOpenTime]);

  const onConfirmTime = useCallback(
    ({ hours, minutes }) => {
      setOpenTime(false);
      setTime(`${hours}:${minutes}`);
    },
    [setOpenTime, setTime]
  );
  const ListFooter = () => (
    <View className="container min-w-full bg-white h-52 flex-col  rounded-xl justify-start shadow-black shadow-2xl p-3">
      <Text className="text-sm font-medium">Pick Appointment Time</Text>
      <Button onPress={() => setOpenDate(true)}>Pick Date</Button>
      <Button onPress={() => setOpenTime(true)}>Pick Time</Button>
      {date && <Text>Selected Date: {date.toDateString()}</Text>}
      {time && <Text>Selected Time: {time}</Text>}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer} className="px-5 ">
        <View className="w-full py-4">
          <Text className="text-2xl font-semibold">Our Menu Lists</Text>
        </View>
        <FlatList
          data={Test}
          renderItem={renderProfileItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            alignItems: "center",
          }}
          ListFooterComponent={<ListFooter />}
        />
        <DatePickerModal locale="en" mode="single" visible={openDate} onDismiss={onDismissDate} date={date} onConfirm={onConfirmDate} />
        <TimePickerModal
          visible={openTime}
          onDismiss={onDismissTime}
          onConfirm={onConfirmTime}
          hours={new Date().getHours()}
          minutes={new Date().getMinutes()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#78c4a4",
  },
});

export default ItemScreen;
