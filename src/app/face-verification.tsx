import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function FaceVerification(){

 return(
  <View style={styles.container}>

   <BackButton />

   <Text style={styles.title}>
    Face Verification
   </Text>

   <Text style={styles.sub}>
    Confirm your identity securely.
   </Text>


   <View style={styles.faceBox}>

    <Ionicons
     name="scan-outline"
     size={120}
     color={COLORS.primary}
    />

    <Text style={styles.text}>
     Position your face inside the frame
    </Text>

   </View>


   <TouchableOpacity style={styles.btn} onPress={() => router.push("/(tabs)")}>
    <Text style={styles.btnText}>
     Start Verification
    </Text>
   </TouchableOpacity>


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
  marginTop:8,
  color:COLORS.gray,
 },


 faceBox:{
  marginTop:40,
  height:330,
  backgroundColor:COLORS.white,
  borderRadius:30,
  alignItems:"center",
  justifyContent:"center",
  gap:15,
 },


 text:{
  color:COLORS.gray,
 },


 btn:{
  backgroundColor:COLORS.primary,
  padding:18,
  borderRadius:18,
  marginTop:25,
 },


 btnText:{
  color:COLORS.white,
  textAlign:"center",
  fontWeight:"900",
 }

});
