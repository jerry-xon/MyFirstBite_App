import { useCallback, useMemo, useState } from "react";
import { Modal, Portal } from "react-native-paper";
import { EvilIcons, FontAwesome6, Feather, Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
  RefreshControl,
  Linking,
} from "react-native";
import { ROUTES } from "../constants/routes";
import ControlledComponent from "../components/common/ControlledComponent";
import {
  BANNER_ASSETS_BASE_URL,
  MENU_ASSETS_BASE_URL,
  VENDOR_ASSETS_BASE_URL,
} from "../constants/urls";
import {
  NavigationText,
  InfoText,
  BodyText,
  HeadingText,
} from "../components/common/Typography";
import { useSelector } from "react-redux";
import { isShopOpen } from "../helpers/utils";
import { colors } from "../theme/colors";
import { FETCH_STATES } from "../redux/constants";
import DeliveryTimer from "../components/DeliveryTimer";


const SearchAndFilter = ({ searchQuery, setSearchQuery }) => {
  // const [openFilter, setOpenFilter] = useState(false);

  // const toggleFilter = () => {
  //   setOpenFilter(!openFilter);
  // };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.SearchInput}>
          <Image
            source={require("../assets/search.png")}
            style={styles.searcchicon}
          />
          <TextInput
            placeholder="Find for food or restaurant..."
            placeholderTextColor="#959595"
            value={searchQuery}
            onChangeText={setSearchQuery}
            fontSize={16}
          ></TextInput>
        </View>
        {/* <Pressable style={styles.filter} onPress={toggleFilter}>
          <Image
            source={require("../assets/filter.png")}
            style={styles.filterlogo}
          />
        </Pressable> */}
      </View>

      {/* {openFilter && <Filter />} */}
    </>
  );
};

// const Offers = () => {
//   return (
//     <View style={styles.offerImagecontainer}>
//       <Image
//         source={require("../assets/discoount.svg")}
//         style={styles.Offerimage}
//       />
//       <View style={styles.offerTextContainer}>
//         <Text style={styles.offerText}>Get</Text>
//         <Text style={styles.offerValueText}>20%</Text>
//         <Text style={styles.offerText}>off</Text>
//       </View>
//     </View>
//   );
// };

const WhatOnMind = ({ menuList, setSelectedMenu }) => {
  return (
    <View>
      <View style={styles.OfferForyouContainer}>
        <BodyText
          text={`WHAT'S ON YOUR MIND?`}
          weight="600"
          color="#000000"
          style={styles.OFYtext}
        />

        <Image
          source={require("../assets/Line 89.png")}
          style={styles.WYMlines}
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        <View style={styles.listOfMenu}>
          {menuList.map((menu) => {
            return (
              <Pressable
                key={menu.menu_id}
                style={styles.WYMitem}
                onPress={() => setSelectedMenu(menu)}
              >
                <Image
                  source={{
                    uri: `${MENU_ASSETS_BASE_URL}/${menu.menu_image}.webp`,
                  }}
                  style={styles.ItemImage}
                />
                <InfoText
                  text={menu.menu_name}
                  weight="500"
                  color={"#404040"}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const DottedLine = () => {
  return <View style={styles.dottedLine} />;
};

const RestaurantForYou = ({
  restaurantsList,
  selectedMenu,
  setSelectedMenu,
}) => {
  const navigation = useNavigation();

  const handleMenuClear = useCallback(() => {
    setSelectedMenu(null);
  }, []);

  const filteredRestaurantsList = useMemo(() => {
    if (selectedMenu == null) {
      return restaurantsList;
    }
    const businessIds = selectedMenu.business_names.map(
      (business) => business.business_id
    );
    return restaurantsList.filter((restaurant) =>
      businessIds.includes(restaurant.business_id)
    );
  }, [selectedMenu, restaurantsList]);

  return (
    <View>
      <View style={styles.RestroForyouContainer}>
        <ControlledComponent controller={selectedMenu == null}>
          <BodyText
            text={`RESTAURANTS FOR YOU`}
            weight="600"
            color="#000000"
            style={styles.OFYtext}
          />
          <Image
            source={require("../assets/Line 89.png")}
            style={styles.WYMlines}
          />
        </ControlledComponent>
        {selectedMenu != null ? (
          <View style={styles.filteredMenuTitle}>
            <BodyText
              text={`Restaurants Selling ${selectedMenu.menu_name}`}
              weight="600"
              color="#000000"
              style={styles.OFYtext}
            />
            <Pressable onPress={handleMenuClear}>
              <Entypo
                name="circle-with-cross"
                size={24}
                color={colors.primary}
              />
            </Pressable>
          </View>
        ) : null}
      </View>

      {filteredRestaurantsList.map((restaurant) => {
        const restroOpen = isShopOpen(restaurant);
        return (
          <Pressable
            style={
              restroOpen
                ? { ...styles.RestroCardView }
                : { ...styles.RestroCardView, ...styles.closedRestroCard }
            }
            onPress={() => {
              if (restroOpen) {
                navigation.navigate(ROUTES.RESTRO_MENU, {
                  restaurantId: restaurant.user_id,
                });
              }
            }}
            key={restaurant.user_id}
          >
            <View>
              <View
                style={
                  restroOpen
                    ? { ...styles.restrodisplayCard }
                    : {
                        ...styles.restrodisplayCard,
                        ...styles.disabledRestroDisplayCard,
                      }
                }
              >
                <View>
                  <Image
                    source={{
                      uri: `${VENDOR_ASSETS_BASE_URL}/${restaurant.user.user_image}.webp`,
                    }}
                    style={styles.RestroImageForCard}
                  />
                  <View style={styles.pureVEGContainer}>
                    <Image source={require("../assets/Veg.png")} />
                    <InfoText text={` 100% VEG`} weight="600" color="#168D67" />
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardPrimaryInfo}>
                    <View style={styles.restaurantNameContainer}>
                      <HeadingText
                        text={restaurant.business_name}
                        color="#000000"
                        weight="600"
                      />

                      {/* <FontAwesome
                        name="check-circle"
                        size={16}
                        color="#029094"
                      /> */}
                    </View>
                    <View style={styles.suggestionContainer}>
                      {restaurant.menus.slice(0, 5).map((menu) => (
                        <View style={styles.suggestion} key={menu.menu_id}>
                          <View style={styles.suggestionText}>
                            <NavigationText
                              text={menu.menu_name}
                              weight="400"
                              color="#959595"
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  <DottedLine />
                  <View style={styles.deliveryAndTimeContainer}>
                    <ControlledComponent controller={restroOpen === true}>
                      <Image source={require("../assets/time.png")} />
                      <NavigationText
                        text="25-30 mins for delivery"
                        color="#959595"
                        weight={"500"}
                      />
                    </ControlledComponent>
                    <ControlledComponent controller={restroOpen === false}>
                      <View style={styles.closedInfoContainer}>
                        <InfoText
                          text="Closed now"
                          color={colors.white}
                          weight={"500"}
                        />
                      </View>
                    </ControlledComponent>
                  </View>

                  {/* <DottedLine /> */}
                  {/* <View style={styles.DashedLine}>
                <DashedLine
                  dashLength={2}
                  dashThickness={2}
                  dashGap={4}
                  dashColor="#E2E2E2"
                />
              </View> */}
                  <ControlledComponent
                    controller={restaurant.business_offer_text}
                  >
                    <DottedLine />
                    <View style={styles.discounted}>
                      <Image source={require("../assets/discount.svg")} />
                      <NavigationText
                        text={restaurant.business_offer_text}
                        weight="600"
                        color="#2260D1"
                      />
                    </View>
                  </ControlledComponent>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const Footer = () => {
  return (
    <View>
      <Image
        source={require("../assets/footerBG.png")}
        style={styles.footerBGImage}
      />
      <View style={styles.footerText}>
        <Image source={require("../assets/#myFirstBite.png")} />
        <Image source={require("../assets/🇮🇳 Made for India.png")} />
        <Image source={require("../assets/❤ Crafted in Nimbahera.png")} />
      </View>
    </View>
  );
};

const Cart = ({ noOfItemsInTheCart, onNavigateToCartPage, onClearCart }) => {
  return (
    <View style={styles.CartContaienr}>
      <View style={styles.ViewCartandItem}>
        <View style={styles.nameContainer}>
          <InfoText
            text={`${noOfItemsInTheCart} ${
              noOfItemsInTheCart === 1 ? "item" : "items"
            } waiting in the cart`}
            weight="500"
            color="#FFFFFF"
          />

          <View style={styles.ViewAndDelete}>
            <Pressable
              onPress={onNavigateToCartPage}
              style={styles.ViewCartButton}
            >
              <InfoText text={`View Cart`} weight="500" color="#E4122F" />
            </Pressable>

            <Pressable onPress={onClearCart} style={styles.deleteItemButton}>
              <Feather name="trash-2" size={20} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

// const Filter = () => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const data = [
//     { id: "1", label: "Restaurant" },
//     { id: "2", label: "Sweets" },
//     { id: "3", label: "Cafe" },
//     { id: "4", label: "Bakery" },
//   ];
//   const handleCheckboxPress = (item) => {
//     setSelectedItems((prev) => {
//       if (prev.includes(item.id)) {
//         return prev.filter((id) => id !== item.id);
//       } else {
//         return [...prev, item.id];
//       }
//     });
//   };

//   return (
//     <View style={styles.filterArea}>
//       <View style={styles.line} />
//       <View style={styles.sortbycontainer}>
//         <LargeText text={`Sort By`} weight="600" color="#000000" />
//       </View>
//       <View style={styles.optionListContainer}>
//         {data.map((item) => (
//           <View key={item.id} style={styles.optinsButtonContainer}>
//             <BodyText text={item.label} weight="700" color="#000000" />
//             <Checkbox
//               status={selectedItems.includes(item.id) ? "checked" : "unchecked"}
//               onPress={() => handleCheckboxPress(item)}
//             />
//           </View>
//         ))}
//       </View>
//       <View style={styles.clearApplyButtonContainer}>
//         <Pressable
//           style={styles.clearbutton}
//           onPress={() => setOpenFilter(false)}
//         >
//           <NavigationText text={`Clear All`} weight="500" color="#E4122F" />
//         </Pressable>
//         <Pressable style={styles.applyButton}>
//           <BodyText text={`Apply`} weight="600" color="#FFFFFF" />
//         </Pressable>
//       </View>
//     </View>
//   );
// };

const Head = ({ selectedAddress }) => {
  const authState = useSelector((state) => state.authState);
  const navigation = useNavigation();
  const handleNavigationToAddressPage = () => {
    navigation.navigate(ROUTES.SELECT_ADDRESS, {
      redirectFrom: ROUTES.HOME,
    });
  };
  return (
    <View style={styles.headContainer}>
      <View>
        <Pressable
          style={styles.yourLocationContainer}
          onPress={() =>
            authState.isUserAuthenticated === true
              ? handleNavigationToAddressPage()
              : navigation.navigate(ROUTES.LOGIN)
          }
        >
          <View>
            <FontAwesome6 name="location-dot" size={24} color="#E4122F" />
          </View>
          <View>
            <View style={styles.HomeandDownIcon}>
              <NavigationText text={`Home`} color="#333333" weight="700" />
              <EvilIcons name="chevron-down" size={24} color="black" />
            </View>
            <InfoText
              text={
                authState.isUserAuthenticated === true &&
                selectedAddress != null
                  ? selectedAddress.location.location_name
                  : `Select Address`
              }
              color="#959595"
              weight="500"
            />
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() =>
            authState.isUserAuthenticated === true
              ? navigation.navigate(ROUTES.PROFILE)
              : navigation.navigate(ROUTES.LOGIN)
          }
        >
          <Image
            source={require("../assets/avtar.png")}
            style={styles.avatar}
          />
        </Pressable>
      </View>
    </View>
  );
};

// const OffersForyou = () => {
//   return (
//     <View style={styles.offerforyougapping}>
//       <View style={styles.OfferForyouContainer}>
//         <Text style={styles.OFYtext}>OFFERS FOR YOU</Text>
//         <Image source={require("../assets/Line 89.svg")} style={styles.lines} />
//       </View>
//       <ScrollView
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         style={styles.horizontalScroll}
//       >
//         <View style={styles.listofRestro}>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/JimmyJhonBG.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>Jimmy John’s </Text>
//             </View>
//           </Pressable>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/SocialdiariesBG.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>Social Diaries</Text>
//             </View>
//           </Pressable>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/potbiryaniBG.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>Pot Biryani </Text>
//             </View>
//           </Pressable>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/NBC.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>NBC</Text>
//             </View>
//           </Pressable>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/JimmyJhonBG.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>Jimmy John’s </Text>
//             </View>
//           </Pressable>
//           <Pressable onPress={() => console.log("pressed")}>
//             <Image
//               source={require("../assets/SocialdiariesBG.svg")}
//               style={styles.RestroOfferImage}
//             />
//             <View style={styles.innerShadow} />
//             <View style={styles.RestroOfferTextContainer}>
//               <Text style={styles.RestroOffervalueText}>50% off</Text>
//               <Text style={styles.uptoText}>Upto ₹ 100</Text>
//             </View>
//             <View>
//               <Text style={styles.NameOfRestro}>Social Diaries</Text>
//             </View>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

const CustomCarousel = ({ data }) => {
  return (
    <View style={styles.adSliderContainer}>
      <Swiper
        style={styles.wrapper}
        autoplay
        showsButtons={false}
        autoplayTimeout={3}
        loop
      >
        {data.map((item) => {
          const openLink = () => {
            const url = item.banner_href;
            Linking.openURL(url).catch((err) =>
              console.error("Failed to open URL:", err)
            );
          };
          return (
            <Pressable
              onPress={openLink}
              key={item.banner_id}
              style={styles.adSlide}
            >
              <Image
                style={styles.carouselImage}
                source={{
                  uri: `${BANNER_ASSETS_BASE_URL}/${item.banner_path}.webp`,
                }}
              />
            </Pressable>
          );
        })}
      </Swiper>
    </View>
  );
};

export default function Home({
  restaurantsList,
  selectedAddress,
  noOfItemsInTheCart,
  fetchState,
  onNavigateToCartPage,
  onRefresh,
  onClearCart,
  activeOrder,
  menuList,
  bannerList,
  activeOrderRider,
  showUserNameModal,
  onUserNameSave,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userNameText, setUserNameText] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const filteredRestaurantsList = restaurantsList.filter((r) =>
    r.business_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        setSearchQuery("");
        setSelectedMenu(null);
      };
      return () => unsubscribe();
    }, [])
  );

  const handleUserNameSave = useCallback(() => {
    if (userNameText.trim().length > 0) {
      onUserNameSave(userNameText);
    }
  }, [userNameText, onUserNameSave]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={fetchState === FETCH_STATES.IN_PROGRESS}
              onRefresh={onRefresh}
            />
          }
        >
          <Head selectedAddress={selectedAddress} />
          {/* <ImageCarousel /> */}
          <CustomCarousel data={bannerList} />
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* <Offers /> */}
          {/* <OffersForyou /> */}
          <WhatOnMind menuList={menuList} setSelectedMenu={setSelectedMenu} />
          {/* <ImageCarousel /> */}
          <RestaurantForYou
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            restaurantsList={filteredRestaurantsList}
          />
          <Footer />
          {/* this is just to add height */}
          {/* <View style={{ backgroundColor: "#FFFFFF", height: 2060 }} /> */}
        </ScrollView>
        {/* <Filter /> */}
        <ControlledComponent controller={noOfItemsInTheCart > 0}>
          <Cart
            onNavigateToCartPage={onNavigateToCartPage}
            noOfItemsInTheCart={noOfItemsInTheCart}
            onClearCart={onClearCart}
          />
        </ControlledComponent>
        <ControlledComponent
          controller={
            activeOrder != null &&
            activeOrder.rider_id !== 1 &&
            activeOrderRider != null
          }
        >
          <DeliveryTimer
            activeOrder={activeOrder}
            activeOrderRider={activeOrderRider}
          />
        </ControlledComponent>
      </SafeAreaView>
      <Portal>
        <Modal onDismiss={() => null} visible={showUserNameModal}>
          <View style={styles.modal}>
            <View style={styles.inputContainer}>
              <BodyText
                text={`Please enter your name`}
                weight="400"
                color="#9796A1"
              />
              <TextInput
                placeholderTextColor="#000000"
                style={styles.AddressdetailInput}
                value={userNameText}
                onChangeText={setUserNameText}
              />
              <View style={styles.Savebuttoncontainer}>
                <Pressable
                  onPress={handleUserNameSave}
                  style={styles.Savebutton}
                >
                  <InfoText text={`Save`} weight="500" color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  yourLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  HomeandDownIcon: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 16,
    flexDirection: "row",
    columnGap: 4,
  },
  SearchInput: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EFEFEF",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    columnGap: 8,
    flex: 1,
  },
  line: {
    height: 4,
    width: 80,
    borderRadius: 12,
    top: 12,
    alignSelf: "center",
    backgroundColor: "#BABABA",
  },
  sortbycontainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  optinsButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  optionListContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  clearApplyButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 24,
  },
  clearbutton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#E4122F",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    paddingHorizontal: 60,
  },
  offerImagecontainer: {
    height: "8%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  Offerimage: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
  },
  // offerTextContainer: {
  //   width: "40%",
  //   backgroundColor: "#E3711ECC",
  //   height: "100%",
  //   position: "absolute",
  //   top: 8,
  //   left: 16,
  //   borderTopLeftRadius: 12,
  //   borderBottomLeftRadius: 12,
  //   paddingTop: 12,
  // },
  offerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    paddingHorizontal: 12,
  },
  offerValueText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFFFFF",
    paddingHorizontal: 12,
  },
  avatar: {
    borderRadius: 24,
    height: 48,
    width: 48,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },
  filter: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterlogo: {
    height: 20,
    width: 20,
  },
  filterArea: {
    position: "absolute",
    // bottom: -500,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 400,
    width: "100%",
    elevation: 5,
    shadowOpacity: 0.5,
  },
  lines: {
    alignSelf: "center",
  },
  WYMlines: {
    alignSelf: "center",
    width: "44%",
  },
  OFYtext: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  OfferForyouContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    columnGap: 12,
    alignItems: "center",
  },
  RestroOfferImage: { height: 124, width: 100, borderRadius: 12 },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    width: 100,
    height: 124,
  },

  RestroOfferTextContainer: { position: "absolute", left: 8, top: 68 },
  RestroOffervalueText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  uptoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  NameOfRestro: {
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
  },
  horizontalScroll: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  WYMitem: {
    alignItems: "center",
    rowGap: 4,
  },
  ItemImage: {
    height: 90,
    width: 90,
    resizeMode: "stretch",
  },
  offerforyougapping: { paddingVertical: 12 },
  listofRestro: { flexDirection: "row", columnGap: 12 },
  listOfMenu: { flexDirection: "row", columnGap: 16 },
  RestroForyouContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
    columnGap: 12,
  },
  restrodisplayCard:
    Platform.OS === "ios"
      ? {
          borderRadius: 20,
          elevation: 12,
          borderWidth: 1,
          borderColor: "#D5D6DA",
          shadowOpacity: 0.4,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
        }
      : {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#D5D6DA",
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          elevation: 12,
        },

  RestroImageForCard: {
    height: 164,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "stretch",
  },
  pureVEGContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  suggestion: {
    backgroundColor: "#F5F6FB",
    borderRadius: 8,
  },
  suggestionText: {
    padding: 8,
  },
  suggestionContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  DashedLine: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  deliveryAndTimeContainer: {
    flexDirection: "row",
    columnGap: 8,
    paddingHorizontal: 16,
  },
  Text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#959595",
  },
  discounted: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    paddingHorizontal: 16,
  },

  RestroCardView: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderBottomColor: "#E2E2E2",
  },
  closedRestroCard: {
    opacity: 0.5,
  },
  footerBGImage: { width: "100%" },
  footerText: {
    position: "absolute",
    paddingHorizontal: 16,
    top: 100,
    rowGap: 8,
  },
  CartContaienr: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 8,
    shadowOpacity: 0.5,
  },
  ViewCartandItem: {
    backgroundColor: "#E4122F",
    borderRadius: 12,
    width: "100%",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  ViewAndDelete: { flexDirection: "row", columnGap: 8 },
  ViewCartButton: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  deleteItemButton: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  slide: {
    paddingHorizontal: 16,
    height: "36%",
  },
  title: {},
  flatListContainer: {
    paddingHorizontal: 16,
  },
  carouselItem: {
    width: Dimensions.get("window").width,
    // Customize item styling as needed
  },
  carouselImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    resizeMode: "cover",
    objectFit: "fill",
  },
  searcchicon: {
    height: 16,
    width: 16,
  },
  restaurantNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 4,
    flex: 1,
  },
  cardContent: {
    paddingVertical: 12,
    rowGap: 12,
  },
  dottedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    width: "100%",
    height: 1,
  },

  disabledRestroDisplayCard: {
    elevation: 0,
  },
  cardPrimaryInfo: {
    paddingHorizontal: 16,
    rowGap: 12,
  },

  closedInfoContainer: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 8,
  },

  filteredMenuTitle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  adSlide: {
    justifyContent: "center",
    alignItems: "center",
  },
  adSliderContainer: {
    height: 150,
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowOpacity: 0.4,
    elevation: 12,
    alignSelf: "center",
    rowGap: 12,
    width: Dimensions.get("window").width - 32,
    borderRadius: 16,
  },
  AddressdetailInput: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    padding: 16,
  },
  inputContainer: {
    rowGap: 8,
  },
  Savebuttoncontainer: {
    alignSelf: "center",
  },
  Savebutton: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 16,
    paddingHorizontal: 64,
    marginTop: 16,
    borderColor: "#E4122F",
    backgroundColor: "#E4122F",
  },
});
