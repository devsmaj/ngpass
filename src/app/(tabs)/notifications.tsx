import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Security alerts and access requests.</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/approval-request")}>
        <Ionicons name="log-in-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Login Request</Text>
          <Text style={styles.cardSub}>University Portal wants access</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Verification Ready</Text>
          <Text style={styles.cardSub}>Your NG PASS account is active.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: COLORS.background },
  title: { fontSize: 30, fontWeight: "900", marginTop: 55 },
  subtitle: { color: COLORS.gray, marginTop: 8, marginBottom: 25 },
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  cardSub: { color: COLORS.gray, marginTop: 4 },
});
