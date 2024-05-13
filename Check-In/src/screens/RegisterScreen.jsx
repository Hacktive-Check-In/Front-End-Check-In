import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <>
      <SafeAreaProvider>
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
              placeholder="PhoneNumber"
              placeholderTextColor={"lightgrey"}
              value={phoneNumber}
              onChangeText={(inputPhoneNumber) =>
                setPhoneNumber(inputPhoneNumber)
              }
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.bottomContainer}>
            <Pressable style={styles.signInBtnContainer}>
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
    paddingTop: 80,
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
