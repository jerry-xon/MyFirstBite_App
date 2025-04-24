import { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme, IconButton, MD3Colors, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import {
  BodyText,
  HeadingText,
  InfoText,
  NavigationText,
} from "../components/common/Typography";
import { VENDOR_ASSETS_BASE_URL } from "../constants/urls";
import ControlledComponent from "../components/common/ControlledComponent";
import { theme } from "../theme";
import { FETCH_STATES } from "../redux/constants";
import { isShopOpen } from "../helpers/utils";

const TimeLocation = ({ restaurant }) => {
  const handleImageError = (error) => {
    console.error("Error loading image:", error.nativeEvent.error);
    // Handle error (e.g., display fallback image)
  };
  return (
    <View style={styles.restaurantNameContainer}>
      <Image
        source={{
          uri: `${VENDOR_ASSETS_BASE_URL}/${restaurant.user.user_image}.webp`,
          height: 60,
          width: 60,
        }}
        onError={handleImageError}
        style={styles.restaurantImage}
      />
      <BodyText text={restaurant.business_name} color="#000" weight="600" />
    </View>
  );
};

const BreakDown = ({
  subTotal,
  showTotal,
  total,
  deliveryCharge,
  discount,
}) => {
  return (
    <View style={styles.breakdowncontainer}>
      <View style={styles.breakdownfields}>
        <NavigationText
          text={`Subtotal`}
          weight={"600"}
          color={"#959595"}
        ></NavigationText>
        <NavigationText text={`₹ ${subTotal}`} weight={"600"}>
          {" "}
        </NavigationText>
      </View>
      <ControlledComponent controller={discount > 0}>
        <View style={styles.breakdownfields}>
          <NavigationText
            text={`Discount`}
            weight={"600"}
            color={"#959595"}
          ></NavigationText>
          <NavigationText text={`₹ ${discount}`} weight={"600"}>
            {" "}
          </NavigationText>
        </View>
      </ControlledComponent>
      <ControlledComponent controller={showTotal}>
        <View style={styles.breakdownfields}>
          <NavigationText
            text={`Delivery Charge`}
            weight={"600"}
            color={"#959595"}
          ></NavigationText>
          <NavigationText text={`₹ ${deliveryCharge}`} weight={"500"}>
            {" "}
          </NavigationText>
        </View>

        <View style={styles.breakdownfields}>
          <NavigationText
            text={`Total`}
            weight={"600"}
            color={"#000"}
          ></NavigationText>
          <NavigationText text={`₹ ${total}`} weight={"600"}>
            {" "}
          </NavigationText>
        </View>
      </ControlledComponent>
    </View>
  );
};
const Checkout = ({
  isUserLoggedIn,
  navigateToLoginPage,
  onCheckout,
  selectedAddress,
  onPlaceOrder,
  placeOrderStatus,
  isDisabled,
  isRestroOpen,
}) => {
  const handleClick = () => {
    if (isDisabled || isRestroOpen === false) {
      return false;
    }
    if (!isUserLoggedIn) {
      navigateToLoginPage();
      return;
    }
    if (selectedAddress == null) {
      onCheckout();
      return;
    }
    if (
      placeOrderStatus.fetchState == FETCH_STATES.NOT_STARTED ||
      placeOrderStatus.fetchState == FETCH_STATES.ERROR
    ) {
      onPlaceOrder();
    }
  };

  const btnText = useMemo(() => {
    if (placeOrderStatus.fetchState === FETCH_STATES.IN_PROGRESS) {
      return "Placing your order....";
    }
    if (isUserLoggedIn) {
      if (selectedAddress != null) {
        return "Place order";
      }
      if (selectedAddress == null) {
        return "Select Address";
      }
      return "Checkout";
    }
    return "Login to checkout";
  }, [placeOrderStatus, isUserLoggedIn, selectedAddress]);

  return (
    <View>
      <Pressable
        onPress={handleClick}
        style={
          isDisabled || isRestroOpen === false
            ? { ...styles.Checkoutbutton, ...styles.disabledCheckoutButton }
            : { ...styles.Checkoutbutton }
        }
      >
        <InfoText text={btnText} weight={"600"} color={"#FFFFFF"} />
      </Pressable>
    </View>
  );
};

const ListItem = ({
  item,
  qty,
  onIncrementProductQuantity,
  onDecrementProductQuantity,
}) => {
  const theme = useTheme();

  const handleIncrementProductQuantity = () => {
    onIncrementProductQuantity(item.product_id);
  };

  const handleDecrementProductQuantity = () => {
    onDecrementProductQuantity(item.product_id);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <InfoText
          text={item.product_name}
          weight={"600"}
          numberOfLines={1}
        ></InfoText>
      </View>
      <View style={styles.quantityContainer}>
        <View style={styles.qtyIcons}>
          <IconButton
            mode="outlined"
            size={10}
            style={{ borderColor: theme.colors.primary }}
            iconColor={MD3Colors.error50}
            icon="minus-thick"
            onPress={handleDecrementProductQuantity}
          />
          <View style={styles.quantityText}>
            <NavigationText
              text={qty < 10 ? `0${qty}` : qty}
              weight={"600"}
            ></NavigationText>
          </View>
          <IconButton
            mode="contained"
            style={styles.iconbuttonplus}
            size={10}
            iconColor="white"
            icon="plus-thick"
            containerColor="#E4122F"
            onPress={handleIncrementProductQuantity}
          />
        </View>
        <View style={styles.priceContainer}>
          <InfoText
            text={`₹${Number(item.product_mrp) * qty}`}
            weight={"600"}
            color={theme.colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

const calculateDiscount = (cartView, subtotal) => {
  if (cartView.couponCodeStatus.discount) {
    return cartView.couponCodeStatus.discount;
  }
  if (
    cartView.restaurant?.business_discount != null &&
    cartView.restaurant.business_discount > 0
  ) {
    return Math.floor(
      subtotal -
        subtotal * ((100 - cartView.restaurant.business_discount) / 100)
    );
  }
  return 0;
};

export default function Cart({
  cartView,
  isUserLoggedIn,
  navigateToLoginPage,
  handleRedirectToRestaurantPage,
  onIncrementProductQuantity,
  onDecrementProductQuantity,
  onCheckout,
  onPlaceOrder,
  onApplyCouponCode,
  onClearCoupon,
}) {
  const [coupon, setCoupon] = useState("");
  const navigation = useNavigation();
  const {
    products,
    cartQuantity,
    restaurant,
    selectedAddress,
    placeOrderStatus,
    couponCodeStatus,
  } = cartView;

  const {
    deliveryCharge,
    isCheckoutDisabled,
    areaCheckout,
    isRestroOpen,
    subtotal,
  } = useMemo(() => {
    const subtotal = products.reduce((prev, curr) => {
      return prev + curr.product_mrp * cartQuantity[curr.product_id];
    }, 0);
    if (isUserLoggedIn === false) {
      return {
        deliveryCharge: 0,
        isCheckoutDisabled: false,
        areaCheckout: 0,
        isRestroOpen: true,
        subtotal,
      };
    }
    if (restaurant == null) {
      return {
        deliveryCharge: 0,
        isCheckoutDisabled: true,
        areaCheckout: 0,
        isRestroOpen: false,
        subtotal,
      };
    }

    if (selectedAddress == null) {
      return {
        deliveryCharge: 0,
        isCheckoutDisabled: false,
        areaCheckout: 0,
        isRestroOpen: true,
        subtotal,
      };
    }
    const areaDetails = restaurant.areas.find(
      (area) => area.location.location_id === selectedAddress.delivery_city
    );
    const isRestroOpen = isShopOpen(restaurant);
    if (subtotal >= areaDetails.area_charge_free) {
      return {
        deliveryCharge: 0,
        isCheckoutDisabled: false,
        areaCheckout: areaDetails.area_checkout,
        isRestroOpen,
        subtotal,
      };
    }
    return {
      deliveryCharge:
        couponCodeStatus.freeDelivery === true ? 0 : areaDetails.area_charge,
      isCheckoutDisabled: subtotal < areaDetails.area_checkout,
      areaCheckout: areaDetails.area_checkout,
      isRestroOpen,
      subtotal,
    };
  }, [
    restaurant,
    selectedAddress,
    products,
    cartQuantity,
    isUserLoggedIn,
    couponCodeStatus,
  ]);

  const handleApplyCouponCode = useCallback(() => {
    onApplyCouponCode(coupon, subtotal);
  }, [coupon, subtotal]);

  const handleClearCoupon = useCallback(() => {
    setCoupon("");
    onClearCoupon();
  }, [onClearCoupon]);

  const handlePlaceOrder = useCallback(() => {
    if (couponCodeStatus.success === true) {
      onPlaceOrder(coupon);
    } else {
      onPlaceOrder(null);
    }
  }, [onPlaceOrder, couponCodeStatus, coupon]);

  const discount = calculateDiscount(cartView, subtotal);

  const total = subtotal + deliveryCharge - discount;

  const scrollBarContentContainerStyles =
    cartView.restaurant == null ? { flex: 1 } : {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={scrollBarContentContainerStyles}>
        <View style={styles.pageView}>
          <View style={styles.backbuttoncontainer}>
            <View style={styles.headingSection}>
              <IconButton
                icon="chevron-left"
                iconColor="#111719"
                style={styles.backbutton}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View
              style={{
                ...styles.headingSection,
                ...styles.headingTextContainer,
              }}
            >
              <HeadingText col text={`Cart`} weight="500" color="#000" />
            </View>
            <View style={styles.headingSection} />
          </View>
          <ControlledComponent controller={cartView.restaurant == null}>
            <View style={styles.emptySearchResults}>
              <BodyText
                text="No items in the cart yet."
                color="#000"
                weight={"500"}
              />
            </View>
          </ControlledComponent>
          <ControlledComponent controller={cartView.restaurant != null}>
            <View style={styles.timeLocationContainer}>
              <TimeLocation restaurant={restaurant} />
            </View>
            <View style={styles.listContainer}>
              {products.map((item) => {
                return (
                  <ListItem
                    key={item.product_id}
                    item={item}
                    qty={cartQuantity[item.product_id]}
                    onIncrementProductQuantity={onIncrementProductQuantity}
                    onDecrementProductQuantity={onDecrementProductQuantity}
                  />
                );
              })}
            </View>
            <View>
              <Pressable
                onPress={handleRedirectToRestaurantPage}
                style={styles.addmorecontainer}
              >
                <InfoText
                  weight={"500"}
                  color={"#959595"}
                  text={`Add more items`}
                />
                <IconButton
                  mode="outlined"
                  size={12}
                  icon="plus-thick"
                  iconColor="#959595"
                  style={styles.addmorePlusicon}
                />
              </Pressable>
              <BreakDown
                showTotal={selectedAddress != null}
                subTotal={subtotal}
                deliveryCharge={deliveryCharge}
                total={total}
                discount={discount}
              />
              <ControlledComponent
                controller={
                  isCheckoutDisabled === false && isRestroOpen === true
                }
              >
                <View style={styles.couponContainer}>
                  <ControlledComponent
                    controller={couponCodeStatus.success === false}
                  >
                    <View style={styles.couponBoxContainer}>
                      <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={1}
                        onChangeText={(text) => setCoupon(text)}
                        value={coupon}
                        placeholder="Have a coupon code?"
                      />
                      <Pressable
                        onPress={handleApplyCouponCode}
                        style={styles.applyCouponButton}
                      >
                        <NavigationText
                          text={"Apply"}
                          weight={"500"}
                          color="white"
                        />
                      </Pressable>
                    </View>
                  </ControlledComponent>
                  <ControlledComponent
                    controller={
                      couponCodeStatus.fetchState === FETCH_STATES.COMPLETED
                    }
                  >
                    <View style={styles.couponSuccessContainer}>
                      <NavigationText
                        text={couponCodeStatus.message}
                        color={
                          couponCodeStatus.success === true ? "green" : "red"
                        }
                      />
                      <Pressable onPress={handleClearCoupon}>
                        <Entypo
                          name="circle-with-cross"
                          size={24}
                          color={colors.primary}
                        />
                      </Pressable>
                    </View>
                  </ControlledComponent>
                </View>
              </ControlledComponent>
              {selectedAddress != null ? (
                <Pressable
                  onPress={onCheckout}
                  style={styles.selectedAddressContainer}
                >
                  <View style={styles.deliveryAddressText}>
                    <InfoText
                      text={"Deliver to:"}
                      color={"#959595"}
                      weight={"400"}
                    />
                    <NavigationText
                      text={`${selectedAddress.delivery_address}, ${selectedAddress.delivery_landmark}, ${selectedAddress.location.location_name}`}
                      color={theme.colors.black}
                    />
                  </View>
                  <Entypo name="chevron-small-right" size={32} color="#000" />
                </Pressable>
              ) : null}
            </View>
            <Checkbox.Item label="Cash on delivery" status="checked" />
            <Checkout
              navigateToLoginPage={navigateToLoginPage}
              isUserLoggedIn={isUserLoggedIn}
              onCheckout={onCheckout}
              selectedAddress={selectedAddress}
              onPlaceOrder={handlePlaceOrder}
              placeOrderStatus={placeOrderStatus}
              isDisabled={isCheckoutDisabled}
              isRestroOpen={isRestroOpen}
            />
            <ControlledComponent
              controller={isCheckoutDisabled && isRestroOpen === true}
            >
              <View style={styles.disabledCheckoutInfo}>
                <InfoText
                  text={`* Minimum order value should be ₹${areaCheckout}`}
                />
              </View>
            </ControlledComponent>

            <ControlledComponent controller={isRestroOpen === false}>
              <View style={styles.disabledCheckoutInfo}>
                <InfoText text={`* Sorry Restaurant is closed.`} />
              </View>
            </ControlledComponent>

            <View style={styles.importantNoteContainer}>
              <HeadingText
                text="Cancellation Policy"
                color={colors.black}
                weight="600"
              />
              <NavigationText
                text="To help minimize food waste, please avoid canceling your order once it’s placed. A 100% cancellation fee applies, and no refunds are issued for cancellations made after 60 seconds."
                weight={"400"}
                color={colors.black}
              />
            </View>
          </ControlledComponent>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageView: {
    rowGap: 12,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    columnGap: 8,
  },
  quantityContainer: {
    columnGap: 4,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  qtyIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    paddingHorizontal: 8,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "600",
  },
  itemprice: {
    color: "#E4122F",
    fontWeight: "600",
  },

  cartviewcontainer: {
    columnGap: 92,
    flexDirection: "row",
    alignItems: "center",
  },

  textCart: {
    fontWeight: "500",
    fontSize: 18,
  },

  addmorecontainer: {
    borderTopColor: "#E1E1E1",
    borderTopWidth: 1,
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },
  backbuttoncontainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  breakdowncontainer: {
    padding: 16,
    rowGap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  breakdownfields: {
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    flex: 1,
  },

  breakdownvalues: {
    justifyContent: "space-between",
    alignContent: "center",
    rowGap: 12,
  },
  totalvalue: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  totalText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#959595",
  },
  totalvalueText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  Checkoutbutton: {
    paddingVertical: 16,
    borderRadius: 28,
    alignSelf: "center",
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#E4122F",
    backgroundColor: "#E4122F",
    marginTop: 16,
  },
  priceContainer: {
    textAlign: "left",
    width: 40,
  },
  TimeLocation: { paddingHorizontal: 16 },
  timeLocationContainer: {
    paddingHorizontal: 16,
  },
  listContainer: {
    rowGap: 12,
  },
  restaurantNameContainer: {
    columnGap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantImage: {
    borderRadius: 12,
  },

  selectedAddressContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryAddressText: {
    rowGap: 8,
    flex: 1,
  },
  emptySearchResults: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headingSection: {
    flex: 1,
  },
  headingTextContainer: {
    alignItems: "center",
  },
  disabledCheckoutButton: {
    opacity: 0.5,
  },
  disabledCheckoutInfo: {
    alignItems: "center",
  },
  couponContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    rowGap: 4,
  },
  couponBoxContainer: {
    columnGap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 4,
    padding: 16,
    height: 48,
    flex: 1,
  },
  importantNoteContainer: {
    rowGap: 8,
    padding: 16,
    textAlign: "center",
  },
  applyCouponButton: {
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
  },
  couponSuccessContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
});
