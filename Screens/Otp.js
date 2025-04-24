import { View, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import ControlledComponent from "../components/common/ControlledComponent";
import {
  BodyText,
  InfoText,
  NavigationText,
  OtpText,
} from "../components/common/Typography";
import { theme } from "../theme";

const OTP_TIMER = 30;

export default function Otp({
  onSubmit,
  otpText,
  onInputChange,
  errorMsg,
  isLoading,
  phoneNumber,
  editNumber,
  resendOTP,
}) {
  const [timer, setTimer] = useState(OTP_TIMER);
  const [resendOTPCount, setResendOTPCount] = useState(0);

  const timerRef = useRef();

  const handleResendOTP = () => {
    setResendOTPCount((curr) => curr + 1);
    if (resendOTPCount <= 1) {
      setTimer(OTP_TIMER);
    }
    resendOTP();
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (timer > 0) {
        setTimer((curr) => curr - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timer]);

  return (
    <SafeAreaView style={styles.screenBG}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={0}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <View style={styles.topSection}>
            <View>
              <OtpText text={`Enter OTP`} weight={"600"} color={"#000000"} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.infoContainer}>
                <BodyText
                  text={`OTP sent on ${phoneNumber}.`}
                  weight={"400"}
                  color={"#9796A1"}
                />
                <Pressable onPress={editNumber}>
                  <NavigationText
                    text="Edit"
                    color={theme.colors.primary}
                    weight={"600"}
                  />
                </Pressable>
              </View>

              <TextInput
                keyboardType="numeric"
                style={styles.Input}
                placeholder="Your OTP here..."
                value={otpText}
                onChangeText={onInputChange}
              />
              <ControlledComponent
                controller={timer > 0 && resendOTPCount <= 1}
              >
                <BodyText
                  text={`Resend OTP in ${timer}s`}
                  color={colors.black}
                  weight={"500"}
                />
              </ControlledComponent>

              <ControlledComponent
                controller={timer === 0 && resendOTPCount <= 1}
              >
                <Pressable onPress={handleResendOTP}>
                  <BodyText
                    text="Resend OTP"
                    color={theme.colors.primary}
                    weight={"400"}
                  />
                </Pressable>
              </ControlledComponent>

              <ControlledComponent controller={Boolean(errorMsg)}>
                <InfoText
                  text={errorMsg}
                  color={theme.colors.primary}
                  weight={"500"}
                />
              </ControlledComponent>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.LoginButtonContainer}>
              <Pressable onPress={onSubmit} style={styles.LoginButton}>
                <BodyText
                  text={isLoading ? "Logging in..." : "LOGIN"}
                  weight={"600"}
                  color={"#FFFFFF"}
                />
              </Pressable>
            </View>
            {/* <View style={styles.TCcontainer}>
            <InfoText
              text={`By Continuing, you agree to our`}
              weight={"500"}
              color={"#9796A1"}
            />

            <Pressable
              style={styles.ViewTnC}
              onPress={() => console.log("Terms & Conditions")}
            >
              <InfoText
                text={` Terms & Conditions and Privacy Policy`}
                weight={"500"}
                color={"#9796A1"}
              />
            </Pressable>
          </View> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenBG: { flex: 1, backgroundColor: colors.white },
  content: {
    flex: 1,
    marginTop: "40%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  topSection: {
    rowGap: 32,
  },
  bottomSection: {
    marginBottom: 48,
  },
  inputContainer: {
    rowGap: 8,
    marginBottom: 24,
  },

  Input: {
    borderWidth: 1,
    borderColor: colors.borders.primary,
    padding: 20,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },

  LoginButtonContainer: {
    alignItems: "center",
  },
  LoginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 28,
  },
  TCcontainer: {
    alignItems: "center",
  },

  ViewTnC: {
    borderBottomWidth: 1,
    borderBottomColor: "#9796A1",
  },
  infoContainer: {
    flexDirection: "row",
    columnGap: 4,
    alignItems: "center",
  },
  keyboardContainer: { flex: 1 },
});
