import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";

export default function TermsCheck(){
 const [accepted,setAccepted] = useState(false);

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Terms & Conditions</Text>

   <ScrollView style={styles.content}>
    <Text style={styles.heading}>NG PASS Terms of Use</Text>
    <Text style={styles.version}>Version 1.0</Text>

    <Text style={styles.text}>
     Welcome to NG PASS. NG PASS is a digital identity prototype designed for secure access, document verification, and identity services.
    </Text>

    <Text style={styles.text}>
     This project is not an official government identity platform unless future approval or partnership is granted.
    </Text>

    <Text style={styles.text}>
     By continuing, you agree that your identity information may be processed for verification and account creation.
    </Text>
   </ScrollView>

   <View style={styles.acceptRow}>
    <Switch value={accepted} onValueChange={setAccepted} />
    <Text style={styles.acceptText}>I have read the Terms & Conditions</Text>
   </View>

   <TouchableOpacity
    disabled={!accepted}
    style={[styles.btn, !accepted && styles.disabled]}
    onPress={()=>router.push("/signup-guide")}
   >
    <Text style={styles.btnText}>Accept</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:24, backgroundColor:"#F7FAF7" },
 title:{ fontSize:34, fontWeight:"800", marginBottom:25 },
 content:{ flex:1 },
 heading:{ fontSize:22, fontWeight:"900", marginBottom:20 },
 version:{ fontSize:20, fontWeight:"800", marginBottom:25 },
 text:{ fontSize:17, lineHeight:26, marginBottom:18, color:"#222" },
 acceptRow:{ flexDirection:"row", alignItems:"center", gap:12, marginVertical:18 },
 acceptText:{ fontSize:16, fontWeight:"800", flex:1 },
 btn:{ backgroundColor:COLORS.black, padding:18, borderRadius:14 },
 disabled:{ backgroundColor:"#D8D8D8" },
 btnText:{ color:COLORS.white, textAlign:"center", fontSize:16, fontWeight:"900" },
});
