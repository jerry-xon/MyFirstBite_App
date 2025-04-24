import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  IconButton,
  Avatar,
  Modal,
  Portal,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../constants/routes";
import {
  InfoText,
  UserNameText,
  BodyText,
} from "../components/common/Typography";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FontAwesome5, Fontisto, MaterialIcons } from "@expo/vector-icons";
import ControlledComponent from "../components/common/ControlledComponent";

const Logout = ({ handleLogout }) => {
  return (
    <View>
      <Pressable onPress={handleLogout} style={styles.logoutbutton}>
        <View>
          <InfoText text={`Logout`} weight="600" color="#E4122F" />
        </View>
      </Pressable>
    </View>
  );
};

const Account = ({ user }) => {
  const name =
    Boolean(user.user_name) === true ? user.user_name : user.user_phone;

  return (
    <TouchableOpacity>
      <View style={styles.accountContainer}>
        <View style={styles.nameEmailcontainer}>
          <Avatar.Image
            source={require("../assets/avtar.png")}
            style={styles.Avatar}
          />
          <View>
            <UserNameText text={name} weight="600" color="#000000" />
            <ControlledComponent controller={Boolean(user.user_email)}>
              <InfoText text={user.user_email} weight="400" color="#959595" />
            </ControlledComponent>
          </View>
        </View>
        <View style={styles.accountlogout}>
          <TouchableOpacity>
            <Image
              source={require("../assets/Acclogout.png")}
              style={styles.logoutimg}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyProfile = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MY_PROFILE)}>
      <View style={styles.MPtexticon}>
        <View style={styles.iconandmyprofile}>
          <Image source={require("../assets/myprofileiocn.png")} />
          <BodyText text={`My Profile`} weight="500" color="#000000"></BodyText>
        </View>
        <IconButton icon="chevron-right" iconColor="#000000" />
      </View>
    </TouchableOpacity>
  );
};
const MyOrder = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MY_ORDERS)}>
      <View style={styles.MOtexticon}>
        <View style={styles.iconandmyorder}>
          <Image source={require("../assets/myordericon.png")} />
          <BodyText text={`My Orders`} weight="500" color="#000000"></BodyText>
        </View>
        <IconButton icon="chevron-right" iconColor="#000000" />
      </View>
    </TouchableOpacity>
  );
};

const AddressBook = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.SELECT_ADDRESS)}
    >
      <View style={styles.ABtexticon}>
        <View style={styles.iconandaddressbook}>
          <Image source={require("../assets/book.png")} />
          <BodyText
            text={`Address Book`}
            weight="500"
            color="#000000"
          ></BodyText>
        </View>
        <IconButton icon="chevron-right" iconColor="#000000" />
      </View>
    </TouchableOpacity>
  );
};

const ContactUs = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <View style={styles.iconandcontactUS}>
          <View style={styles.CUtexticon}>
            <Image source={require("../assets/call.png")} />
            <BodyText
              text={`Contact Us`}
              weight="500"
              color="#000000"
            ></BodyText>
          </View>
          <IconButton
            icon="chevron-right"
            iconColor="#000000"
            style={styles.CUicon}
          />
        </View>
      </TouchableOpacity>
      <Portal>
        <Modal onDismiss={() => setVisible(false)} visible={visible}>
          <View style={styles.modal}>
            <View style={styles.contactDetails}>
              <FontAwesome5 name="location-arrow" size={20} color="#959595" />
              <InfoText
                text={`Choti Sadri Road, Opp. Kalika Gas Service, Nimbahera, Rajasthan 312601`}
                weight={"500"}
                color={"#959595"}
              />
            </View>
            <View style={styles.contactDetails}>
              <MaterialIcons name="call" size={20} color="#959595" />
              <InfoText
                text={`+91-7665517111`}
                weight={"500"}
                color={"#959595"}
              />
            </View>
            <View style={styles.contactDetails}>
              <MaterialIcons name="call" size={20} color="#959595" />
              <InfoText
                text={`+91-7568394112`}
                weight={"500"}
                color={"#959595"}
              />
            </View>
            <View style={styles.contactDetails}>
              <Fontisto name="email" size={20} color="#959595" />
              <InfoText
                text={`myfirstbite.028@gmail.com`}
                weight={"500"}
                color={"#959595"}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const TnC = ({ navigateToTnCPage }) => {
  return (
    <TouchableOpacity onPress={navigateToTnCPage}>
      <View style={styles.iconandcontactUS}>
        <View style={styles.CUtexticon}>
          <Image source={require("../assets/call.png")} />
          <BodyText
            text={`Terms and Conditions`}
            weight="500"
            color="#000000"
          />
        </View>
        <IconButton
          icon="chevron-right"
          iconColor="#000000"
          style={styles.CUicon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function Profile({ handleLogout, user, navigateToTnCPage }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenBG}>
      <Pressable
        style={styles.backbuttoncontainer}
        onPress={() => navigation.navigate(ROUTES.HOME)}
      >
        <IconButton
          icon="chevron-left"
          iconColor="#111719"
          size={28}
          style={styles.backbutton}
        />
      </Pressable>
      <View style={styles.accountContainergapping}>
        <Account user={user} />
        <View style={styles.allfieldgapping}>
          <MyProfile />
          <MyOrder />
          <AddressBook />
          {/* <MFBwallet /> */}
          {/* <Language /> */}
          <ContactUs />
          <TnC navigateToTnCPage={navigateToTnCPage} />
        </View>
        <Logout handleLogout={handleLogout} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screenBG: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backbuttoncontainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  accountContainergapping: {
    rowGap: 16,
    paddingHorizontal: 16,
  },
  allfieldgapping: {
    rowGap: 8,
    backgroundColor: "#FFFFFF",
  },
  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },
  accountContainer: {
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#EEEEEE",
  },

  Avatar: {
    backgroundColor: "#EEEEEE",
    borderColor: "#A9A9A9",
  },

  nameEmailcontainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  accountlogout: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EFEFEF",
    padding: 8,
  },
  iconandmyprofile: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 12,
  },
  MPtexticon: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconandmyorder: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 12,
  },
  MOtexticon: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconandaddressbook: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 12,
  },
  ABtexticon: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconandMFBwallet: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 12,
  },
  MFBcontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEEEEE",
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  balancetextandicon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  walletbalance: {
    paddingRight: 16,
    paddingLeft: 4,
  },
  iconandlanguage: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 12,
  },
  Languagetexticon: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEEEEE",
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconandcontactUS: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEEEEE",
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CUtexticon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 12,
    paddingHorizontal: 12,
  },

  logoutbutton: {
    borderWidth: 1,
    borderColor: "#E4122F",
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 48,
    alignSelf: "center",
  },
  textlogoutbutton: {
    color: "#E4122F",
  },
  logoutimg: { height: 20, width: 20, padding: 12 },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: 50,
    shadowOpacity: 0.4,
    elevation: 12,
    alignSelf: "center",
    position: "absolute",
    bottom: 100,
    rowGap: 12,
  },
  contactDetails: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
