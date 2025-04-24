import React, { useCallback, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { IconButton, Modal, Portal, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ROUTES } from "../constants/routes";
import { ASSETS_BASE_URL } from "../constants/urls";
import ControlledComponent from "../components/common/ControlledComponent";
import {
  BodyText,
  HeadingText,
  InfoText,
  NavigationText,
  UserNameText,
  CommentText,
} from "../components/common/Typography";
import { colors } from "../theme/colors";
import { FETCH_STATES } from "../redux/constants";

const Head = ({ restaurantName, openTime, closeTime }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.backbuttonContainer}>
      <IconButton
        icon="chevron-left"
        iconColor="#111719"
        size={28}
        style={styles.backbutton}
        onPress={() => navigation.navigate(ROUTES.HOME)}
      />
      <View
        style={styles.titleAndTimeContainer}
      >
        <View style={styles.RestroNameContainer}>
          <CommentText
            numberOfLines={1}
            text={restaurantName}
            weight={"700"}
            color={"#000000"}
          />
        </View>
        <View style={styles.timecontainer}>
          <View>
            <BodyText text={`Timings: `} weight={"400"} color={"#959595"} />
          </View>
          <View style={styles.timeinfobox}>
            <InfoText
              text={`${openTime} am - ${closeTime} pm`}
              color={"#FFFFFF"}
              weight={"600"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const AddedToCart = ({ cartQuantity }) => {
  const navigation = useNavigation();
  const numOfItems = Object.keys(cartQuantity).length;

  const handleNavigateToCartPage = () => {
    navigation.navigate(ROUTES.CART);
  };

  return (
    <View style={styles.ItemAddedArea}>
      <Pressable onPress={handleNavigateToCartPage} style={styles.CartView}>
        <BodyText
          text={`${Object.keys(cartQuantity).length} ${
            numOfItems > 1 ? "items" : "item"
          }${" "}added`}
          weight={"500"}
          color={"#FFFFFF"}
        />

        <View style={styles.TextViewCart}>
          <BodyText text={`View Cart`} weight={"500"} color={`#FFFFFF`} />
          <Entypo name="chevron-small-right" size={20} color="#FFFFFF" />
        </View>
      </Pressable>
    </View>
  );
};

const SearchItem = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchitemcontainer}>
      <Searchbar
        placeholder="Search for dishes"
        style={styles.seachitembar}
        mode="bar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

const ListOfCategories = ({
  menu,
  onAddProductToCart,
  cartQuantity,
  onIncrementProductQuantity,
  onDecrementProductQuantity,
  sectionRefs,
}) => {
  const [closedCategories, setClosedCategories] = useState([]);

  const handleCategoryOpenStateToggle = (menuId) => {
    setClosedCategories((curr) => {
      if (curr.includes(menuId)) {
        return curr.filter((c) => c !== menuId);
      }
      return [...curr, menuId];
    });
  };
  return (
    <View style={styles.ListContainer}>
      {menu.map((menu) => (
        <View
          key={menu.menu_id}
          ref={(el) => (sectionRefs.current[menu.menu_id] = el)}
        >
          <Pressable
            onPress={() => handleCategoryOpenStateToggle(menu.menu_id)}
          >
            <View style={styles.RecommendedItems}>
              <UserNameText
                text={menu.menu_name}
                weight={"600"}
                color={`#000000`}
                style={styles.RecommendedItemsText}
              />
              <AntDesign
                name={
                  closedCategories.includes(menu.menu_id) === false
                    ? "down"
                    : "right"
                }
                size={24}
                color="black"
              />
            </View>
          </Pressable>
          {closedCategories.includes(menu.menu_id) === false &&
            menu.products.map((dish) => (
              <View style={styles.itemcontainer} key={dish.product_id}>
                <View style={styles.dishNameandpricecontainer}>
                  <View style={styles.FoodItems}>
                    <Image source={require("../assets/Veg.png")} />
                    <BodyText
                      text={dish.product_name}
                      weight={"600"}
                      color={"#787878"}
                    />
                    <NavigationText
                      text={` ₹ ${dish.product_mrp}`}
                      weight={"600"}
                      color={"#787878"}
                    />
                  </View>
                </View>

                <View style={styles.imagecontainer}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: `${ASSETS_BASE_URL}/${dish.product_image}.webp`,
                    }}
                  />
                  <ControlledComponent
                    controller={Boolean(cartQuantity[dish.product_id])}
                  >
                    <View style={styles.relativecontainerforaddbutton}>
                      <Pressable style={styles.additemButton}>
                        <Pressable
                          onPress={() => onDecrementProductQuantity(dish)}
                        >
                          <Entypo name="minus" size={16} color="red" />
                        </Pressable>

                        <BodyText
                          text={cartQuantity[dish.product_id]}
                        ></BodyText>

                        <Pressable
                          onPress={() => onIncrementProductQuantity(dish)}
                        >
                          <Entypo name="plus" size={16} color="red" />
                        </Pressable>
                      </Pressable>
                    </View>
                  </ControlledComponent>
                  <ControlledComponent
                    controller={
                      Boolean(cartQuantity[dish.product_id]) === false
                    }
                  >
                    <View style={styles.relativecontainerforaddbutton}>
                      <Pressable
                        style={styles.addButtoncontainer}
                        onPress={() => onAddProductToCart(dish)}
                      >
                        <Entypo name="plus" size={24} color="red" />
                      </Pressable>
                    </View>
                  </ControlledComponent>
                </View>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

const Footer = ({ restaurant, areItemsAddedToCart }) => {
  return (
    <View
      style={{
        ...styles.footer,
        ...{ marginBottom: areItemsAddedToCart ? 100 : 0 },
      }}
    >
      <ControlledComponent controller={restaurant.business_fssai}>
        <Image
          source={require("../assets/fssai.png")}
          style={styles.footerBGImage}
        />
        <NavigationText
          text={`Lic. No. ${restaurant.business_fssai}`}
          color="#959595"
          weight={"600"}
        />
      </ControlledComponent>
      <View style={styles.importantNoteContainer}>
        <HeadingText
          text="Important Notes:"
          color={colors.black}
          weight="600"
        />
        <NavigationText
          text={`${"\u25CF"} Prices are determined by the restaurant.`}
          weight={"400"}
          color={colors.black}
        />
        <NavigationText
          text={`${"\u25CF"} Nutritional information provided is a general guide based on each serving as reported by the restaurant and may differ based on ingredients and portion sizes.`}
          weight={"400"}
          color={colors.black}
        />
        <NavigationText
          text={`${"\u25CF"} While an average active adult typically needs around 2,000 kcal per day, individual calorie requirements can vary.`}
          weight={"400"}
          color={colors.black}
        />
        <NavigationText
          text={`${"\u25CF"} Dish details might be specially crafted to enhance your experience.`}
          weight={"400"}
          color={colors.black}
        />
      </View>
    </View>
  );
};

const CategorySlider = ({
  menu,
  setSelectedItem,
  selectedItem,
  handleCategoryPress,
}) => {
  return (
    <View style={styles.CategorySliderContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {menu.map((menu) => (
            <Pressable
              key={menu.menu_id}
              style={
                selectedItem === menu.menu_id
                  ? styles.SelectedCategoryButton
                  : styles.NotSelectedCategoryButton
              }
              onPress={() => {
                setSelectedItem(menu.menu_id);
                handleCategoryPress(menu.menu_id);
              }}
            >
              <NavigationText
                text={menu.menu_name}
                color={selectedItem === menu.menu_id ? colors.white : "#767676"}
                weight={"400"}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default function RestroMenu({
  menuView,
  onClearCart,
  onAddProductToCart,
  fetchState,
  onRefresh,
  onIncrementProductQuantity,
  onDecrementProductQuantity,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = [];

  menuView.menu.forEach((menu) => {
    const products = menu.products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (products.length) {
      filteredMenu.push({
        ...menu,
        products,
      });
    }
  });

  const handleAddProductToCart = useCallback(
    (product) => {
      if (
        menuView.currentCartRestaurantId === menuView.restaurant.user_id ||
        menuView.currentCartRestaurantId == null
      ) {
        onAddProductToCart(product);
      } else {
        setModalVisible(true);
      }
    },
    [menuView.currentCartRestaurantId, menuView.restaurant.business_id]
  );

  const handleClearCart = () => {
    setModalVisible(false);
    onClearCart();
  };

  const areItemsAddedToCart = Object.keys(menuView.cartQuantity).length > 0;

  const [selectedItem, setSelectedItem] = useState(menuView.menu[0].menu_id);

  const handleCategoryPress = (selectedMenuId) => {
    const node = sectionRefs.current[selectedMenuId];
    if (node && scrollViewRef.current) {
      node.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        },
        (error) => {
          console.log("Measure error:", error);
        }
      );
    }
  };
  const sectionRefs = useRef({});
  const scrollViewRef = useRef(null);

  return (
    <>
      <SafeAreaView style={styles.screenBG}>
        <Head
          restaurantName={menuView.restaurant.business_name}
          openTime={menuView.restaurant.business_open}
          closeTime={menuView.restaurant.business_close}
        />
        <SearchItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategorySlider
          menu={filteredMenu}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          handleCategoryPress={handleCategoryPress}
        />

        <ScrollView
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl
              refreshing={fetchState === FETCH_STATES.IN_PROGRESS}
              onRefresh={onRefresh}
            />
          }
        >
          <ControlledComponent controller={filteredMenu.length === 0}>
            <View style={styles.emptySearchResults}>
              <BodyText
                color="#000"
                text={"No items match your search"}
                weight={"400"}
              />
            </View>
          </ControlledComponent>

          <ControlledComponent controller={filteredMenu.length > 0}>
            <ListOfCategories
              menu={filteredMenu}
              onAddProductToCart={handleAddProductToCart}
              cartQuantity={menuView.cartQuantity}
              onIncrementProductQuantity={onIncrementProductQuantity}
              onDecrementProductQuantity={onDecrementProductQuantity}
              sectionRefs={sectionRefs}
            />
          </ControlledComponent>

          <Footer
            areItemsAddedToCart={areItemsAddedToCart}
            restaurant={menuView.restaurant}
          />
        </ScrollView>
        <ControlledComponent controller={areItemsAddedToCart}>
          <AddedToCart cartQuantity={menuView.cartQuantity} />
        </ControlledComponent>
      </SafeAreaView>
      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={{
            backgroundColor: colors.white,
            paddingBottom: 16,
            rowGap: 16,
          }}
          style={{ paddingHorizontal: 16 }}
          onDismiss={() => setModalVisible(false)}
        >
          <View style={styles.warningSection}>
            <HeadingText text="Warning!!" color={colors.white} weight={"600"} />
          </View>
          <View style={styles.warningText}>
            <InfoText
              color="#959595"
              weight={"500"}
              text="You have added products from different restaurant/cafe in your cart. Now you can not add products from this restaurant/cafe. If you want to add products from this restaurant/cafe then please empty your cart first"
            />
          </View>
          <View style={styles.warningActionsContainer}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <BodyText text="Cancel" color={colors.white} weight={"600"} />
            </Pressable>
            <Pressable onPress={handleClearCart} style={styles.clearCartButton}>
              <BodyText text="Clear Cart" color={colors.white} weight={"600"} />
            </Pressable>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  screenBG: { flex: 1, backgroundColor: "white" },
  backbuttonContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    columnGap: 8,
    alignItems: "flex-start",
  },
  backbutton: {
    borderRadius: 8,
    backgroundColor: "#F5F6FB",
  },

  restroName: {
    paddingTop: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  restroAddess: {
    fontSize: 16,
    color: "#959595",
    fontWeight: "400",
    padding: 4,
    paddingVertical: 4,
  },
  timecontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  timeinfobox: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#71B51C",
    borderColor: "#71B51C",
  },
  OrderTypeButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#959595",
    paddingHorizontal: 72,
    alignSelf: "center",
    justifyContent: "space-between",
    columnGap: 28,
  },
  deliveryradiobuttoncontainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 8,
  },
  takeawayradiobuttoncontainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 8,
  },
  deliveryRBtext: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
  },
  takeawayRBtext: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
  },
  searchitemcontainer: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 8,
  },
  seachitembar: {
    borderRadius: 12,
    backgroundColor: "#F6F6F6",
    color: "#959595",
    fontWeight: "400",
  },
  RecommendedItems: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  RecommendedItemsText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  bestSeller: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E4122F",
    paddingHorizontal: 16,
  },
  FoodItems: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    rowGap: 8,
  },
  ListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    position: "relative",
  },
  itemcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  productImage: {
    width: 116,
    height: 116,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  imagecontainer: {
    paddingHorizontal: 16,
  },
  discountcontainer: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#2260D1",
    borderColor: "#2260D1",
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  discriptioncontainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  addButtoncontainer: {
    position: "absolute",
    bottom: -16,
    right: 4,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.4,
    borderRadius: 40,
    padding: 8,
    elevation: 12,
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
  offerTextContainer: {
    width: "40%",
    backgroundColor: "#E3711ECC",
    height: "100%",
    position: "absolute",
    top: 8,
    left: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingTop: 12,
  },
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
  RestroNameContainer: {
    maxWidth: "90%",
    paddingTop: 14, // half the size of the icon button
  },
  additemButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: -12,
    right: 4,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.4,
    borderRadius: 40,
    padding: 12,
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 8,
    elevation: 12,
  },
  fullHalfModal: {
    backgroundColor: "#FFFFFF",
    height: 360,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 5,
    shadowOpacity: 0.4,
  },
  itemNameImage: {
    padding: 16,
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  FullHalfImage: { height: 60, width: 60, borderRadius: 12 },
  FullHalfText: { fontSize: 24, fontWeight: "600" },
  quantityContainerforFULLHALF: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  HFQuantity: { fontWeight: "600", fontSize: 20 },
  requiredText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#797979",
    paddingVertical: 4,
  },
  Quantity: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  ChooseHF: {
    paddingTop: 12,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  priceRadioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    columnGap: 4,
  },
  PriceQuantityContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
  PlusMinusbutton: { flexDirection: "row", alignItems: "center", padding: 12 },
  additemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  additemButtonHFcontainer: { paddingHorizontal: 16, paddingTop: 8 },
  HFadditembutton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: "#E4122F",
    borderRadius: 12,
  },
  ItemAddedArea: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 88,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 8,
    shadowOpacity: 0.5,
  },
  CartView: {
    backgroundColor: "#E4122F",
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  TextViewCart: {
    flexDirection: "row",
    columnGap: 4,
    alignItems: "center",
  },
  footerBGImage: { width: 64, height: 32, objectFit: "fill" },
  dishNameandpricecontainer: { maxWidth: "50%" },
  relativecontainerforaddbutton: { position: "relative", left: 16 },
  emptySearchResults: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },

  footer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    rowGap: 8,
  },

  warningSection: {
    padding: 16,
    backgroundColor: colors.primary,
  },

  warningText: {
    paddingHorizontal: 16,
  },

  warningActionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 8,
    paddingHorizontal: 16,
  },

  cancelButton: {
    padding: 8,
    backgroundColor: "#959595",
    borderRadius: 8,
  },

  clearCartButton: {
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },

  importantNoteContainer: {
    rowGap: 16,
  },
  CategorySliderContainer: {
    backgroundColor: "#F6F6F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "#EFEFEF",
    borderWidth: 1,
  },
  SelectedCategoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#E4122F",
    borderRadius: 6,
  },
  NotSelectedCategoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  titleAndTimeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 8,
  },
});
