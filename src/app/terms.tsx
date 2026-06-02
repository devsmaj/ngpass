import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function Terms() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Terms & Privacy</Text>
      <Text style={styles.text}>
        NG PASS protects user identity data and only shares information with user consent.
      </Text>
      <Text style={styles.text}>
        This prototype is not an official government identity platform.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ fontSize:30, fontWeight:"900" },
  text:{ marginTop:18, color:COLORS.gray, lineHeight:24 },
});
