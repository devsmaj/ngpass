import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function AccountType() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Account Type</Text>
      <Text style={styles.subtitle}>Select how you want to register with NG PASS.</Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="flag-outline" size={28} color={COLORS.primary} />
          <View>
            <Text style={styles.cardTitle}>Citizen</Text>
            <Text style={styles.cardSub}>For Nigerian citizens</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="home-outline" size={28} color={COLORS.primary} />
          <View>
            <Text style={styles.cardTitle}>Resident</Text>
            <Text style={styles.cardSub}>For people living in Nigeria</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="airplane-outline" size={28} color={COLORS.primary} />
          <View>
            <Text style={styles.cardTitle}>Visitor</Text>
            <Text style={styles.cardSub}>For visitors and travelers</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: COLORS.background },
  title: { fontSize: 30, fontWeight: "900", marginTop: 70 },
  subtitle: { color: COLORS.gray, marginTop: 8, marginBottom: 28 },
  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: "900" },
  cardSub: { color: COLORS.gray, marginTop: 4 },
});
