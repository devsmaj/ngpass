import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function Help() {
 return (
  <View style={styles.container}>

   <BackButton />

   <Text style={styles.title}>
    Help & Support
   </Text>

   <Text style={styles.sub}>
    Get help using NG PASS services.
   </Text>


   <View style={styles.card}>
    <Ionicons name="help-circle-outline" size={25} color={COLORS.primary}/>
    <View>
     <Text style={styles.cardTitle}>FAQs</Text>
     <Text style={styles.cardSub}>Common questions and answers</Text>
    </View>
   </View>


   <View style={styles.card}>
    <Ionicons name="mail-outline" size={25} color={COLORS.primary}/>
    <View>
     <Text style={styles.cardTitle}>Contact Support</Text>
     <Text style={styles.cardSub}>Reach NG PASS support team</Text>
    </View>
   </View>


   <View style={styles.card}>
    <Ionicons name="information-circle-outline" size={25} color={COLORS.primary}/>
    <View>
     <Text style={styles.cardTitle}>About NG PASS</Text>
     <Text style={styles.cardSub}>Version 1.0.0</Text>
    </View>
   </View>


  </View>
 )
}


const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:22,
  backgroundColor:COLORS.background,
 },

 title:{
  fontSize:30,
  fontWeight:"900",
 },

 sub:{
  color:COLORS.gray,
  marginTop:8,
  marginBottom:25,
 },

 card:{
  backgroundColor:COLORS.white,
  padding:18,
  borderRadius:18,
  marginBottom:14,
  flexDirection:"row",
  gap:12,
  alignItems:"center",
 },

 cardTitle:{
  fontSize:16,
  fontWeight:"900",
 },

 cardSub:{
  color:COLORS.gray,
  marginTop:4,
 }

});
