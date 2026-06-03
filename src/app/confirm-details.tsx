import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { saveUser } from "../services/storage";

export default function ConfirmDetails(){

 const { doc } = useLocalSearchParams();

 const passport = doc === "passport";

 const details = passport
 ? [
   ["Full Name","John Visitor"],
   ["Passport Number","A12345678"],
   ["Nationality","United Kingdom"],
   ["Date of Birth","01 Jan 2000"],
   ["Expiry Date","01 Jan 2030"],
   ["Document Type","Passport"],
  ]
 : [
   ["Full Name","Saleh Mala Ajimi"],
   ["NIN Number","12345678901"],
   ["Nationality","Nigeria"],
   ["Date of Birth","01 Jan 2008"],
   ["Gender","Male"],
   ["Document Type","National ID"],
  ];


 async function continueNext(){

  await saveUser({
   fullName: details[0][1],
   identity: details[1][1],
   documentType: details[5][1],
   verified:true,
  });

  router.push("/face-verification");

 }


 return(
  <View style={styles.container}>

   <BackButton />

   <Text style={styles.title}>
    {passport ? "Confirm Passport Details" : "Confirm Nigerian ID Details"}
   </Text>

   <Text style={styles.sub}>
    Review the information extracted from your document.
   </Text>


   <ScrollView style={styles.card}>

    <Ionicons
     name="checkmark-circle"
     size={55}
     color={COLORS.primary}
     style={{alignSelf:"center"}}
    />

    {details.map((item)=>(
     <View style={styles.row} key={item[0]}>
      <Text style={styles.label}>{item[0]}</Text>
      <Text style={styles.value}>{item[1]}</Text>
     </View>
    ))}

   </ScrollView>


   <TouchableOpacity
    style={styles.btn}
    onPress={continueNext}
   >
    <Text style={styles.btnText}>
     Confirm & Continue
    </Text>
   </TouchableOpacity>

  </View>
 )
}


const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:24,
  backgroundColor:"#F7FAF7",
 },

 title:{
  fontSize:34,
  fontWeight:"900",
 },

 sub:{
  color:COLORS.gray,
  marginTop:8,
  marginBottom:25,
 },

 card:{
  backgroundColor:COLORS.white,
  borderRadius:24,
  padding:20,
 },

 row:{
  paddingVertical:16,
  borderBottomWidth:1,
  borderBottomColor:"#eee",
 },

 label:{
  color:COLORS.gray,
 },

 value:{
  marginTop:6,
  fontSize:18,
  fontWeight:"900",
 },

 btn:{
  backgroundColor:COLORS.black,
  padding:18,
  borderRadius:15,
  marginTop:20,
 },

 btnText:{
  color:COLORS.white,
  textAlign:"center",
  fontWeight:"900",
 }

});
