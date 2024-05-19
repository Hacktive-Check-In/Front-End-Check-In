import { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { calculateTotalSubTotal, formatCurrency, formatDate, formatTime } from "../../../helpers/helper";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const dummy = {
  Restaurant: {
    address: "Jakarta",
    description: "Restoran ini menawarkan pengalaman kuliner yang unik dengan menu yang inovatif dan cita rasa yang luar biasa.",
    imgUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/39/b2/74/pasola-restaurant-buffet.jpg?w=1200&h=-1&s=1",
    name: "PASOLA Restaurant",
    rating: 5,
  },
  RestaurantId: 1,
  TransactionDetails: [
    { Item: [Object], qty: 1, subTotal: 280000 },
    { Item: [Object], qty: 1, subTotal: 780000 },
  ],
  User: { name: "user1", phoneNumber: "087654321" },
  UserId: 1,
  createdAt: "2024-05-18T14:42:41.368Z",
  id: 6,
  reservationDate: "2024-05-18T16:30:00.000Z",
  status: "success",
  totalPrice: 1110000,
  updatedAt: "2024-05-18T14:43:48.532Z",
};

const InvoiceDetailScreen = ({ route }) => {
  const { invoiceId } = route.params;
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  const getInvoiceById = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}` + `/transaction/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
        },
      });
      setInvoice(response.data);
      console.log(invoice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoiceById();
  }, []);

  if (loading) {
    return (
      <View className="flex align-middle items-center justify-center h-full">
        <Text className="text-2xl font-black">Loading...</Text>
      </View>
    );
  }

  const qrCodeValue = `${invoice?.User?.name}\n${formatDate(invoice?.reservationDate)}\n${formatCurrency(invoice?.totalPrice)}\n${
    invoice?.Restaurant?.name
  }`;

  return (
    <>
      <View className=" flex flex-col items-center justify-center w-full h-full">
        <View className="bg-white flex-row rounded-xl justify-start shadow-2xl shadow-black z-0" style={{ width: "90%", height: "95%" }}>
          <View className="flex w-full items-center content-center">
            <Text className="text-3xl py-8 font-semibold">Invoice Receipt</Text>
            <QRCode value={qrCodeValue} size={200} />
            <Text className="text-sm pt-8">Please scan your QR code on the</Text>
            <Text className="text-sm">Scanner machine in Restaurant</Text>
            <Text className="text-xl py-6 text-gray-300">-----------------------------------------------------------------------</Text>
            <View className="flex w-full flex-col items-center content-center space-y-10 pt-2 ">
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Name</Text>
                  <Text className="font-semibold">Restaurant</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">{invoice?.User?.name}</Text>
                  <Text className="font-semibold">{invoice?.Restaurant?.name}</Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Date</Text>
                  <Text className="font-semibold">Time</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">{formatDate(invoice?.reservationDate)}</Text>
                  <Text className="font-semibold">{formatTime(invoice?.reservationDate)}</Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Book Fee</Text>
                  <Text className="font-semibold">Total Item</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">{formatCurrency(50000)}</Text>
                  <Text className="font-semibold">{calculateTotalSubTotal(invoice?.TransactionDetails)}</Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Total Price</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">{formatCurrency(invoice?.totalPrice)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default InvoiceDetailScreen;
