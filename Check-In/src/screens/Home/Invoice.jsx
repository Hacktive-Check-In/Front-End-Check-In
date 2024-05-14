import { useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { formatCurrency, formatDate, formatTime } from "../../../helpers/helper";

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
      imgUrl: "https://klasika.kompas.id/wp-content/uploads/2017/07/2707-Klasiloka-KFC_FEAT.jpg",
    },
  },
];

const renderInvoiceCard = ({ item }) => (
  <View className="min-w-max bg-white h-44 flex-row rounded-xl justify-start mt-4">
    <Image source={{ uri: item.Restaurant.imgUrl }} style={{ width: "40%", height: "100%" }} className="rounded-l-xl" />
    <View className="px-5 py-2 ">
      <Text className="text-lg font-semibold">{item.Restaurant.name}</Text>
      <Text className="pt-2 text-sm">{item.Restaurant.location}</Text>
      <Text className="pt-2 text-sm">Reservation Date: </Text>
      <Text className="pt-0.5 text-sm">{formatDate(item.reservationDate)}</Text>
      <Text className="pt-0.5 text-sm">{formatTime(item.reservationDate)}</Text>
      <Text className="pt-2 text-sm">Total Price : {formatCurrency(item.totalPrice)}</Text>
    </View>
  </View>
);

const InvoiceScreen = () => {
  return (
    <View className=" flex flex-col items-center w-full h-full">
      <FlatList
        data={dummy}
        renderItem={renderInvoiceCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 300 }}
      />
    </View>
  );
};

export default InvoiceScreen;
