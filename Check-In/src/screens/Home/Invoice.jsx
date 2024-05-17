import { useEffect, useState } from "react";
import { Text, View, Image, FlatList, ScrollView } from "react-native";
import {
  formatCurrency,
  formatDate,
  formatTime,
} from "../../../helpers/helper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const dummy = [
  {
    id: 2,
    UserId: 1,
    RestaurantId: 1,
    reservationDate: "2024-05-16T11:48:57.622Z",
    totalPrice: 350000,
    status: "success",
    createdAt: "2024-05-14T07:41:37.084Z",
    updatedAt: "2024-05-14T07:42:45.286Z",
    Restaurant: {
      name: "KFC Jakarta Central",
      location: "Jakarta, Indonesia",
      description: "KFC Jakarta bietet eine umfassende Speisekarte.",
      rating: 4.5,
      imgUrl:
        "https://klasika.kompas.id/wp-content/uploads/2017/07/2707-Klasiloka-KFC_FEAT.jpg",
    },
  },
];

// Ini file untuk conditional kalau tidak ada items
{
  /* <View className="flex align-middle items-center justify-center">
<Text className="text-center font-bold text-2xl">
  Consider Buying Something?
</Text>
</View> */
}

const renderInvoiceCard = ({ item }) => (
  <ScrollView className="p-5">
    <View>
      <Text className="text-center font-bold text-xl">
        Check Invoice Histories
      </Text>
    </View>
    <View className="bg-white w-full h-44 flex-row rounded-xl mt-4 justify-center shadow-2xl">
      <View className="w-2/5 h-full">
        <Image
          source={{ uri: item.Restaurant.imgUrl }}
          style={{ width: "full", height: "100%" }}
          className="rounded-l-xl"
        />
      </View>
      <View className="px-5 py-2 w-3/5 border-l-2 border-gray-100">
        <Text className="text-lg font-semibold">{item.Restaurant.name}</Text>
        <Text className="pt-2 text-sm">{item.Restaurant.location}</Text>
        <Text className="pt-2 text-sm">Reservation Date: </Text>
        <Text className="pt-0.5 text-sm">
          {formatDate(item.reservationDate)}
        </Text>
        <Text className="pt-0.5 text-sm">
          {formatTime(item.reservationDate)}
        </Text>
        <Text className="pt-2 text-sm">
          Total Price : {formatCurrency(item.totalPrice)}
        </Text>
      </View>
    </View>
  </ScrollView>
);

const InvoiceScreen = () => {
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/transaction`,
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        }
      );
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <View className=" flex flex-col items-center w-full h-full">
      {invoices[0] ? (
        <FlatList
          data={invoices}
          renderItem={renderInvoiceCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 260 }}
        />
      ) : (
        <View className="flex items-center justify-center h-full">
          <Text className="font-semibold text-xl">No invoices found!</Text>
          <Text className="font-semibold text-xl">
            Start ordering with us Today!
          </Text>
        </View>
      )}
    </View>
  );
};

export default InvoiceScreen;
