import { memo, useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { InfoText, BodyText } from "./common/Typography";

const DeliveryTimer = ({ activeOrderRider, activeOrder }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const formattedOrderReceivedTime = activeOrder.order_received_time.substr(
      0,
      activeOrder.order_received_time.length - 1
    );
    const orderDate = new Date(formattedOrderReceivedTime);

    // Calculate the delivery deadline (35 minutes after the order time)
    const deliveryDeadline = new Date(orderDate.getTime() + 35 * 60 * 1000);

    // Calculate the remaining time in seconds
    const calculateRemainingTime = () => {
      const currentTime = new Date();
      const timeLeft = Math.max(0, (deliveryDeadline - currentTime) / 1000); // Prevent negative time
      setRemainingTime(Math.floor(timeLeft));
    };

    // Call it initially to set the time
    calculateRemainingTime();

    // Set interval to update the remaining time every second
    const interval = setInterval(calculateRemainingTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [activeOrder.order_received_time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.detailsArea}>
      <Pressable style={styles.deliveryboydetails}>
        <View style={styles.nameandICon}>
          {/* <Image source={require("../assets/food-delivery.svg")} /> */}
          <View style={styles.mobileNO}>
            <InfoText
              text={`Mr. ${activeOrderRider.user_name} is bringing
  your food in...`}
              color={"#FFFFFF"}
            />
            <InfoText
              text={`M. No. : ${activeOrderRider.user_phone}`}
              weight={"700"}
              color={"#FFFFFF"}
            />
          </View>
        </View>
        <View style={styles.timecontainer}>
          <BodyText
            text={remainingTime > 0 ? `${formatTime(remainingTime)}` : "00:00"}
            color={"#E4122F"}
            weight={"500"}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default memo(DeliveryTimer);

const styles = StyleSheet.create({
  detailsArea: {
    backgroundColor: "#FFFFFF",
    height: 112,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
    shadowOpacity: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
  },

  deliveryboydetails: {
    backgroundColor: "#E4112F",
    height: 72,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  nameandICon: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
  },
  mobileNO: {
    rowGap: 8,
  },
  timecontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
    height: 32,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    alignSelf: "center",
  },
});
