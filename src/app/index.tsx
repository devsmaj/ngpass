import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { COLORS } from "../constants/colors";

export default function Splash(){

 useEffect(()=>{

  setTimeout(()=>{
    router.replace("/welcome");
  },2500)

 },[])


 return(
  <View style={styles.container}>

   <View style={styles.logoBox}>
    <Text style={styles.logo}>
     NG
    </Text>
   </View>

   <Text style={styles.name}>
    NG PASS
   </Text>

   <Text style={styles.sub}>
    National Digital Identity
   </Text>

  </View>
 )

}


const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:COLORS.primary,
  alignItems:"center",
  justifyContent:"center",
 },

 logoBox:{
  width:120,
  height:120,
  borderRadius:60,
  backgroundColor:COLORS.white,
  alignItems:"center",
  justifyContent:"center",
 },

 logo:{
  color:COLORS.primary,
  fontSize:45,
  fontWeight:"900",
 },

 name:{
  color:COLORS.white,
  fontSize:35,
  fontWeight:"900",
  marginTop:25,
 },

 sub:{
  color:"#E8FFF2",
  marginTop:8,
 }

})
