import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.signInText}>Sign In</Text>
            <Text style={styles.signInDetail}>
              Welcome back! Sign In to continue reservations
            </Text>
            <Text style={styles.signInDetail}>
              at your favourite restaurant instantly
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={"lightgrey"}
              value={email}
              onChangeText={(inputEmail) => setEmail(inputEmail)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"lightgrey"}
              secureTextEntry
              value={password}
              onChangeText={(inputPassword) => setPassword(inputPassword)}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.bottomContainer}>
            <Pressable style={styles.signInBtnContainer}>
              <Text style={styles.signInBtnText}>Sign In</Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                Or Sign Up with us{" "}
                <Text
                  style={styles.hereBtn}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  Here
                </Text>{" "}
                to create your account!
              </Text>
            </View>
          </View>
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
    // justifyContent: "center",
    paddingTop: 80,
  },
  topContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  signInText: {
    fontSize: 42,
    fontWeight: "700",
    paddingBottom: 20,
  },
  signInDetail: {
    textAlign: "center",
    paddingHorizontal: 50,
  },
  middleContainer: {
    height: "25%",
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#78c4a4",
    borderWidth: 1,
    borderRadius: 7,
    color: "black",
  },

  bottomContainer: {
    height: "25%",
    flex: 1,
    flexDirection: "column",
    gap: 20,
    marginTop: "7%",
  },
  signInBtnContainer: {
    backgroundColor: "#78c4a4",
    paddingVertical: 20,
    paddingHorizontal: 150,
    borderRadius: 100,
  },
  signInBtnText: {
    color: "white",
    fontSize: 18,
  },
  signUpContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "black",
    fontSize: 18,
  },
  hereBtn: {
    color: "blue",
    fontSize: 18,
  },
});
