import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen({ navigation }) {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={`https://i.pinimg.com/736x/62/77/81/627781a8a65c992f5c58afeda235901c.jpg`}
            />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.mainText}>
              The best food, delivered right to your home.
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Pressable
              style={styles.startBookingContainer}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.startBookingText}>Start Booking</Text>
            </Pressable>
            <Pressable
              style={styles.signUpContainer}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.signUpText}>Sign Up Now</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#78c4a4",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 80,
  },
  imageContainer: {
    height: "45%",
  },
  image: {
    width: 100,
  },
  middleContainer: {
    height: "30%",
  },
  mainText: {
    color: "white",
    textAlign: "left",
    fontSize: 48,
  },
  bottomContainer: {
    height: "25%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  startBookingContainer: {
    backgroundColor: "#191817",
    paddingVertical: 20,
    paddingHorizontal: 130,
    borderRadius: 100,
  },
  startBookingText: {
    color: "white",
    fontSize: 18,
  },
  signUpContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontSize: 18,
  },
});
