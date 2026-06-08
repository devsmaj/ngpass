import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

const languages = ["English", "Hausa", "Yoruba", "Igbo"];

export default function Language(){
 const [selected,setSelected] = useState("English");

 return(
  <View style={styles.container}>

   <View style={styles.hero}>
    <View style={styles.heroCircle}>
     <Image
      source={require("../../assets/images/fingerprint-mark.png")}
      style={styles.fingerprint}
      resizeMode="contain"
     />
    </View>

    <View style={[styles.floatIcon, styles.floatUser]}>
     <Ionicons name="person-circle-outline" size={30} color={COLORS.primary}/>
    </View>

    <View style={[styles.floatIcon, styles.floatScan]}>
     <Ionicons name="scan-outline" size={28} color={COLORS.primary}/>
    </View>

    <View style={[styles.floatIcon, styles.floatLock]}>
     <Ionicons name="lock-closed-outline" size={27} color={COLORS.primary}/>
    </View>
   </View>

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

   <View style={styles.footer}>
    <Text style={styles.footerText}>Copyright © 2026 NG PASS. All rights reserved.</Text>
    <Text style={styles.footerText}>Version 1.0.0</Text>
   </View>

  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  padding:24,
  backgroundColor:"#EEF8F2",
  justifyContent:"flex-start",
 },

 hero:{
  height:210,
  alignItems:"center",
  justifyContent:"center",
  marginTop:34,
 },

 heroCircle:{
  width:156,
  height:156,
  borderRadius:78,
  backgroundColor:COLORS.primary,
  alignItems:"center",
  justifyContent:"center",
  shadowColor:"#003D25",
  shadowOpacity:0.18,
  shadowRadius:22,
  shadowOffset:{ width:0, height:14 },
  elevation:10,
 },

 fingerprint:{
  width:96,
  height:116,
  tintColor:COLORS.white,
 },

 floatIcon:{
  position:"absolute",
  width:56,
  height:56,
  borderRadius:28,
  backgroundColor:COLORS.white,
  alignItems:"center",
  justifyContent:"center",
  borderWidth:1,
  borderColor:"#DCEBE4",
  shadowColor:"#003D25",
  shadowOpacity:0.10,
  shadowRadius:12,
  shadowOffset:{ width:0, height:7 },
  elevation:6,
 },

 floatUser:{
  top:14,
  right:74,
 },

 floatScan:{
  left:70,
  bottom:24,
 },

 floatLock:{
  right:74,
  bottom:18,
 },

 title:{
  fontSize:30,
  fontWeight:"900",
  textAlign:"center",
  marginTop:8,
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
  marginTop:28,
  marginBottom:10,
 },

 box:{
  backgroundColor:COLORS.white,
  borderRadius:18,
  paddingVertical:4,
  paddingHorizontal:8,
 },

 row:{
  paddingVertical:12,
  paddingHorizontal:12,
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
  marginTop:24,
 },

 btnText:{
  color:COLORS.white,
  textAlign:"center",
  fontWeight:"900",
  fontSize:16,
 },

 footer:{
  marginTop:"auto",
  paddingTop:18,
  paddingBottom:4,
 },

 footerText:{
  color:"#7A8A82",
  textAlign:"center",
  fontSize:12,
  lineHeight:18,
 },
});
