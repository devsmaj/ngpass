import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function Register(){
 return(
  <View style={styles.container}>

   <Text style={styles.title}>Create NG PASS</Text>

   <Text style={styles.sub}>
    Verify your identity securely.
   </Text>


   <TextInput
    placeholder="Full Name"
    style={styles.input}
   />


   <TextInput
    placeholder="Email or Phone Number"
    style={styles.input}
   />


   <TextInput
    placeholder="NIN / Passport / Resident ID"
    style={styles.input}
   />


   <View style={styles.verifyBox}>

    <Ionicons 
     name="scan-outline"
     size={35}
     color={COLORS.primary}
    />

    <View>
     <Text style={styles.verifyTitle}>
      Face Verification
     </Text>

     <Text style={styles.verifySub}>
      Confirm your identity
     </Text>
    </View>

   </View>


   <Link href="/pin-setup" asChild>
    <TouchableOpacity style={styles.btn}>
     <Text style={styles.btnText}>
      Create Secure Identity
     </Text>
    </TouchableOpacity>
   </Link>


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
  marginTop:70,
  fontSize:32,
  fontWeight:"900",
 },


 sub:{
  marginTop:8,
  color:COLORS.gray,
  marginBottom:25,
 },


 input:{
  backgroundColor:COLORS.white,
  padding:18,
  borderRadius:15,
  marginBottom:14,
 },


 verifyBox:{
  backgroundColor:COLORS.white,
  padding:18,
  borderRadius:18,
  flexDirection:"row",
  gap:15,
  alignItems:"center",
 },


 verifyTitle:{
  fontWeight:"900",
  fontSize:16,
 },


 verifySub:{
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

})
