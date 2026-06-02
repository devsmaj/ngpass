import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function SignDocument() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Sign Document</Text>
      <Text style={styles.sub}>Upload and approve documents securely.</Text>

      <View style={styles.box}>
        <Ionicons name="cloud-upload-outline" size={70} color={COLORS.primary} />
        <Text style={styles.boxTitle}>Upload Document</Text>
        <Text style={styles.boxSub}>PDF, certificate, or agreement</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Continue to Sign</Text>
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
  btn:{
    backgroundColor:COLORS.primary,
    padding:18,
    borderRadius:18,
    marginTop:25,
  },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
