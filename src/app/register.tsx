import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import { registerUser } from "../services/api";
import { saveUser } from "../services/storage";

export default function Register(){
 const [fullName,setFullName] = useState("");
 const [contact,setContact] = useState("");
 const [identity,setIdentity] = useState("");
 const [pin,setPin] = useState("");
 const [loading,setLoading] = useState(false);

 async function handleRegister(){

  if(!fullName || !contact || !identity || !pin){
   Alert.alert("Missing Information","Please fill all fields.");
   return;
  }

  setLoading(true);

  const result = await registerUser({
   fullName,
   contact,
   identity,
   pin,
  });

  setLoading(false);

  if(result.success){
   await saveUser({
    fullName,
    contact,
    identity,
    verified:false,
   });

   router.push("/face-verification");
  }else{
   Alert.alert("Error","Registration failed");
  }
 }

 return(
  <View style={styles.container}>
   <Text style={styles.title}>Create NG PASS</Text>
   <Text style={styles.sub}>Verify your identity securely.</Text>

   <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName}/>
   <TextInput placeholder="Email or Phone Number" style={styles.input} value={contact} onChangeText={setContact}/>
   <TextInput placeholder="NIN / Passport / Resident ID" style={styles.input} value={identity} onChangeText={setIdentity}/>

   <TextInput
    placeholder="Create 4-digit PIN"
    keyboardType="numeric"
    secureTextEntry
    maxLength={4}
    style={styles.input}
    value={pin}
    onChangeText={setPin}
   />

   <View style={styles.termsBox}>
    <Text style={styles.termsText}>By continuing, you agree to NG PASS secure identity verification.</Text>
    <Text style={styles.termsLink} onPress={() => router.push("/terms")}>View Terms & Privacy</Text>
   </View>

   <View style={styles.verifyBox}>
    <Ionicons name="scan-outline" size={35} color={COLORS.primary}/>
    <View>
     <Text style={styles.verifyTitle}>Face Verification</Text>
     <Text style={styles.verifySub}>Confirm your identity</Text>
    </View>
   </View>

   <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
    <Text style={styles.btnText}>{loading ? "Creating..." : "Create Secure Identity"}</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:22, backgroundColor:COLORS.background },
 title:{ marginTop:70, fontSize:32, fontWeight:"900" },
 sub:{ marginTop:8, color:COLORS.gray, marginBottom:25 },
 input:{ backgroundColor:COLORS.white, padding:18, borderRadius:15, marginBottom:14 },
 termsBox:{ backgroundColor:"#E8FFF2", padding:14, borderRadius:14, marginBottom:14 },
 termsText:{ color:COLORS.gray, fontSize:12, lineHeight:18 },
 termsLink:{ color:COLORS.primary, fontWeight:"900", marginTop:8 },
 verifyBox:{ backgroundColor:COLORS.white, padding:18, borderRadius:18, flexDirection:"row", gap:15, alignItems:"center" },
 verifyTitle:{ fontWeight:"900", fontSize:16 },
 verifySub:{ color:COLORS.gray },
 btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
