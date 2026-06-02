import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function DeveloperDemo() {
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Developer Demo</Text>
      <Text style={styles.sub}>Example of how partner apps can use NG PASS login.</Text>

      <View style={styles.appBox}>
        <Ionicons name="school-outline" size={50} color={COLORS.primary} />
        <Text style={styles.appTitle}>University Portal</Text>
        <Text style={styles.appSub}>Demo service provider</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/approval-request")}
      >
        <Text style={styles.btnText}>Continue with NG PASS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ fontSize:30, fontWeight:"900" },
  sub:{ color:COLORS.gray, marginTop:8 },
  appBox:{
    marginTop:35,
    backgroundColor:COLORS.white,
    padding:30,
    borderRadius:28,
    alignItems:"center",
    gap:10,
  },
  appTitle:{ fontSize:22, fontWeight:"900" },
  appSub:{ color:COLORS.gray },
  btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
