import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { IconButton, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { ROUTES } from "../constants/routes";
import { BodyText, HeadingText } from "../components/common/Typography";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_STATES } from "../redux/constants";
import { updateUserDetails } from "../redux/reducers/auth/authReducer";

// const GenderSelector = ({ value, onChange }) => {
//   const [isFocus, setIsFocus] = useState(false);
//   return (
//     <View style={styles.gappingcontainer}>
//       <BodyText text={`Gender`} weight="400" color="#9796A1" />
//       <View style={styles.genderDetailInput}>
//         <Dropdown
//           data={data}
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? "Select Gender" : "..."}
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={(item) => {
//             onChange(item.value);
//             setIsFocus(false);
//           }}
//           renderItem={(item) => {
//             return (
//               <View style={styles.dropdownItemContainer}>
//                 <NavigationText text={item.label} color="#000" />
//               </View>
//             );
//           }}
//         />
//       </View>
//     </View>
//   );
// };

const PrimaryMobile = ({ value, onChange }) => {
  return (
    <View style={styles.gappingcontainer}>
      <BodyText text={`Primary Mobile`} weight="400" color="#9796A1" />
      <TextInput
        style={styles.detailcontainersStyle}
        // placeholder="9587412563"
        value={value}
        onChangeText={onChange}
        keyboardType="phone-pad"
        editable={false}
      />
    </View>
  );
};
const SecondaryMobile = ({ value, onChange }) => {
  return (
    <View style={styles.gappingcontainer}>
      <BodyText text={`Secondary Mobile`} weight="400" color="#9796A1" />
      <TextInput
        style={styles.detailcontainersStyle}
        // placeholder="9587412563"
        value={value}
        onChangeText={onChange}
        keyboardType="phone-pad"
      />
    </View>
  );
};
const NameOfUser = ({ value, onChange }) => {
  return (
    <View style={styles.gappingcontainer}>
      <BodyText text={`Name`} weight="400" color="#9796A1"></BodyText>
      <TextInput
        style={styles.detailcontainersStyle}
        // placeholder="Rohan Joshi"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const Email = ({ value, onChange }) => {
  return (
    <View style={styles.gappingcontainer}>
      <BodyText text={`E-mail`} weight="400" color="#9796A1"></BodyText>
      <TextInput
        style={styles.detailcontainersStyle}
        // placeholder="RohanJ765@gmail.com"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};
// const DateOfBirth = () => {
//   return (
//     <View style={styles.gappingcontainer}>
//       <BodyText text={`Date of birth`} weight="400" color="#9796A1"></BodyText>
//       <View style={styles.detailcontainer}>
//         <TextInput
//           style={styles.detailcontainersStyle}
//           placeholder="25/08/1996"
//           placeholderTextColor="#9796A1"
//         />
//       </View>
//     </View>
//   );
// };

export default function Profile() {
  const dispatch = useDispatch();
  const { user, updateUserDetailsStatus } = useSelector(
    (state) => state.authState
  );
  const timerRef = useRef();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    primaryMobile: "",
    secondaryMobile: "",
    gender: "",
    email: "",
    dob: "",
  });

  const handleFormChange = useCallback((key, value) => {
    setFormData((curr) => {
      return {
        ...curr,
        [key]: value,
      };
    });
  }, []);

  const updateProfile = () => {
    dispatch(updateUserDetails({ formData }));
  };

  useEffect(() => {
    setFormData({
      name: user.user_name ?? "",
      email: user.user_email ?? "",
      primaryMobile: user.user_phone ?? "",
      secondaryMobile: user.user_phone_1 ?? "",
    });
  }, [user]);

  useEffect(() => {
    if (updateUserDetailsStatus.fetchState === FETCH_STATES.COMPLETED) {
      setVisible(true);
    }
  }, [updateUserDetailsStatus.fetchState]);

  useEffect(() => {
    if (visible === true) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [visible]);

  return (
    <SafeAreaView style={styles.screenBackGroundColor}>
      <ScrollView>
        <View style={styles.pageContent}>
          <View style={styles.headingContainer}>
            <View style={styles.headingSection}>
              <IconButton
                icon="chevron-left"
                iconColor="#111719"
                size={28}
                style={styles.backbutton}
                onPress={() => navigation.navigate(ROUTES.PROFILE)}
              />
            </View>
            <View style={styles.headingSection}>
              <HeadingText
                text={`My Profile`}
                color={colors.black}
                weight="500"
              />
            </View>
            <View style={styles.headingSection} />
          </View>
          <View style={styles.alldetailContainer}>
            <NameOfUser
              value={formData.name}
              onChange={(value) => handleFormChange("name", value)}
            />
            <PrimaryMobile
              value={formData.primaryMobile}
              onChange={(value) => handleFormChange("primaryMobile", value)}
            />
            <SecondaryMobile
              value={formData.secondaryMobile}
              onChange={(value) => handleFormChange("secondaryMobile", value)}
            />
            <Email
              value={formData.email}
              onChange={(value) => handleFormChange("email", value)}
            />
            {/* <GenderSelector
              value={formData.gender}
              onChange={(value) => handleFormChange("gender", value)}
            /> */}
            {/* <DateOfBirth /> */}
          </View>
          <View style={styles.UpdateProfilebuttoncontainer}>
            <TouchableHighlight
              onPress={updateProfile}
              style={styles.UpdateProfilebutton}
            >
              <BodyText
                text={`${
                  updateUserDetailsStatus.fetchState ===
                  FETCH_STATES.IN_PROGRESS
                    ? "Updating Profile...."
                    : "Update Profile"
                }`}
                weight="500"
                color="#FFFFFF"
              ></BodyText>
            </TouchableHighlight>
          </View>

          <Snackbar
            style={{ position: "absolute", bottom: 0, width: "100%" }}
            visible={visible}
          >
            Profile Updated Successfully
          </Snackbar>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenBackGroundColor: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  pageContent: {
    rowGap: 16,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },
  detailcontainersStyle: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 16,
    borderColor: "#959595",
    fontSize: 16,
    fontWeight: "400",
  },
  gappingcontainer: {
    rowGap: 8,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  dropdownarea: {
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: "#fff",
    shadowColor: "#E9E9E9",
    shadowOpacity: 1,
  },
  alldetailContainer: {
    rowGap: 16,
  },
  UpdateProfilebutton: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 8,
    paddingHorizontal: 60,
    borderColor: "#E4122F",
    backgroundColor: "#E4122F",
    paddingVertical: 16,
  },

  UpdateProfilebuttoncontainer: {
    alignSelf: "center",
  },
  headingSection: {
    flex: 1,
  },

  genderDetailInput: {
    borderWidth: 1,
    borderColor: "#959595",
    borderRadius: 12,
    padding: 16,
  },

  dropdownItemContainer: {
    padding: 16,
  },
});
