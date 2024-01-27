import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#040F0F",
    paddingTop: Platform.OS === "android" ? 1 : 0,
  },
});
