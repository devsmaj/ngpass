import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { COLORS } from "../constants/colors";

export default function Unlock() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NG PASS</Text>
      <Text style={styles.title}>Enter PIN</Text>
      <Text style={styles.sub}>Unlock your digital identity.</Text>

      <TextInput
        placeholder="••••"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        style={styles.input}
      />

      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Unlock</Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.bioBtn}>
        <Ionicons name="finger-print-outline" size={42} color="#FFFFFF" />
        <Text style={styles.bioText}>Use Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.primary, justifyContent:"center" },
  logo:{ color:COLORS.white, fontSize:42, fontWeight:"900", textAlign:"center", marginBottom:35 },
  title:{ color:COLORS.white, fontSize:30, fontWeight:"900", textAlign:"center" },
  sub:{ color:"#E8FFF2", marginTop:8, marginBottom:25, textAlign:"center" },
  input:{
    backgroundColor:COLORS.white,
    padding:18,
    borderRadius:16,
    textAlign:"center",
    fontSize:22,
    letterSpacing:10,
  },
  btn:{ backgroundColor:COLORS.white, padding:18, borderRadius:18, marginTop:25 },
  btnText:{ color:COLORS.primary, textAlign:"center", fontWeight:"900" },

  bioBtn:{
    alignItems:"center",
    marginTop:30,
  },
  bioText:{
    color:COLORS.white,
    marginTop:8,
    fontWeight:"800",
  },
});

