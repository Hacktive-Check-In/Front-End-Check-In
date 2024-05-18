import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, FlatList, StyleSheet, Pressable } from "react-native";
import { formatCurrency, updateDateWithNewTime } from "../../../helpers/helper";
import Counter from "react-native-counters";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DatePickerModal, TimePickerModal, en, registerTranslation } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

registerTranslation("en", en);

const ItemScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(50000);

  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState({});

  const onChange = (number, type, itemId, price) => {
    setItems((prevItems) => {
      let updatedItems;
      if (number === 0) {
        // If the quantity becomes zero, filter out the item from the items array
        updatedItems = prevItems.filter((item) => item.ItemId !== itemId);
      } else {
        // Otherwise, update the quantity and subtotal of the item
        const existingItemIndex = prevItems.findIndex((item) => item.ItemId === itemId);
        if (existingItemIndex >= 0) {
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            qty: number,
            subTotal: number * price,
          };
        } else {
          updatedItems = [...prevItems, { ItemId: itemId, qty: number, subTotal: number * price }];
        }
      }
      setTotalPrice(updatedItems.reduce((sum, item) => sum + item.subTotal, 50000));
      return updatedItems;
    });
  };

  console.log(items);
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
            onChange={(number, type) => onChange(number, type, item.id, item.price)}
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

  const onDismissTime = useCallback(() => {
    setOpenTime(false);
  }, [setOpenTime]);

  const onConfirmTime = useCallback(
    ({ hours, minutes }) => {
      setOpenTime(false);
      const date = new Date();
      const newTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      setTime(newTime);
      setReservationDate(updateDateWithNewTime(date, newTime));
    },
    [setOpenTime, setTime]
  );

  const getRestaurantbyId = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}` + `/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
        },
      });
      setRestaurant(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const postReservation = async () => {
    const body = {
      reservationDate: reservationDate,
      totalPrice,
      RestaurantId: restaurantId,
      items: items.map((item) => ({ ItemId: item.ItemId, qty: item.qty, subTotal: item.subTotal })),
    };

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/transaction`, body, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`,
        },
      });
      console.log("Reservation successful:", response.data.redirect_url);
      navigation.navigate("Midtrans", {
        url: response.data.redirect_url,
      });
      // Navigate to confirmation screen or handle success
    } catch (error) {
      console.log("Error making reservation:", error);
    }
  };

  useEffect(() => {
    getRestaurantbyId();
  }, []);

  const ListFooter = () => (
    <View className="container min-w-full bg-white h-full flex-col  rounded-xl justify-start shadow-black shadow-2xl p-3 mb-10 gap-y-3">
      <Text className="text-sm font-medium">Pick Appointment Time</Text>
      <Button onPress={() => setOpenTime(true)} className="w-32 bg-[#78c4a4]">
        Pick Time
      </Button>
      {time && <Text>Selected Time: {time}</Text>}
      <Text className="text-sm font-medium">Subtotal</Text>
      <Text>Total: {formatCurrency(totalPrice)}</Text>
      <View className="w-full flex flex-row justify-center align-center text-center">
        <Pressable onPress={postReservation}>
          <Text className="text-center bg-[#78c4a4] text-xl rounded-full py-3 min-w-full font-semibold">Confirm</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer} className="px-5 ">
        <View className="w-full py-4">
          <Text className="text-2xl font-semibold">Our Menu Lists</Text>
        </View>
        <FlatList
          data={restaurant.Items}
          renderItem={renderProfileItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            alignItems: "center",
          }}
          ListFooterComponent={<ListFooter />}
        />
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
  },
});

export default ItemScreen;
