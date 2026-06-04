import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { getUser, saveUser } from "../services/storage";

export default function ConfirmDetails(){
 const { doc } = useLocalSearchParams();
 const passport = doc === "passport";

 const [user,setUser] = useState<any>(null);
 const [editing,setEditing] = useState(false);

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
  { label:"Document Type", key:"documentType", value:passport ? "Passport" : "National ID", editable:false },
 ];

 async function continueNext(){
  await saveUser({
   ...user,
   documentType: passport ? "Passport" : "National ID",
   verified:false,
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
     <View style={styles.row} key={item.key}>
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
 container:{ flex:1, padding:24, backgroundColor:"#F7FAF7" },
 title:{ fontSize:34, fontWeight:"900" },
 sub:{ color:COLORS.gray, marginTop:8, marginBottom:25 },
 card:{ backgroundColor:COLORS.white, borderRadius:24, padding:20 },
 row:{ paddingVertical:16, borderBottomWidth:1, borderBottomColor:"#eee" },
 label:{ color:COLORS.gray },
 value:{ marginTop:6, fontSize:18, fontWeight:"900" },
 btn:{ backgroundColor:COLORS.black, padding:18, borderRadius:15, marginTop:20 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },

 input:{
  fontSize:18,
  backgroundColor:"#eee",
  padding:10,
  borderRadius:10,
  marginTop:6,
 },

 editBtn:{
  padding:15,
  marginTop:15,
 },

 editText:{
  textAlign:"center",
  fontWeight:"900",
  color:COLORS.primary,
 },
});
