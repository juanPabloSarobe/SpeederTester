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
    <SafeAreaView
      style={[GlobalStyles.droidSafeArea]}
      className="flex-1 items-center justify-between dark:bg-slate-900  "
    >
      <StatusBar /* barStyle={"light-content"} */ />
      <View style={styles.basicDataBar}>
        <View className=" flex-1  h-full justify-center items-start   ">
          <Text className="text-gray-900 dark:text-white "> Barsignal</Text>
        </View>
        <View className=" flex-1  h-full justify-center items-center    ">
          <Text className="text-gray-900 dark:text-white ">BarBatery</Text>
        </View>
        <View className=" flex-1  h-full justify-center items-end ">
          <Text className="text-gray-900 dark:text-white ">BarSatelital</Text>
        </View>
        <View className="flex-row items-center  ">
          <Text className=" dark:text-white mr-2 ">Light</Text>
          <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
          <Text className=" dark:text-white ml-2">Dark</Text>
        </View>
      </View>
      <View className="h-2/5 w-full, justify-center items-center ">
        <Text
          className="text-8xl text-gray-900 dark:text-teal-400 "
          style={styles.avgSpeedText}
        >
          100.000
        </Text>
      </View>
      <View style={styles.runDataContainer}>
        <View className="bg-slate-800 rounded-lg flex-1  ">
          <Text style={{ color: "#8B849A" }}>Velocidad</Text>
        </View>
        <View className="bg-slate-800 rounded-lg flex-1  ">
          <Text style={{ color: "#8B849A" }}>Distancia</Text>
        </View>
        <View className="bg-slate-800 rounded-lg flex-1  ">
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
      <View>
        <Button title="restart" onPress={restart} />

        <Button title="Iniciar" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  basicDataBar: {
    marginTop: 20,
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avgSpeed: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avgSpeedText: {
    fontFamily: "digital_counter_7",
  },
  runDataContainer: {
    flexDirection: "row",
    height: 140,
    gap: 5,
    padding: 5,
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
    backgroundColor: "red",
  },
});
