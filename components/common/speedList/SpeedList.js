import { Modal, Text, View, StyleSheet } from "react-native";

const SpeedList = ({ isVisible }) => {
  console.log(isVisible);
  return (
    <>
      <Modal animationType="slide" visible={isVisible} transparent={true}>
        <View>
          <Text>Nuevo modal</Text>

          <View style={styles.modalContainer}>
            <Text style={styles.text}>{isVisible}</Text>
          </View>
        </View>
      </Modal>
    </>
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
export default SpeedList;
