import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function Settings() {
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Settings</Text>
      <Text style={styles.sub}>Manage your NG PASS account.</Text>

      <View style={styles.card}>
        <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} />
        <Text style={styles.text}>Change PIN</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="finger-print-outline" size={24} color={COLORS.primary} />
        <Text style={styles.text}>Biometrics</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="shield-outline" size={24} color={COLORS.primary} />
        <Text style={styles.text}>Privacy & Security</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ fontSize:30, fontWeight:"900" },
  sub:{ color:COLORS.gray, marginTop:8, marginBottom:25 },
  card:{
    backgroundColor:COLORS.white,
    padding:18,
    borderRadius:18,
    marginBottom:14,
    flexDirection:"row",
    gap:12,
    alignItems:"center",
  },
  text:{ fontSize:16, fontWeight:"800" },
});
