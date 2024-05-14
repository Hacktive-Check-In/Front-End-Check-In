import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export default function MidtransWebView() {
  return <WebView style={styles.container} source={{ uri: "https://expo.dev" }} />;
  // tinggal ganti urinya pake midtrans
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
