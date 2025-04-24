import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, IconButton, Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants/routes";
import {
  InfoText,
  BodyText,
  HeadingText,
  DotText,
} from "../components/common/Typography";
import ControlledComponent from "../components/common/ControlledComponent";

const ORDER_STATUS_MAPPER = {
  0: "Recieved",
  1: "Processed",
  2: "Vendor",
  3: "Ready to Ship",
  4: "On the Way",
  5: "Delivered",
  6: "Cancelled",
};

function formatDate(dateString) {
  const formattedDs = dateString.substr(0, dateString.length - 1);
  const date = new Date(formattedDs);

  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = date
    .toLocaleTimeString("en-GB", timeOptions)
    .replace(" ", "");

  return `${formattedDate} at ${formattedTime}`;
}

const OrderDetails = ({ ordersList, reOrderState, onReOrder }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={ordersList}
      contentContainerStyle={{ padding: 8 }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={(item) => {
        const o = item.item;
        const handleRouteToRestaurantPage = () => {
          navigation.navigate(ROUTES.RESTRO_MENU, {
            restaurantId: o.business.user_id,
          });
        };

        const handleReOrder = () => {
          onReOrder(o);
        };

        return (
          <Card key={o.order_id} style={styles.cardBG}>
            <Card.Content>
              <View style={styles.header}>
                <View style={styles.namelogospaceineg}>
                  <View style={styles.headerText}>
                    <BodyText
                      text={o.business.business_name}
                      weight="600"
                      colo="#000000"
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.deliveryandviewmenucontainer}>
                    <DotText text={"\u2B24"} color={`#959595`} />
                    <InfoText
                      text={`${ORDER_STATUS_MAPPER[o.order_status]}`}
                      weight="400"
                      colo="#959595"
                    />
                  </View>

                  <Pressable
                    onPress={handleRouteToRestaurantPage}
                    style={styles.viewmenubutton}
                  >
                    <InfoText
                      text={` View Menu`}
                      weight="500"
                      color="#E4122F"
                    />

                    <AntDesign name="caretright" size={8} color="#E4122F" />
                  </Pressable>
                </View>
              </View>

              <View>
                {o.store_orders_details
                  .filter((item) => item.product_qty > 0)
                  .map((item, i) => (
                    <View key={i} style={styles.listItem}>
                      <InfoText
                        text={item.product_qty}
                        weight="600"
                        color="#000000"
                      />
                      <InfoText text={` x `} weight="600" color="#000000" />
                      <InfoText
                        text={item.product.product_name}
                        weight="600"
                        color="#000000"
                      />
                    </View>
                  ))}
              </View>
              <View style={styles.divider} />
              <View style={{ rowGap: 8, paddingTop: 16 }}>
                <View>
                  <InfoText
                    text={`Order number - ${o.order_id}`}
                    color="#959595"
                    weight="600"
                  />
                </View>
                <View style={styles.footer}>
                  <InfoText
                    text={formatDate(o.order_received_time)}
                    color="#959595"
                    weight="600"
                  />
                  <InfoText
                    text={`₹ ${o.order_amount}`}
                    color="#959595"
                    weight="600"
                  />
                </View>
              </View>
            </Card.Content>
            <View style={styles.footercontainer}>
              <View>
                <Button
                  style={styles.reorderButton}
                  mode="contained"
                  onPress={handleReOrder}
                >
                  {reOrderState?.order_id === o.order_id
                    ? "Loading...."
                    : "Re-Order"}
                </Button>
              </View>
            </View>
          </Card>
        );
      }}
    />
  );

  // return (
  //   <>
  //     {ordersList.map((o) => {
  //       const handleRouteToRestaurantPage = () => {
  //         navigation.navigate(ROUTES.RESTRO_MENU, {
  //           restaurantId: o.business.user_id,
  //         });
  //       };

  //       return (
  //         <Card key={o.order_id} style={styles.cardBG}>
  //           <Card.Content>
  //             <View style={styles.header}>
  //               <View style={styles.namelogospaceineg}>
  //                 <View style={styles.headerText}>
  //                   <BodyText
  //                     text={o.business.business_name}
  //                     weight="600"
  //                     colo="#000000"
  //                   />
  //                 </View>
  //               </View>
  //               <View>
  //                 <View style={styles.deliveryandviewmenucontainer}>
  //                   <DotText text={"\u2B24"} color={`#959595`} />
  //                   <InfoText
  //                     text={`${ORDER_STATUS_MAPPER[o.order_status]}`}
  //                     weight="400"
  //                     colo="#959595"
  //                   />
  //                 </View>

  //                 <Pressable
  //                   onPress={handleRouteToRestaurantPage}
  //                   style={styles.viewmenubutton}
  //                 >
  //                   <InfoText
  //                     text={` View Menu`}
  //                     weight="500"
  //                     color="#E4122F"
  //                   />

  //                   <AntDesign name="caretright" size={8} color="#E4122F" />
  //                 </Pressable>
  //               </View>
  //             </View>

  //             <View>
  //               {o.store_orders_details.map((item, i) => (
  //                 <View key={i} style={styles.listItem}>
  //                   <InfoText
  //                     text={item.product_qty}
  //                     weight="600"
  //                     color="#000000"
  //                   />
  //                   <InfoText text={` x `} weight="600" color="#000000" />
  //                   <InfoText
  //                     text={item.product.product_name}
  //                     weight="600"
  //                     color="#000000"
  //                   />
  //                 </View>
  //               ))}
  //             </View>
  //             <View style={styles.divider} />
  //             <View style={styles.footer}>
  //               <InfoText
  //                 text={formatDate(o.order_received_time)}
  //                 color="#959595"
  //                 weight="600"
  //               />
  //               <InfoText
  //                 text={`₹ ${o.order_amount}`}
  //                 color="#959595"
  //                 weight="600"
  //               />
  //             </View>
  //           </Card.Content>

  //           <View style={styles.footercontainer}>
  //             {/* <View style={styles.rating}>
  //                 <InfoText text={`You rated 3`} weight="600" color="#000000" />
  //                 <Image
  //                   source={require("../assets/star.svg")}
  //                   style={styles.startImg}
  //                 />
  //               </View> */}

  //             <View>
  //               <Button
  //                 style={styles.reorderButton}
  //                 mode="contained"
  //                 onPress={() => navigation.navigate(ROUTES.CART)}
  //               >
  //                 Re-Order
  //               </Button>
  //             </View>
  //           </View>
  //         </Card>
  //       );
  //     })}
  //   </>
  // );
};

export default function MyOrders({ ordersList, reOrderState, onReOrder }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenBG}>
      <View style={styles.pageContainer}>
        <View style={styles.backbuttonandMyOrdercontainer}>
          <View style={styles.headingSection}>
            <IconButton
              icon="chevron-left"
              iconColor="#111719"
              size={28}
              style={styles.backbutton}
              onPress={() => navigation.navigate(ROUTES.PROFILE)}
            />
          </View>

          <View
            style={{
              ...styles.headingSection,
              ...styles.headingTextContainer,
            }}
          >
            <HeadingText text={`My Orders`} color="#111719" weight="500" />
          </View>
          <View style={styles.headingSection} />
        </View>
        <ControlledComponent controller={ordersList.length === 0}>
          <View style={styles.emptySearchResults}>
            <BodyText text="No orders yet." color="#000" weight={"500"} />
          </View>
        </ControlledComponent>
        <ControlledComponent controller={ordersList.length > 0}>
          <OrderDetails
            onReOrder={onReOrder}
            reOrderState={reOrderState}
            ordersList={ordersList}
          />
        </ControlledComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backbuttonandMyOrdercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },

  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  headerText: {
    maxWidth: "80%",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    columnGap: 8,
  },

  reorderButton: {
    borderRadius: 20,
  },
  listItem: {
    paddingVertical: 12,
    flexDirection: "row",
  },

  viewmenubutton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBG: { backgroundColor: "#FFFFFF" },
  namelogospaceineg: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  restroaddress: {
    fontSize: 12,
    fontWeight: "400",
    color: "#959595",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
    width: "100%",
  },
  deliveryandviewmenucontainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  footercontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  screenBG: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  pageContainer: {
    paddingHorizontal: 16,
    rowGap: 16,
    flex: 1,
  },
  headingSection: {
    flex: 1,
  },
  headingTextContainer: {
    alignItems: "center",
  },
  emptySearchResults: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  separator: {
    height: 16,
  },
});
