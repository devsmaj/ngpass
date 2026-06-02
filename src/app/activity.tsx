import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function Activity() {
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Activity Logs</Text>
      <Text style={styles.sub}>Track your NG PASS security activity.</Text>

      <View style={styles.card}>
        <Ionicons name="log-in-outline" size={24} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Login Approved</Text>
          <Text style={styles.cardSub}>University Portal • Today</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Identity Verified</Text>
          <Text style={styles.cardSub}>NG PASS system • Today</Text>
        </View>
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
  cardTitle:{ fontSize:16, fontWeight:"900" },
  cardSub:{ color:COLORS.gray, marginTop:4 },
});
