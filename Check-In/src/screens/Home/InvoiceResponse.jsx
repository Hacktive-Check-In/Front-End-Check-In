import { Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const InvoiceResponse = () => {
  return (
    <View className="flex flex-col items-center justify-center h-full space-y-8">
      <Image source={require("../../../public/success.png")} className="w-52 h-52" />
      <Text className="text-3xl font-bold">Order Succesfully</Text>
      <View className="flex flex-col items-center justify-center space-y-1">
        <Text className="text-lg text-gray-500">Your order #33-45E has been booked.</Text>
        <Text className="text-lg  text-gray-500">Thanks for being our valid customer</Text>
      </View>

      <View className="bg-[#78c4a4] w-3/5 flex flex-row justify-center items-center py-4 rounded-3xl">
        <Text className="text-white text-xl">Continue</Text>
      </View>
    </View>
  );
};

export default InvoiceResponse;
