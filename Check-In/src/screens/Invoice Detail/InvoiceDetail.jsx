import { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import {
  calculateTotalSubTotal,
  formatCurrency,
  formatDate,
  formatTime,
} from "../../../helpers/helper";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const dummy = {
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
  User: {
    name: "user1",
    phoneNumber: "087654321",
  },
  TransactionDetails: [
    {
      qty: 2,
      subTotal: 100000,
      Item: {
        name: "Original Recipe Chicken",
        description:
          "Das leckerste und meistverkaufte Hühnchen in den Restaurants.",
        price: 50000,
      },
    },
    {
      qty: 2,
      subTotal: 200000,
      Item: {
        name: "Crispy Chicken Burger",
        description: "A crispy chicken burger with fresh toppings.",
        price: 100000,
      },
    },
  ],
};

const InvoiceDetailScreen = ({ route }) => {
  const { invoiceId } = route.params;
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  const getInvoiceById = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/transaction/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        }
      );
      setInvoice(response.data);
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

  return (
    <>
      <View className=" flex flex-col items-center justify-center w-full h-full">
        <View
          className="bg-white flex-row rounded-xl justify-start shadow-2xl shadow-black z-0"
          style={{ width: "90%", height: "95%" }}
        >
          <View className="flex w-full items-center content-center">
            <Text className="text-3xl py-8 font-semibold">Invoice Receipt</Text>
            <QRCode value="http://awesome.link.qr" size={200} />
            <Text className="text-sm pt-8">
              Please scan your QR code on the
            </Text>
            <Text className="text-sm">Scanner machine in Restaurant</Text>
            <Text className="text-xl py-6 text-gray-300">
              -----------------------------------------------------------------------
            </Text>
            <View className="flex w-full flex-col items-center content-center space-y-10 pt-2 ">
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Name</Text>
                  <Text className="font-semibold">Restaurant</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">
                    {invoice?.User?.name}
                  </Text>
                  <Text className="font-semibold">
                    {invoice?.Restaurant?.name}
                  </Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Date</Text>
                  <Text className="font-semibold">Time</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">
                    {formatDate(invoice?.reservationDate)}
                  </Text>
                  <Text className="font-semibold">
                    {formatTime(invoice?.reservationDate)}
                  </Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Book Fee</Text>
                  <Text className="font-semibold">Total Item</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">
                    {formatCurrency(50000)}
                  </Text>
                  <Text className="font-semibold">
                    {calculateTotalSubTotal(invoice?.TransactionDetails)}
                  </Text>
                </View>
              </View>
              <View className="flex w-full items-center content-center space-y-1">
                <View className="flex flex-row justify-start w-full px-10">
                  <Text className="font-semibold w-44">Total Price</Text>
                </View>
                <View className="flex flex-row w-full px-10">
                  <Text className="font-semibold w-44">
                    {formatCurrency(invoice?.totalPrice)}
                  </Text>
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
