import SpeedList from "./SpeedList";

const SpeedListContainer = () => {
  const [modalVisible, setmodalVisible] = useState(false);

  return <SpeedList modalVisible={modalVisible} />;
};

export default SpeedListContainer;
