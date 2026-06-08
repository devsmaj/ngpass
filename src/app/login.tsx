import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import { COLORS } from "../constants/colors";
import { saveUser } from "../services/storage";
import { loginUser } from "../services/api";
import { useLoading } from "../components/LoadingOverlay";

export default function Login(){
 const [contact,setContact] = useState("");
 const [pin,setPin] = useState("");
 const [loading,setLoading] = useState(false);
 const { withLoading } = useLoading();

 async function handleLogin(){
  if(!contact || !pin){
   Alert.alert("Missing","Enter email or phone");
   return;
  }

  setLoading(true);

  const result = await withLoading(async()=>loginUser({ contact, pin }));

  setLoading(false);

  if(result.success){
   await withLoading(async()=>{
    await saveUser(result.user);
    router.replace("/unlock");
   });
  }else{
   Alert.alert("Login Failed", result.message || "Account not found");
  }
 }

 return(
  <View style={styles.container}>
   <Text style={styles.title}>Login NG PASS</Text>
   <Text style={styles.sub}>Access your digital identity.</Text>

   <TextInput
    placeholder="Email or Phone"
    style={styles.input}
    value={contact}
    onChangeText={setContact}
   />

   <TextInput
    placeholder="PIN"
    secureTextEntry
    keyboardType="numeric"
    maxLength={4}
    style={styles.input}
    value={pin}
    onChangeText={setPin}
   />

   <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
    <Text style={styles.btnText}>{loading ? "Checking..." : "Continue"}</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:22, backgroundColor:COLORS.background },
 title:{ marginTop:80, fontSize:32, fontWeight:"900" },
 sub:{ color:COLORS.gray, marginTop:8, marginBottom:30 },
 input:{ backgroundColor:COLORS.white, padding:18, borderRadius:15 },
 btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
