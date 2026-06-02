import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function QRScanner() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Scan QR Code</Text>
      <Text style={styles.sub}>Scan and validate NG PASS identity or access requests.</Text>

      <View style={styles.scanner}>
        <Ionicons name="scan-outline" size={120} color={COLORS.primary} />
        <Text style={styles.scanText}>Camera scanner placeholder</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Start Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ marginTop:60, fontSize:30, fontWeight:"900" },
  sub:{ marginTop:8, color:COLORS.gray },
  scanner:{
    marginTop:40,
    height:300,
    backgroundColor:COLORS.white,
    borderRadius:28,
    alignItems:"center",
    justifyContent:"center",
    gap:12,
  },
  scanText:{ color:COLORS.gray },
  btn:{
    backgroundColor:COLORS.primary,
    padding:18,
    borderRadius:18,
    marginTop:25,
  },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
