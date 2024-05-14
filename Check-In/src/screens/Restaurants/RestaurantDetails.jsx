import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDetails({ navigation }) {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeContainer} className="px-5">
          <View style={styles.topContainer} className=" h-1/2 w-full pt-4">
            <View className="h-4/5 bg-[#f0ece8] rounded-2xl my-1">
              <Image className="bg-red-400" />
            </View>
            <View className="h-1/5 my-1 bg-[#f0ece8] rounded-2xl flex flex-row justify-around ">
              <View className="flex justify-center gap-1 w-1/2 border-r-2 border-stone-300">
                <Text className="text-2xl font-normal text-center">
                  15 Mins
                </Text>
                <Text className="text-lg font-normal text-center text-gray-500">
                  Delivery
                </Text>
              </View>
              <View className="flex justify-center gap-1  w-1/2">
                <Text className="text-2xl font-normal text-center">⭐4.5</Text>
                <Text className="text-lg font-normal text-center text-gray-500">
                  Rating
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.midContainer} className=" h-1/4 w-full"></View>
          <View
            style={styles.botContainer}
            className="bg-green-200 h-1/4 w-full"
          ></View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#faf7f5",
    alignItems: "center",
    justifyContent: "center",
  },
});
