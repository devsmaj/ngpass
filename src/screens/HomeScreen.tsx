import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import IdentityCard from "../components/IdentityCard";
import ActionButton from "../components/ActionButton";
import { COLORS } from "../constants/colors";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NG PASS</Text>
        <Text style={styles.subtitle}>Nigeria's Digital Identity Gateway</Text>
        <IdentityCard />
      </View>

      <View style={styles.actions}>
        <View style={styles.row}>
          <ActionButton title="Sign Documents" icon="create-outline" onPress={() => router.push("/sign-document")} />
          <ActionButton title="Verify Documents" icon="shield-checkmark-outline" onPress={() => router.push("/verify-document")} />
        </View>

        <View style={styles.row}>
          <ActionButton title="Add Documents" icon="document-text-outline" onPress={() => router.push("/add-document")} />
          <ActionButton title="Scan QR Code" icon="qr-code-outline" onPress={() => router.push("/qr-scanner")} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Security Status</Text>
          <Text style={styles.infoSub}>Your account is protected and verified.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Recent Activity</Text>
          <Text style={styles.infoSub}>University Portal access request received.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 70,
    padding: 20,
    gap: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: { color: COLORS.white, fontSize: 35, fontWeight: "900" },
  subtitle: { color: COLORS.white, fontSize: 15 },
  actions: { padding: 20, gap: 15 },
  row: { flexDirection: "row", gap: 15 },
  infoCard: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 18,
  },
  infoTitle: { fontSize: 17, fontWeight: "900" },
  infoSub: { color: COLORS.gray, marginTop: 5 },
});
