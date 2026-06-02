import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../constants/colors";

export default function Success() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="checkmark-circle-outline" size={90} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>Success</Text>
      <Text style={styles.sub}>Your action was completed securely.</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background, alignItems:"center", justifyContent:"center" },
  iconBox:{ backgroundColor:COLORS.white, padding:25, borderRadius:80 },
  title:{ fontSize:32, fontWeight:"900", marginTop:25 },
  sub:{ color:COLORS.gray, marginTop:8, textAlign:"center" },
  btn:{ width:"100%", backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:35 },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
