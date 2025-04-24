import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import backgroundImage from "../assets/login-background.png";
import { theme } from "../theme";
import PhoneInput from "../components/common/PhoneInput";
import {
  HeadingText,
  NavigationText,
  BodyText,
  WelcomeText,
  InfoText,
} from "../components/common/Typography";
import { colors } from "../theme/colors";

export default function LoginPage({
  onSubmit,
  phoneNumber,
  onInputChange,
  hasError,
  onLoginSkip,
  navigateToTnCPage,
}) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={0}
          style={styles.keyboardContainer}
        >
          <View style={styles.topContainer}>
            <View style={styles.skipButtonContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={onLoginSkip}>
                <NavigationText
                  text="Skip"
                  color={theme.colors.primary}
                  weight={"400"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.welcomeContainer}>
              <WelcomeText
                text={`Welcome to`}
                weight={"700"}
                color={"#111719"}
              />
              <WelcomeText
                text={`My First Bite`}
                weight={"700"}
                color={"#E4122F"}
              />
              <BodyText
                text="We deserve your First Bite"
                color={theme.colors.darkBlue}
                weight={"400"}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.formContainer}>
              <PhoneInput
                phoneNumber={phoneNumber}
                onChange={onInputChange}
                hasError={hasError}
              />
              <TouchableOpacity onPress={onSubmit}>
                <HeadingText
                  text="Continue"
                  color={theme.colors.white}
                  weight={"500"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.TnCcontainer}>
              <InfoText
                text={`By Continuing, you agree to our`}
                weight={"500"}
                color={"#9796A1"}
              />
              <Pressable onPress={navigateToTnCPage}>
                <View style={styles.tncTextContainer}>
                  <InfoText
                    text={`Terms & Conditions and Privacy Policy`}
                    weight={"500"}
                    color={"#9796A1"}
                    customStyle={{
                      fontStyle: "italic",
                    }}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  skipButtonContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  skipButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 28,
  },
  bottomContainer: {
    rowGap: 60,
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  formContainer: {
    rowGap: 24,
    alignItems: "center",
  },
  TnCcontainer: {
    alignItems: "center",
  },
  tncTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  welcomeContainer: { flex: 1, justifyContent: "flex-end" },
  topContainer: {
    flex: 1,
  },
  keyboardContainer: { flex: 1 },
});
