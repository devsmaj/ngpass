import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { useLoading } from "../components/LoadingOverlay";

export default function SignupGuide(){
 const { showLoading, hideLoading } = useLoading();

 function continueNext(){
  showLoading();

  setTimeout(()=>{
   router.push("/proceed-as");
   hideLoading();
  },300);
 }

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Sign Up Easily</Text>

   <View style={styles.step}>
    <Ionicons name="scan-outline" size={30} color={COLORS.white} style={styles.icon}/>
    <View>
     <Text style={styles.stepTitle}>Scan Identity</Text>
     <Text style={styles.stepText}>Use Nigerian ID, resident document, or passport.</Text>
    </View>
   </View>

   <View style={styles.step}>
    <Ionicons name="person-circle-outline" size={30} color={COLORS.white} style={styles.icon}/>
    <View>
     <Text style={styles.stepTitle}>Verify Details</Text>
     <Text style={styles.stepText}>Review extracted information before proceeding.</Text>
    </View>
   </View>

   <View style={styles.step}>
    <Ionicons name="lock-closed-outline" size={30} color={COLORS.white} style={styles.icon}/>
    <View>
     <Text style={styles.stepTitle}>Secure Account</Text>
     <Text style={styles.stepText}>Proceed with face verification and secure access.</Text>
    </View>
   </View>

   <TouchableOpacity style={styles.btn} onPress={continueNext}>
    <Text style={styles.btnText}>Continue</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:24, backgroundColor:"#F7FAF7" },
 title:{ fontSize:34, fontWeight:"900", textAlign:"center", marginTop:40, marginBottom:45 },
 step:{ flexDirection:"row", gap:18, marginBottom:35, alignItems:"center" },
 icon:{ backgroundColor:COLORS.primary, padding:16, borderRadius:40 },
 stepTitle:{ fontSize:22, fontWeight:"900" },
 stepText:{ fontSize:16, color:COLORS.gray, marginTop:6, maxWidth:260, lineHeight:23 },
 btn:{ backgroundColor:COLORS.black, padding:18, borderRadius:14, marginTop:"auto" },
 btnText:{ color:COLORS.white, textAlign:"center", fontSize:17, fontWeight:"900" },
});
