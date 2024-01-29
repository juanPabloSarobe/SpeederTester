import SpeedList from "./SpeedList";

const SpeedListContainer = ({ isVisible }) => {
  console.log(isVisible);
  return <SpeedList isVisible={isVisible} />;
};

export default SpeedListContainer;
