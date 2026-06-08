import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { useLoading } from "../components/LoadingOverlay";

export default function SelectID(){

 const { type } = useLocalSearchParams();
 const { showLoading, hideLoading } = useLoading();

 function navigate(path:string){
  showLoading();

  setTimeout(()=>{
   router.push(path as any);
   hideLoading();
  },300);
 }

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Select ID Type</Text>


   {type !== "visitor" && (
    <TouchableOpacity style={styles.card} onPress={()=>navigate("/scan-intro?doc=nin")}>
     <Ionicons name="card-outline" size={34} color={COLORS.primary}/>
     <View style={styles.textBox}>
      <Text style={styles.cardTitle}>Nigerian ID / NIN</Text>
      <Text style={styles.cardText}>For citizens and residents</Text>
     </View>
    </TouchableOpacity>
   )}


   <TouchableOpacity style={styles.card} onPress={()=>navigate("/scan-intro?doc=passport")}>
    <Ionicons name="book-outline" size={34} color={COLORS.primary}/>
    <View style={styles.textBox}>
     <Text style={styles.cardTitle}>Passport</Text>
     <Text style={styles.cardText}>Scan your passport information page</Text>
    </View>
   </TouchableOpacity>

  </View>
 )
}


const styles = StyleSheet.create({
 container:{ flex:1, padding:24, backgroundColor:"#F7FAF7" },
 title:{ fontSize:34, fontWeight:"900", marginBottom:30 },

 card:{
  backgroundColor:COLORS.white,
  padding:20,
  borderRadius:20,
  marginBottom:18,
  flexDirection:"row",
  gap:16,
  alignItems:"center",
 },

 textBox:{flex:1},

 cardTitle:{
  fontSize:20,
  fontWeight:"900",
 },

 cardText:{
  color:COLORS.gray,
  marginTop:5,
 }
});
