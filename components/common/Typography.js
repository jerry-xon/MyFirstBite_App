import { Platform, StyleSheet, Text } from "react-native";

export const InfoText = ({
  text,
  color,
  weight,
  customStyle,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.infoText, ...customStyle }}
    >
      {text}
    </Text>
  );
};

export const BodyText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
  customStyle,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.bodyText, ...customStyle }}
    >
      {text}
    </Text>
  );
};

export const NavigationText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.navigationText }}
    >
      {text}
    </Text>
  );
};

export const HeadingText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.headingText }}
    >
      {text}
    </Text>
  );
};

export const LargeText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.LargeText }}
    >
      {text}
    </Text>
  );
};

export const UserNameText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.UserNameText }}
    >
      {text}
    </Text>
  );
};

export const CommentText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.CommentText }}
    >
      {text}
    </Text>
  );
};

export const SuccessText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.SuccessText }}
    >
      {text}
    </Text>
  );
};

export const OtpText = ({ text, color, weight, numberOfLines = undefined }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.OtpText }}
    >
      {text}
    </Text>
  );
};
export const WelcomeText = ({
  text,
  color,
  weight,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.welcomeText }}
    >
      {text}
    </Text>
  );
};
export const DotText = ({ text, color, weight, numberOfLines = undefined }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ color, fontWeight: weight, ...styles.dotText }}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  dotText: {
    fontSize: 8,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  infoText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  navigationText: {
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  headingText: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  UserNameText: {
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  LargeText: {
    fontSize: 24,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  CommentText: {
    fontSize: 22,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  SuccessText: {
    fontSize: 28,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  OtpText: {
    fontSize: 36,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
  welcomeText: {
    fontSize: 40,
    fontFamily: Platform.OS === "ios" ? "Inter" : undefined,
  },
});
