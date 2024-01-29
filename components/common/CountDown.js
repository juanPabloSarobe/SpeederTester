import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

const CountDown = ({ isVisible, onCountdownEnd, startRace }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        clearInterval(interval);
        onCountdownEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, onCountdownEnd]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onCountdownEnd();
      }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.text}>{countdown}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    fontSize: 50,
    color: "white",
  },
});

export default CountDown;
