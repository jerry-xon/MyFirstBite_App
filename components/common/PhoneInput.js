import { createRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../../theme";
import { InfoText } from "./Typography";

export default function PhoneInput({ onChange, phoneNumber, hasError }) {
  const phoneInputRef = createRef();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        ref={phoneInputRef}
        onChangeText={onChange}
        keyboardType="phone-pad"
        placeholder="Enter your phone no."
        value={phoneNumber}
        style={styles.textInput}
        placeholderTextColor={theme.colors.white}
      />
      {hasError && (
        <InfoText
          text="Please enter valid Phone number"
          color={theme.colors.primary}
          weight={"500"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderColor: theme.colors.white,
    borderWidth: 1,
    color: "white",
    borderRadius: 8,
    width: 270,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    rowGap: 4,
    alignItems:'center',
  }
});
