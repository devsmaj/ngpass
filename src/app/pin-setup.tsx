import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../constants/colors";

export default function PinSetup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Secure PIN</Text>
      <Text style={styles.sub}>Use this PIN to unlock your NG PASS.</Text>

      <TextInput
        placeholder="Enter 4-digit PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        style={styles.input}
      />

      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Complete Setup</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ marginTop:80, fontSize:30, fontWeight:"900" },
  sub:{ marginTop:8, color:COLORS.gray, marginBottom:30 },
  input:{
    backgroundColor:COLORS.white,
    padding:18,
    borderRadius:16,
    marginBottom:15,
  },
  btn:{
    backgroundColor:COLORS.primary,
    padding:18,
    borderRadius:18,
    marginTop:25,
  },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
