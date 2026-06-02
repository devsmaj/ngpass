import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { COLORS } from "../constants/colors";

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.back} onPress={() => router.back()}>
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 45,
    marginBottom: 10,
  },
  text: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 16,
  },
});
