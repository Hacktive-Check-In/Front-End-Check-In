import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet, ActivityIndicator } from "react-native";

export default function MidtransWebView({ navigation, route }) {
  const { url } = route.params;

  const handleNavigationStateChange = (navState) => {
    // Check if the web view has finished loading
    if (!navState.loading) {
      // Check if the URL is the completion URL
      if (navState.url === `${url}#/success`) {
        // Navigate to another screen
        navigation.navigate("InvoiceResponse");
      } else if (navState.url === `${url}#/failed`) {
        navigation.navigate("/");
      }
    }
  };

  return (
    <WebView
      style={styles.container}
      source={{ uri: url }}
      onLoad={() => console.log("WebView loaded")}
      onNavigationStateChange={handleNavigationStateChange}
      renderLoading={() => <ActivityIndicator style={styles.loadingIndicator} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
