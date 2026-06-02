import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function AddDocument() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Add Document</Text>
      <Text style={styles.sub}>Add important documents to your secure wallet.</Text>

      <View style={styles.card}>
        <Ionicons name="document-text-outline" size={28} color={COLORS.primary} />
        <Text style={styles.cardText}>Identity Document</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="school-outline" size={28} color={COLORS.primary} />
        <Text style={styles.cardText}>Certificate</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="briefcase-outline" size={28} color={COLORS.primary} />
        <Text style={styles.cardText}>Business Document</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Upload Document</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ marginTop:60, fontSize:30, fontWeight:"900" },
  sub:{ marginTop:8, color:COLORS.gray, marginBottom:25 },
  card:{
    backgroundColor:COLORS.white,
    padding:18,
    borderRadius:18,
    marginBottom:14,
    flexDirection:"row",
    gap:12,
    alignItems:"center",
  },
  cardText:{ fontSize:16, fontWeight:"800" },
  btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:20 },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
