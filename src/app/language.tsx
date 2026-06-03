import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import Logo from "../components/Logo";

const languages = ["English", "Hausa", "Yoruba", "Igbo"];

export default function Language(){
 const [selected,setSelected] = useState("English");

 return(
  <View style={styles.container}>

   <Logo />

   <Text style={styles.title}>Welcome to NG PASS</Text>

   <Text style={styles.sub}>
    Nigeria's digital identity for citizens, residents and visitors.
   </Text>

   <Text style={styles.label}>Select Language</Text>

   <View style={styles.box}>
    {languages.map((lang)=>(
     <TouchableOpacity
      key={lang}
      style={styles.row}
      onPress={()=>setSelected(lang)}
     >
      <Text style={styles.lang}>{lang}</Text>

      {selected === lang && (
       <Ionicons name="checkmark-circle" size={24} color={COLORS.primary}/>
      )}
     </TouchableOpacity>
    ))}
   </View>

   <TouchableOpacity
    style={styles.btn}
    onPress={()=>router.push("/terms-check")}
   >
    <Text style={styles.btnText}>Continue</Text>
   </TouchableOpacity>

  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  padding:24,
  backgroundColor:"#EEF8F2",
  justifyContent:"center",
 },

 title:{
  fontSize:30,
  fontWeight:"900",
  textAlign:"center",
  marginTop:20,
 },

 sub:{
  textAlign:"center",
  color:COLORS.gray,
  marginTop:10,
  lineHeight:22,
 },

 label:{
  fontSize:18,
  fontWeight:"900",
  marginTop:35,
  marginBottom:12,
 },

 box:{
  backgroundColor:COLORS.white,
  borderRadius:22,
  padding:8,
 },

 row:{
  padding:18,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
 },

 lang:{
  fontSize:17,
  fontWeight:"700",
 },

 btn:{
  backgroundColor:COLORS.black,
  padding:18,
  borderRadius:18,
  marginTop:30,
 },

 btnText:{
  color:COLORS.white,
  textAlign:"center",
  fontWeight:"900",
  fontSize:16,
 },
});
