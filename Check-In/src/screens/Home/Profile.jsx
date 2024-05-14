import { Image, Pressable, Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-center justify- h-full w-full">
      <View className="h-full w-full justify-center items-center">
        <View className="h-[75%] w-[80%] rounded-3xl border-2 border-[#78c4a4] pt-2">
          <View className="h-1/4 rounded-3xl justify-center items-center">
            <Image
              className="h-[90%] w-[40%] rounded-full"
              source={{
                uri: "https://loremflickr.com/400/400/avatar",
              }}
            />
          </View>
          <View className="h-3/4 rounded-3xl px-2 py-4 justify-between">
            <View>
              <View className="w-full ">
                <Text className="text-4xl text-center font-bold">
                  Donald Trump
                </Text>
              </View>
              <View className="gap-3 w-full px-5 pt-10">
                <View className="gap-y-1">
                  <Text className="text-base font-medium">
                    Registered Email:
                  </Text>
                  <Text className="text-base">donaldtrump@yahoo.com</Text>
                </View>
                <View className="gap-y-1">
                  <Text className="text-base font-medium">
                    Registered Number:
                  </Text>
                  <Text className="text-base">081234567890</Text>
                </View>
              </View>
            </View>

            <View className="w-full justify-center align-middle text-center">
              <Pressable className="mx-24 mt-0.5">
                <Text className="text-center bg-[#78c4a4] text-xl rounded-full py-3">
                  Log Out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
