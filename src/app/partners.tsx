import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function Partners() {
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Partner Services</Text>
      <Text style={styles.sub}>Use NG PASS to access supported platforms.</Text>

      <View style={styles.card}>
        <Ionicons name="school-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Universities</Text>
          <Text style={styles.cardSub}>Student portals and admissions</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="card-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Banks & Fintech</Text>
          <Text style={styles.cardSub}>Secure onboarding and verification</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="business-outline" size={28} color={COLORS.primary} />
        <View>
          <Text style={styles.cardTitle}>Government & Organizations</Text>
          <Text style={styles.cardSub}>Digital services and access requests</Text>
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
    gap:14,
    alignItems:"center",
  },
  cardTitle:{ fontSize:16, fontWeight:"900" },
  cardSub:{ color:COLORS.gray, marginTop:4 },
});
