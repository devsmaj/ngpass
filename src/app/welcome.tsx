import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../constants/colors";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NG PASS</Text>
      <Text style={styles.title}>Your Digital Identity</Text>
      <Text style={styles.subtitle}>
        Secure access for citizens, residents, and visitors in Nigeria.
      </Text>

      <Link href="/account-type" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, padding: 24, justifyContent: "center" },
  logo: { color: COLORS.white, fontSize: 42, fontWeight: "900", marginBottom: 35 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900" },
  subtitle: { color: "#E8FFF2", fontSize: 16, marginTop: 12, lineHeight: 24 },
  button: { backgroundColor: COLORS.white, padding: 18, borderRadius: 18, marginTop: 40 },
  buttonText: { color: COLORS.primary, fontWeight: "900", textAlign: "center", fontSize: 16 },
});
