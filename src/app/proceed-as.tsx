import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function ProceedAs(){
 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Proceed As</Text>

   <TouchableOpacity style={styles.card} onPress={()=>router.push("/select-id?type=citizen")}>
    <Ionicons name="home-outline" size={36} color="#B19700"/>
    <View style={styles.textBox}>
     <Text style={styles.cardTitle}>Citizen or Resident</Text>
     <Text style={styles.cardText}>Individuals holding Nigerian ID or resident documents</Text>
    </View>
    <Ionicons name="chevron-forward" size={28} color="#111"/>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card} onPress={()=>router.push("/select-id?type=visitor")}>
    <Ionicons name="briefcase-outline" size={36} color="#B19700"/>
    <View style={styles.textBox}>
     <Text style={styles.cardTitle}>Visitor</Text>
     <Text style={styles.cardText}>Individuals holding passport issued by countries outside Nigeria</Text>
    </View>
    <Ionicons name="chevron-forward" size={28} color="#111"/>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:24, backgroundColor:"#F7FAF7" },
 title:{ fontSize:36, fontWeight:"400", marginBottom:35 },
 card:{
  backgroundColor:COLORS.white,
  padding:22,
  borderRadius:20,
  marginBottom:22,
  flexDirection:"row",
  alignItems:"center",
  gap:18,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
 },
 textBox:{ flex:1 },
 cardTitle:{ fontSize:22, fontWeight:"900" },
 cardText:{ fontSize:16, color:COLORS.gray, marginTop:6, lineHeight:23 },
});
