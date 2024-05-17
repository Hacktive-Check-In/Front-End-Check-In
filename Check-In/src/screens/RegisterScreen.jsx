import { useContext, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !phoneNumber) {
        throw `incomplete field`;
      }

      phoneNumber.split("").map((phone) => {
        if (
          phone != 0 ||
          phone != 1 ||
          phone != 2 ||
          phone != 3 ||
          phone != 4 ||
          phone != 5 ||
          phone != 6 ||
          phone != 7 ||
          phone != 8 ||
          phone != 9
        ) {
          throw `invalid phone format`;
        }
      });

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}` + `/register`,
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        }
      );

      Alert.alert(
        "Registration Successful!",
        `Thankyou for registering ${name}! Your registered email is ${email}`
      );

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      if (error === `invalid phone format`) {
        return Alert.alert("Wrong Format!", "Invalid Phone Number Format!");
      } else if (error === `incomplete field`) {
        return Alert.alert("Incomplete Fields!", "All fields must be filled!");
      } else {
        Alert.alert(
          "Registration Failed",
          "An error occurred while registering."
        );
      }
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <ScrollView style={styles.scrollContainer}>
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.createAccountText}>Create an Account</Text>
              <Text style={styles.signUpDetail}>
                Fill your information below account
              </Text>
              <Text style={styles.signUpDetail}>
                or register with your social media account
              </Text>
            </View>
            <View style={styles.middleContainer}>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"lightgrey"}
                value={name}
                onChangeText={(inputName) => setName(inputName)}
                autoCorrect={false}
                autoCapitalize="none"
              />
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
              <Text>PhoneNumber</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="PhoneNumber"
                placeholderTextColor={"lightgrey"}
                value={phoneNumber}
                onChangeText={(inputPhoneNumber) =>
                  setPhoneNumber(inputPhoneNumber)
                }
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={14}
              />
            </View>
            <View style={styles.bottomContainer}>
              <Pressable
                style={styles.signInBtnContainer}
                onPress={handleRegister}
              >
                <Text style={styles.signUpBtnText}>Sign Up</Text>
              </Pressable>
              <View style={styles.signUpContainer}>
                <Text style={styles.signInLinkText}>
                  Already have an account?
                </Text>
                <Text
                  style={styles.hereBtn}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  Login
                  <Text> to your account instead!</Text>
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#faf7f5",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    minHeight: "100%",
  },
  scrollContainer: {
    backgroundColor: "#faf7f5",
    paddingTop: 25,
  },
  topContainer: {
    height: "15%",
    alignItems: "center",
    gap: 3,
  },
  createAccountText: {
    fontSize: 32,
    fontWeight: "700",
    paddingBottom: 12,
  },
  signUpDetail: {
    textAlign: "center",
    paddingHorizontal: 50,
  },
  middleContainer: {
    height: "50%",
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
    height: "20%",
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
  signUpBtnText: {
    color: "white",
    fontSize: 18,
  },
  signUpContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  signInLinkText: {
    color: "black",
    fontSize: 18,
  },
  hereBtn: {
    color: "blue",
    fontSize: 18,
  },
});
