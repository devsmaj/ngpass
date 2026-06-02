import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>S</Text>
      </View>

      <Text style={styles.name}>Saleh Mala Ajimi</Text>
      <Text style={styles.status}>✓ Verified Account</Text>

      <View style={styles.card}>
        <Ionicons name="person-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardText}>Account Type: Citizen</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="shield-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardText}>Security Settings</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardText}>App Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: COLORS.background, alignItems: "center" },
  avatar: {
    marginTop: 70,
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#E8FFF2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 40, fontWeight: "900", color: COLORS.primary },
  name: { fontSize: 24, fontWeight: "900", marginTop: 18 },
  status: { color: COLORS.success, marginTop: 6, marginBottom: 28 },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  cardText: { fontSize: 16, fontWeight: "700" },
});
