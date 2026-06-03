import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import { COLORS } from "../constants/colors";
import { useUser } from "../hooks/useUser";

export default function Unlock(){
 const user = useUser();
 const [pin,setPin] = useState("");

 const name = user?.fullName || "NG PASS User";

 function unlock(){
  if(pin.length !== 4){
   Alert.alert("Invalid PIN","Enter your 4-digit PIN.");
   return;
  }

  router.replace("/(tabs)");
 }

 return(
  <View style={styles.container}>
   <View style={styles.avatar}>
    <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
   </View>

   <Text style={styles.title}>Welcome Back</Text>
   <Text style={styles.name}>{name}</Text>

   <TextInput
    placeholder="Enter PIN"
    keyboardType="numeric"
    secureTextEntry
    maxLength={4}
    value={pin}
    onChangeText={setPin}
    style={styles.input}
   />

   <TouchableOpacity style={styles.btn} onPress={unlock}>
    <Text style={styles.btnText}>Unlock Identity</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, backgroundColor:COLORS.background, alignItems:"center", justifyContent:"center", padding:22 },
 avatar:{ width:100, height:100, borderRadius:60, backgroundColor:"#E8FFF2", alignItems:"center", justifyContent:"center" },
 avatarText:{ fontSize:45, fontWeight:"900", color:COLORS.primary },
 title:{ marginTop:25, fontSize:28, fontWeight:"900" },
 name:{ marginTop:8, marginBottom:25 },
 input:{ width:"100%", backgroundColor:COLORS.white, padding:18, borderRadius:16, textAlign:"center", fontSize:20, marginBottom:20 },
 btn:{ width:"100%", backgroundColor:COLORS.primary, padding:18, borderRadius:18 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
