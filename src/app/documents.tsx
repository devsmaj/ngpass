import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function Documents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents Wallet</Text>
      <Text style={styles.subtitle}>Manage your digital documents securely.</Text>

      <View style={styles.card}>
        <Ionicons name="document-text-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Identity Documents</Text>
          <Text style={styles.cardSub}>NIN, Passport, Resident Documents</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="school-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Certificates</Text>
          <Text style={styles.cardSub}>School and professional records</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="briefcase-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Business Documents</Text>
          <Text style={styles.cardSub}>Licenses and organization records</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 55,
  },
  subtitle: {
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  cardSub: {
    color: COLORS.gray,
    marginTop: 4,
  },
});
