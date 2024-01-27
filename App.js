import GlobalStyles from "./GlobalStyles";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  StatusBar,
  Switch,
} from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [fontLoaded] = useFonts({
    digital_counter_7: require("./assets/fonts/digital_counter_7.ttf"),
  });
  const restart = () => Alert.alert("Contadores Reiniciados");
  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <StatusBar /* barStyle={"light-content"} */ />
      <View style={styles.basicDataBar}>
        <View className="flex-1  h-full justify-center items-start bg-green-300 dark:bg-white ">
          <Text> Barsignal</Text>
        </View>
        <View style={styles.barBatery}>
          <Text>BarBatery</Text>
        </View>
        <View style={styles.barSatelital}>
          <Text>BarSatelital</Text>
        </View>
      </View>
      <View style={styles.avgSpeed}>
        <Text style={styles.avgSpeedText}>100.000</Text>
      </View>
      <View style={styles.runDataContainer}>
        <View style={styles.instaSpeed}>
          <Text style={{ color: "#8B849A" }}>Velocidad</Text>
        </View>
        <View style={styles.distance}>
          <Text style={{ color: "#8B849A" }}>Distancia</Text>
        </View>
        <View style={styles.maxSpeed}>
          <Text style={{ color: "#8B849A", flex: 1 }}>Vel Maxima</Text>
          <View
            style={{
              flex: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "#49D4C6",
                  fontSize: 80,
                  fontFamily: "digital_counter_7",
                }}
              >
                80
              </Text>
              <Text
                style={{
                  color: "#49D4C6",
                  fontSize: 12,
                  fontFamily: "digital_counter_7",
                  alignSelf: "flex-end",
                }}
              >
                {" "}
                km/h
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.restartButton}>
        <Button title="restart" onPress={restart} />
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicDataBar: {
    backgroundColor: "red",
    marginTop: 20,
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  barSignal: {
    backgroundColor: "green",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  barBatery: {
    backgroundColor: "yellow",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barSatelital: {
    backgroundColor: "brown",
    height: "100%",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  avgSpeed: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avgSpeedText: {
    fontSize: 110,
    color: "#49D4C6",
    fontFamily: "digital_counter_7",
  },
  runDataContainer: {
    flexDirection: "row",
    height: 140,
    gap: 5,
    padding: 5,
  },
  instaSpeed: {
    flex: 1,
    backgroundColor: "#202231",
    borderRadius: 10,
  },
  distance: {
    backgroundColor: "#202232",
    flex: 1,
    borderRadius: 10,
  },
  maxSpeed: {
    backgroundColor: "#202231",
    borderRadius: 10,
    flex: 1,
  },

  text: {
    fontSize: 48,
    textAlign: "center",
  },
  restartButton: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
  },
});
