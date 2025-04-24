import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import {
  BodyText,
  HeadingText,
  InfoText,
  NavigationText,
} from "../components/common/Typography";
import ControlledComponent from "../components/common/ControlledComponent";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

const SelectArea = ({ setAreaValue, areaValue, locationsList, error }) => {
  const [isFocus, setIsFocus] = useState(false);

  const data = locationsList.map(
    (location) => {
      return {
        label: location.location_name,
        value: location.location_id,
      };
    },
    [locationsList]
  );

  return (
    <View style={styles.inputContainer}>
      <BodyText text={`Select Area`} weight="400" color="#9796A1" />
      <View style={styles.AddressdetailInput}>
        <Dropdown
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Area" : "..."}
          value={areaValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setAreaValue(item.value);
            setIsFocus(false);
          }}
          renderItem={(item) => {
            return (
              <View style={styles.dropdownItemContainer}>
                <NavigationText text={item.label} color="#000" />
              </View>
            );
          }}
        />
      </View>
      <ControlledComponent controller={error}>
        <NavigationText color={colors.primary} weight="500" text={error} />
      </ControlledComponent>
    </View>
  );
};

const Address = ({ setAddress, address, error }) => {
  return (
    <View style={styles.inputContainer}>
      <BodyText text={`Address`} weight="400" color="#9796A1" />
      <TextInput
        placeholderTextColor="#000000"
        style={styles.AddressdetailInput}
        value={address}
        onChangeText={setAddress}
      />
      <ControlledComponent controller={error}>
        <NavigationText color={colors.primary} weight="500" text={error} />
      </ControlledComponent>
    </View>
  );
};
const Landmark = ({ landmark, setLandmark, error }) => {
  return (
    <View style={styles.inputContainer}>
      <BodyText text={`Landmark`} weight="400" color="#9796A1" />
      <TextInput
        value={landmark}
        onChangeText={setLandmark}
        placeholderTextColor="#000000"
        style={styles.AddressdetailInput}
      />
      <ControlledComponent controller={error}>
        <NavigationText color={colors.primary} weight="500" text={error} />
      </ControlledComponent>
    </View>
  );
};
const MobileNo = ({ phoneNumber, setPhoneNumber, error }) => {
  return (
    <View style={styles.inputContainer}>
      <BodyText text={`Mobile`} color="#9796A1" weight="400" />
      <TextInput
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#000000"
        style={styles.AddressdetailInput}
      />
      <ControlledComponent controller={error}>
        <NavigationText color={colors.primary} weight="500" text={error} />
      </ControlledComponent>
    </View>
  );
};
export default function AddAddress({ locationsList, onSave, isLoading }) {
  const navigation = useNavigation();
  const [landmark, setLandmark] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [error, setError] = useState({});

  const handleSave = () => {
    const errorObj = {};
    if (landmark.trim().length === 0) {
      errorObj.landmark = "Please enter landmark";
    }
    if (phoneNumber.trim().length === 0 || phoneNumber.trim().length !== 10) {
      errorObj.phoneNumber = "Please enter a valid phone number";
    }
    if (address.trim().length === 0) {
      errorObj.address = "Please enter address";
    }
    if (areaValue.length === 0) {
      errorObj.area = "Please select area";
    }
    setError(errorObj);
    if (Object.keys(errorObj).length === 0) {
      onSave({ landmark, address, areaValue, phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.ScreenBackGroundColor}>
      <ScrollView>
        <View style={styles.backbuttonandAddAddresscontainer}>
          <View style={styles.headerSection}>
            <IconButton
              icon="chevron-left"
              iconColor="#111719"
              size={28}
              style={styles.backbutton}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{ ...styles.headerSection, ...styles.headingTextContainer }}
          >
            <HeadingText text={`Add Address`} weight="500" color="#000" />
          </View>
          <View style={styles.headerSection} />
        </View>
        <View style={styles.AllDetailsViewContainer}>
          <Address
            error={error.address}
            address={address}
            setAddress={setAddress}
          />
          <Landmark
            error={error.landmark}
            landmark={landmark}
            setLandmark={setLandmark}
          />
          <MobileNo
            error={error.phoneNumber}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <SelectArea
            locationsList={locationsList}
            areaValue={areaValue}
            setAreaValue={setAreaValue}
            error={error.area}
          />
        </View>
        <View style={styles.Savebuttoncontainer}>
          <Pressable onPress={handleSave} style={styles.Savebutton}>
            <InfoText
              text={isLoading ? "Saving..." : `Save`}
              weight="500"
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScreenBackGroundColor: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    rowGap: 16,
  },
  backbuttonandAddAddresscontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },

  AddressdetailInput: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    padding: 16,
  },
  label: {
    color: "black",
  },
  selectedLabel: {
    color: "white",
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
  AllDetailsViewContainer: {
    rowGap: 16,
  },
  inputContainer: {
    rowGap: 8,
  },
  headerSection: {
    flex: 1,
  },
  dropdownItemContainer: {
    padding: 16,
  },
  headingTextContainer: {
    alignItems: "center",
  },
});
