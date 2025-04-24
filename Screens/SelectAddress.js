import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Button, IconButton, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import {
  BodyText,
  HeadingText,
  InfoText,
  NavigationText,
} from "../components/common/Typography";
import ControlledComponent from "../components/common/ControlledComponent";
import { theme } from "../theme";

const AddressCompnent = ({ addresses, selected, setSelected, onDelete }) => {
  const route = useRoute();

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      {addresses.map((item) => (
        <View
          key={item.delivery_id}
          style={[
            styles.addressContainer,
            item.selected && styles.selectedAddress,
          ]}
        >
          <List.Item
            style={{
              backgroundColor:
                selected === item.delivery_id
                  ? theme.colors.primary
                  : theme.colors.white,
            }}
            title={item.delivery_address}
            description={item.delivery_landmark}
            left={() => {
              return selected === item.delivery_id ? (
                <View style={styles.locationIcon}>
                  <Ionicons name="location-outline" size={24} color="white" />
                </View>
              ) : (
                <View style={styles.locationIcon}>
                  <Ionicons name="location-outline" size={24} color="black" />
                </View>
              );
            }}
            right={() => {
              if (route.params?.redirectFrom === ROUTES.CART) {
                return null;
              }
              return (
                <View style={styles.iconContainer}>
                  <Button onPress={() => onDelete(item.delivery_id)}>
                    {selected === item.delivery_id ? (
                      <Feather name="trash-2" size={20} color="white" />
                    ) : (
                      <Feather name="trash-2" size={20} color="black" />
                    )}
                  </Button>
                </View>
              );
            }}
            onPress={() => handleSelect(item.delivery_id)}
            titleStyle={
              selected === item.delivery_id
                ? styles.selectedTitle
                : styles.title
            }
            descriptionStyle={
              selected === item.delivery_id
                ? styles.selectedDescription
                : styles.description
            }
          />
        </View>
      ))}
    </>
  );
};

export default function SelectAddress({
  addressList,
  selectedAddress,
  showSelectButton,
  onAddAddress,
  onSelect,
  onDelete,
}) {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const handleSelect = () => {
    onSelect(selected);
  };

  useEffect(() => {
    if (selectedAddress == null) {
      setSelected(addressList[0]?.delivery_id);
    } else {
      setSelected(selectedAddress);
    }
  }, [addressList, selectedAddress]);

  const scrollBarContentContainerStyles =
    addressList.length > 0 ? {} : { flex: 1 };

  return (
    <SafeAreaView style={styles.screenBG}>
      <ScrollView contentContainerStyle={scrollBarContentContainerStyles}>
        <View style={styles.pageContainer}>
          <View style={styles.backbuttonAndAddressescontainer}>
            <View style={styles.headingSection}>
              <IconButton
                icon="chevron-left"
                iconColor="#111719"
                size={28}
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
              <HeadingText text={`Addresses`} weight={"500"} color="#000" />
            </View>
            <View style={styles.headingSection} />
          </View>
          <View style={styles.container}>
            <ControlledComponent controller={addressList.length > 0}>
              <View style={styles.savedAddressContainer}>
                <NavigationText
                  text={`Saved Addresses`}
                  weight="600"
                  color={"#000000"}
                />
                <AddressCompnent
                  selected={selected}
                  setSelected={setSelected}
                  addresses={addressList}
                  onDelete={onDelete}
                />
              </View>
            </ControlledComponent>
            <ControlledComponent controller={addressList.length === 0}>
              <View style={styles.emptySearchResults}>
                <BodyText
                  text="No addresses saved."
                  color="#000"
                  weight={"500"}
                />
              </View>
            </ControlledComponent>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onAddAddress} style={styles.addnewbutton}>
              <InfoText text={`Add new`} color="#E4122F"></InfoText>
            </Pressable>
            <ControlledComponent controller={showSelectButton}>
              <Pressable onPress={handleSelect} style={styles.selectbutton}>
                <InfoText text={`Deliver here`} color="#FFFFFF"></InfoText>
              </Pressable>
            </ControlledComponent>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenBG: {
    backgroundColor: "#fff",
    flex: 1,
  },
  pageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    rowGap: 16,
    flex: 1,
  },
  backbuttonAndAddressescontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    fontWeight: "500",
    fontSize: 12,
    borderColor: "#E4122F",
  },
  container: {
    flex: 1,
  },

  addressContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  selectedAddress: {
    backgroundColor: "#d32f2f",
    borderColor: "#d32f2f",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  description: {
    color: "grey",
  },
  selectedTitle: {
    color: "white",
    fontWeight: "bold",
  },
  selectedDescription: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    columnGap: 40,
  },

  addnewbutton: {
    padding: 12,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E4122F",
    paddingHorizontal: 36,
  },

  selectbutton: {
    padding: 12,
    borderRadius: 28,
    backgroundColor: "#E4122F",
    paddingHorizontal: 36,
  },
  locationIcon: { justifyContent: "center", paddingLeft: 12 },
  savedAddressContainer: {
    rowGap: 16,
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
});
