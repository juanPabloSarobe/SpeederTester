import { Modal, View } from "react-native";

const SpeedList = (modalVisible) => {
  console.log(modalVisible);
  return (
    <>
      <Modal animationType="slide" visible={modalVisible}></Modal>
    </>
  );
};

export default SpeedList;
