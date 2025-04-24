// import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { useTheme } from "react-native-paper";

// import { useState } from "react";
// import {
//   BodyText,
//   CommentText,
//   LargeText,
// } from "../components/common/Typography";

// const StarRating = ({ maxStars = 5 }) => {
//   const [rating, setRating] = useState(0);

//   const starImageFilled = require("../assets/star_filled.svg");
//   const starImageEmpty = require("../assets/star_empty.svg");

//   return (
//     <View style={styles.starContainer}>
//       {Array.from({ length: maxStars }, (_, index) => (
//         <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
//           <Image source={index < rating ? starImageFilled : starImageEmpty} />
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default function Review() {
//   const theme = useTheme();
//   return (
//     <>
//       <View style={styles.lowopacityBG}>
//         <Image source={require("../assets/reviewpagebackground.png")} />
//       </View>

//       <View style={styles.RestroNameAndLogo}>
//         <View style={styles.Restrologocontainer}>
//           <Image source={require("../assets/Jimmyjhonlogo.png")} />
//         </View>
//         <View style={styles.NameText}>
//           <LargeText text={`Jimmy John’s`} weight="600" color="#000000" />
//         </View>

//         <View style={styles.questioncontainer}>
//           <LargeText
//             text={`How was your last order`}
//             weight="400"
//             color="#000000"
//           />
//           <LargeText
//             text={`from Jimmy John’s ?`}
//             weight="400"
//             color="#000000"
//           />
//         </View>

//         <View style={styles.reviewText}>
//           <CommentText text={`Good`} color="#FE724C" weight="500" />
//           <StarRating />
//         </View>

//         <View style={styles.submitbuttoncontainer}>
//           <TouchableOpacity
//             style={styles.submitButton}
//             onPress={() => console.log("Pressed")}
//           >
//             <BodyText text={`SUBMIT`} color="#FFFFFF" weight="500" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   RestroNameAndLogo: {
//     position: "absolute",
//     alignItems: "center",
//     alignSelf: "center",
//     top: 180,
//   },
//   NameText: {
//     paddingVertical: 12,
//   },
//   questioncontainer: {
//     paddingVertical: 28,
//     alignItems: "center",
//   },

//   starContainer: {
//     flexDirection: "row",
//     columnGap: 8,
//     paddingVertical: 4,
//   },
//   reviewText: {
//     alignItems: "center",
//   },
//   submitButton: {
//     borderWidth: 1,
//     borderRadius: 28,
//     padding: 8,
//     paddingHorizontal: 76,
//     borderColor: "#E4122F",
//     backgroundColor: "#E4122F",
//     paddingVertical: 12,
//   },
//   submitbuttoncontainer: {
//     paddingVertical: 12,
//     top: 220,
//   },
//   lowopacityBG: {
//     backgroundColor: "#F5F6FB",
//     opacity: 0.09,
//   },
//   Restrologocontainer: {
//     backgroundColor: "#FFFFFF",
//     padding: 12,
//     borderRadius: 12,
//   },
//   logo: {
//     height: 56,
//     width: 56,
//   },
// });
