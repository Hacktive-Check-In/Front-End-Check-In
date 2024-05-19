import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../../context/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        throw `incomplete field`;
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/login`,
        {
          email: email,
          password: password,
        }
      );

      if (!response.data.access_token) {
        throw `no token`;
      }

      await SecureStore.setItemAsync(
        "access_token",
        response.data.access_token
      );
      await SecureStore.setItemAsync("email", email);
      setEmail("");
      setPassword("");
      auth.setIsSignedIn(true);
    } catch (error) {
      console.log(error);
      if (error === `incomplete field`) {
        return Alert.alert("Incomplete Fields!", "All fields must be filled!");
      } else if (error === `no token`) {
        return Alert.alert("Not Authorized!", "Email / Password is not valid");
      } else {
        Alert.alert("Login Failed", "An error occurred while Logging in.");
      }
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.topContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={{
                  uri: "https://res.cloudinary.com/dnvty1n0c/image/upload/v1716111805/check%20in%20logo/3_x9oi3z.png",
                }}
              />
            </View>
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
            <Pressable style={styles.signInBtnContainer} onPress={handleLogin}>
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
    justifyContent: "center",
    paddingTop: 40,
  },
  topContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
  logoContainer: {
    marginVertical: "-10%",
  },
  logo: {
    width: 200,
    height: 200,
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
    height: "33%",
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
    paddingHorizontal: 0,
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
