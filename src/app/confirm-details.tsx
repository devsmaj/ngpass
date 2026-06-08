import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { getUser, saveUser } from "../services/storage";
import { useLoading } from "../components/LoadingOverlay";

export default function ConfirmDetails(){
 const { doc } = useLocalSearchParams();
 const passport = doc === "passport";

 const [user,setUser] = useState<any>(null);
 const [editing,setEditing] = useState(false);
 const { withLoading } = useLoading();

 useEffect(()=>{
  async function load(){
   const saved = await getUser();
   setUser(saved);
  }

  load();
 },[]);

 const details = [
  { label:"Full Name", key:"fullName", value:user?.fullName || "Not detected", editable:true },
  { label:passport ? "Passport Number" : "NIN Number", key:"identity", value:user?.identity || "Not detected", editable:true },
  { label:"Nationality", key:"nationality", value:user?.nationality || "Not detected", editable:true },
  { label:"Date of Birth", key:"dateOfBirth", value:user?.dateOfBirth || "Not detected", editable:true },
  { label:"Gender", key:"gender", value:user?.gender || "Not detected", editable:true },
  { label:"Issue Date", key:"issueDate", value:user?.issueDate || "Not detected", editable:true },
  { label:"Expiry Date", key:"expiryDate", value:user?.expiryDate || "Not detected", editable:true },
 ];

 async function continueNext(){
  await withLoading(async()=>{
   await saveUser({
    ...user,
    documentType: passport ? "Passport" : "National ID",
    verified:false,
   });

   router.push("/contact-details" as any);
  });
 }

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>
    {passport ? "Confirm Passport Details" : "Confirm Nigerian ID Details"}
   </Text>

   <Text style={styles.sub}>Review the information extracted from your document.</Text>

   <ScrollView
    style={styles.scroll}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scrollContent}
   >
    <Text style={styles.sectionTitle}>Personal Details</Text>

    {details.map((item)=>(
     <View style={styles.fieldCard} key={item.key}>
      <Text style={styles.label}>{item.label}</Text>
      {editing && item.editable ? (
       <TextInput
        style={styles.input}
        value={String(item.value)}
        onChangeText={(txt)=>{
         setUser({...user,[item.key]:txt})
        }}
       />
      ) : (
       <Text style={styles.value}>{item.value}</Text>
      )}
     </View>
    ))}
   </ScrollView>

   <TouchableOpacity
    style={styles.editBtn}
    onPress={()=>setEditing(!editing)}
   >
    <Text style={styles.editText}>
     {editing ? "Done Editing" : "Edit Details"}
    </Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.btn} onPress={continueNext}>
    <Text style={styles.btnText}>Confirm & Continue</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, paddingHorizontal:28, backgroundColor:"#F7FAF7" },
 title:{ fontSize:28, fontWeight:"900", marginBottom:18 },
 sub:{ color:"#333", fontSize:18, lineHeight:26, marginBottom:42 },
 scroll:{ flex:1 },
 scrollContent:{ paddingBottom:8 },
 sectionTitle:{ fontSize:18, fontWeight:"900", marginBottom:18 },
 fieldCard:{
  backgroundColor:COLORS.white,
  borderRadius:18,
  paddingHorizontal:24,
  paddingVertical:18,
  marginBottom:12,
  minHeight:78,
  justifyContent:"center",
 },
 label:{ color:"#9A9A9A", fontSize:16 },
 value:{ marginTop:8, fontSize:18, color:"#111" },
 btn:{ backgroundColor:COLORS.black, padding:19, borderRadius:14, marginBottom:34 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900", fontSize:18 },

 input:{
  fontSize:18,
  color:"#111",
  padding:0,
  marginTop:8,
 },

 editBtn:{
  padding:18,
 },

 editText:{
  textAlign:"center",
  fontWeight:"900",
  color:COLORS.primary,
 },
});
