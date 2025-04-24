import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { HeadingText, NavigationText } from "../components/common/Typography";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TnC() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.pageContent}>
          <View style={styles.headingContainer}>
            <View style={styles.headingSection}>
              <IconButton
                icon="chevron-left"
                iconColor="#111719"
                style={styles.backbutton}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.titleSection}>
              <HeadingText
                text="Terms & Conditions"
                color={colors.black}
                weight={"600"}
              />
            </View>
            <View style={styles.headingSection} />
          </View>
          <View style={styles.content}>
            <View style={styles.tncContent}>
              <NavigationText
                text="My First Bite does not represent or warranty to the quality, value etc of the products or services which are to be sold on its platform. Also, it does not propose to sale or endorse any other product or services apart from the services which it does. My First Bite is not liable for any mistakes or illicit activities on behalf of the third parties."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="My First Bite is not liable for any breach of contract between the buyer and the merchant on the platform. My First Bite does not guarantee that buyer will have to perform any transaction on its platform. My First Bite is not liable for any unsatisfactory services or delay due to unavailability."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="If you cancel any order after it has been confirmed by the restaurant, My First Bite has reserved the right to charge INR100 for the order cancellation from the order value or from the subsequent order to compensate the restaurant and delivery partners."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="My First Bite reserves the right to cancel the order in the following circumstances: "
                weight={"400"}
                color={colors.black}
              />
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <NavigationText
                  text="if the designated address falls outside the delivery zone."
                  weight={"400"}
                  color={colors.black}
                />
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <NavigationText
                  text="if the restaurant fails to contact you by phone or email at the time of order confirmation."
                  weight={"400"}
                  color={colors.black}
                />
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <NavigationText
                  text="if the customer fails to provide proper information for the delivery."
                  weight={"400"}
                  color={colors.black}
                />
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <NavigationText
                  text="Unavailability of the items which are ordered "
                  weight={"400"}
                  color={colors.black}
                />
              </View>
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="The decision to refund the amount will be solely at the restaurant end."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="The details on the menu and the prices offered by the merchant are binding; the restaurant is not liable to make any changes in the prices and menu."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="The delivery period which is mentioned at the time of order is an approximation and may vary due to unavoidable circumstances."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="Change in the address by the customer is not acceptable after the order is placed and the restaurant reserves the right to cancel the order in case of any changes in the address designated at the time of delivery."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="Under the Indian Contract Act, 1972, a minor, insolvent person or person of unsound mind is not eligible to use the platform and in case they use, it should be within the authority or supervision of guardian or parents with the acceptance of terms and condition of My First Bite. My First Bite reserves the right to cancel the membership or account of such person."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="All the registration information provided on the platform should be accurate and truthful and the customer agrees to such information."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="You must not submit, upload, post and distribute any misleading information. Any information which is defamatory, disgusting, insulting or abusive or violent etc or invading the privacy of any other person. Users of the platform do not encourage any illegal activity or discussion of illegal activity with the intention to commit it."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="You must not upload, submit, post or distribute any harmful file that contain virus or such thing which can damage or impair the connectivity of the platform or interfere the privacy of any other person."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="You will not use the name , password or account information of any other person or any information which impersonate others name, voice, photo or identity."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="You will not indulge in any form of destructive or illegal activity or disrupting acts such as tolling, spamming, flooding etc."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.subTitleSection}>
              <HeadingText
                text="Return Refund Policy"
                weight={"600"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="Once your order is processed neither it would be cancelled nor any refund will be placed."
                weight={"400"}
                color={colors.black}
              />
            </View>

            <View style={styles.tncContent}>
              <NavigationText
                text="If you are not 100% satisfied with our service for any reason, just contact us and we'll be happy to provide a FREE pre-paid return label for any order shipped within 2 days of when the order was re shipped, and we'll process a full refund back to the original payment method."
                weight={"400"}
                color={colors.black}
              />
            </View>

            <View style={styles.subTitleSection}>
              <HeadingText
                text="Shipping policy"
                weight={"600"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="We offer Standard, Express and Same Day delivery services."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="If you've placed multiple orders on the same time using diffrent restaurant , your orders may be shipped together."
                weight={"400"}
                color={colors.black}
              />
            </View>
            <View style={styles.tncContent}>
              <NavigationText
                text="We asured you to deliver your order witin 45-60min. After confirmation of your order."
                weight={"400"}
                color={colors.black}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContent: {
    paddingHorizontal: 16,
    rowGap: 24,
    marginBottom: 16,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 8,
  },
  headingSection: {
    position: "absolute",
    left: 0,
  },
  titleSection: {
    margin: "0 auto",
  },
  backbutton: {
    borderRadius: 12,
    backgroundColor: "#F5F6FB",
  },
  content: {
    rowGap: 16,
  },
  tncContent: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borders.primary,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  bullet: {
    fontSize: 20,
    marginRight: 10,
  },

  subTitleSection: {
    alignItems: "center",
    marginBottom: 16,
  },
});
