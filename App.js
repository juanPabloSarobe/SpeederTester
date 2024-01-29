import GlobalStyles from "./GlobalStyles";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Switch,
  Modal,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import CountDown from "./components/common/CountDown";
import nextId from "react-id-generator";

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [fontLoaded] = useFonts({
    digital_counter_7: require("./assets/fonts/digital_counter_7.ttf"),
  });

  const [avgSpeed, setAvgSpeed] = useState("");
  const [speedList, setSpeedList] = useState([0]);
  const [speed, setSpeed] = useState(0);
  const [startRace, setStartRace] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [countDownModalVisible, setCountDownModalVisible] = useState(false);
  const [stadistics, setStadistics] = useState([]);

  // lista de velocidadades
  const [isVisibleSpeedList, setisVisibleSpeedList] = useState(false);

  const handleModalSpeedList = () => setisVisibleSpeedList(!isVisibleSpeedList);

  const handleCountdownEnd = () => {
    setCountDownModalVisible(false);

    startSpeedCounter();
  };

  const startSpeedCounter = () => {
    resetCounters();
    setStartRace(true);
    const id = setInterval(() => {
      const newSpeed = Math.floor(Math.random() * 100);
      setSpeed(newSpeed);
      setSpeedList((prevList) => [...prevList, newSpeed]);
      setTimeElapsed((prevTime) => prevTime + 1);
      setDistance((prevDistance) => prevDistance + (newSpeed * 1000) / 3600);
    }, 1000);
    setIntervalId(id);
  };

  const stopSpeedCounter = () => {
    setStartRace(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resetCounters = () => {
    setSpeed(0);
    setSpeedList([]);
    setAvgSpeed(0);
    setTimeElapsed(0);
    setDistance(0);
    setStadistics([]);
  };

  useEffect(() => {
    const total = speedList.reduce((acc, curr) => acc + curr, 0);
    const average = total / speedList.length || 0;
    setAvgSpeed(average.toFixed(3));

    const newStad = {
      id: nextId(),
      time: formatTime(timeElapsed),
      speed: speed,
      distance: distance,
      averageSpeed: average.toFixed(3),
    };

    newStad.time != "00:00:00" &&
      setStadistics((prevStad) => [...prevStad, newStad]);
  }, [speedList]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onHandlerModaDelete = (id) => {
    /* Falta implementar el modal */
    deleteStadistic(id);
  };

  const deleteStadistic = (id) => {
    setStadistics(stadistics.filter((stadistics) => stadistics.id != id));
  };
  const medidores = [
    {
      title: "Velocidad",
      unit: "km/h",
      id: 0,
      value: speed,
      textSize: 70,
    },
    {
      title: "Distancia",
      unit: "m",
      id: 1,
      value: distance.toFixed(2),
      textSize: 30,
    },
    {
      title: "Tiempo",
      unit: "hh:mm:ss",
      id: 2,
      value: formatTime(timeElapsed),
      textSize: 30,
    },
  ];

  return (
    <SafeAreaView
      style={[GlobalStyles.droidSafeArea]}
      className="flex-1 items-center justify-between dark:bg-slate-900  "
    >
      <StatusBar />
      <View className="mt-2 h-8  w-full flex-row items-center justify-around ">
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
          <Text className=" dark:text-white ml-2 ">Light</Text>
          <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
          <Text className=" dark:text-white ml-2">Dark</Text>
        </View>
      </View>
      <View className="h-2/5 w-full, flex-col justify-center items-center ">
        <View className="flex-row w-full px-12 mb-3 items-start justify-between ">
          <Text className=" text-neutral-900 dark:text-gray-400 ">
            Velocidad Promedio
          </Text>
          <Text>{"   "}</Text>
          <Text className=" text-neutral-900  dark:text-teal-400  ">km/h</Text>
        </View>
        <Text
          className="text-8xl text-gray-900 dark:text-teal-400 "
          style={{ fontFamily: "digital_counter_7" }}
        >
          {avgSpeed}
        </Text>
      </View>
      <View className=" flex-row h-1/6 gap-1 p-1 ">
        {medidores.map((item) => {
          return (
            <View
              key={item.id}
              className="  bg-slate-300 dark:bg-slate-800 rounded-lg flex-1 "
            >
              <View className=" flex-row justify-between p-1">
                <Text className=" text-neutral-900 dark:text-gray-400 ">
                  {item.title}
                </Text>
                <Text className=" text-neutral-900  dark:text-teal-400  ">
                  {item.unit}
                </Text>
              </View>
              <View className=" items-center justify-center ">
                <View className=" items-center justify-center flex-row ">
                  <Text
                    className=" text-neutral-900 dark:text-teal-400 "
                    style={{
                      fontFamily: "digital_counter_7",
                      fontSize: item.textSize,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View className="flex-row justify-evenly m-2 gap-1 ">
        <View className="w-1/3">
          {startRace ? (
            <>
              <Button
                title="Detener"
                color="red"
                onPress={() => stopSpeedCounter()}
              />
            </>
          ) : (
            <>
              <Button
                title="Iniciar"
                color="green"
                onPress={() => setCountDownModalVisible(true)}
              />
              {countDownModalVisible && (
                <CountDown
                  isVisible={countDownModalVisible}
                  onCountdownEnd={() => handleCountdownEnd()}
                />
              )}
            </>
          )}
        </View>
        <View className="w-1/4">
          {!startRace && speedList.length > 1 && (
            <>
              <Button
                title="ver datos"
                color="grey"
                onPress={handleModalSpeedList}
              />

              {isVisibleSpeedList && (
                <Modal visible={isVisibleSpeedList} animationType="slide">
                  <View className="bg-slate-200 dark:bg-slate-900 justify-center items-center">
                    <Text className=" text-slate-900 dark:text-slate-100 h-8 text-2xl m-3 mt-4">
                      Estadisticas
                    </Text>

                    <View className="flex-row gap-4 pt-2 justify-evenly ">
                      <Text className=" text-slate-900 dark:text-slate-100 h-8 text-l ">
                        Tiempo
                      </Text>
                      <Text className=" text-slate-900 dark:text-slate-100 h-8 text-l ">
                        Distancia
                      </Text>
                      <Text className=" text-slate-900 dark:text-slate-100 h-8 text-l ">
                        Velocidad
                      </Text>
                      <Text className=" text-slate-900 dark:text-slate-100 h-8 text-l ">
                        Vel Promedio
                      </Text>
                      <Text className=" text-slate-900 dark:text-slate-100 h-8 text-l ">
                        Borrar
                      </Text>
                    </View>
                  </View>
                  <FlatList
                    className="flex-1  bg-slate-200 dark:bg-slate-900"
                    data={stadistics}
                    keyExtractor={(item) => item.time}
                    renderItem={({ item }) => (
                      <View className="flex-row gap-2 rounded-md justify-evenly items-center m-2 pb-2 h-14  bg-white dark:bg-slate-800">
                        <Text className=" text-slate-900 dark:text-slate-100 text-xl">
                          {item.time}
                        </Text>
                        <Text className=" text-slate-900 dark:text-slate-100 text-xl">
                          {" "}
                          {item.distance.toFixed(2)}
                        </Text>
                        <Text className=" text-slate-900 dark:text-slate-100 text-xl">
                          {" "}
                          {item.speed}
                        </Text>
                        <Text className=" text-slate-900 dark:text-slate-100 text-xl">
                          {" "}
                          {item.averageSpeed}
                        </Text>
                        <View className="w-16  ">
                          <Button
                            title="Del"
                            color="red"
                            onPress={() => onHandlerModaDelete(item.id)}
                          />
                        </View>
                      </View>
                    )}
                  />
                  <Button title="Cerrar" onPress={handleModalSpeedList} />
                </Modal>
              )}
            </>
          )}
        </View>
        <View className="w-1/3">
          <Button title="restart" onPress={resetCounters} />
        </View>
      </View>
    </SafeAreaView>
  );
}
