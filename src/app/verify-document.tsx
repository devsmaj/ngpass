import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { router } from "expo-router";
import BackButton from "../components/BackButton";

export default function VerifyDocument() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Verify Document</Text>
      <Text style={styles.sub}>Check document authenticity using NG PASS.</Text>

      <View style={styles.box}>
        <Ionicons name="shield-checkmark-outline" size={80} color={COLORS.primary} />
        <Text style={styles.boxTitle}>Document Verification</Text>
        <Text style={styles.boxSub}>Scan QR or enter document ID</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/success")}>
        <Text style={styles.btnText}>Start Verification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ marginTop:60, fontSize:30, fontWeight:"900" },
  sub:{ marginTop:8, color:COLORS.gray },
  box:{
    marginTop:35,
    height:280,
    backgroundColor:COLORS.white,
    borderRadius:28,
    alignItems:"center",
    justifyContent:"center",
    gap:10,
  },
  boxTitle:{ fontSize:20, fontWeight:"900" },
  boxSub:{ color:COLORS.gray },
  btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
