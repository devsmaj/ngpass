import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

export default function ScanIDBack(){
 const { doc } = useLocalSearchParams();
 const [permission, requestPermission] = useCameraPermissions();

 const isPassport = doc === "passport";

 if(!permission){
  return <View style={styles.container} />;
 }

 if(!permission.granted){
  return(
   <View style={styles.permission}>
    <Ionicons name="camera-outline" size={70} color={COLORS.primary}/>
    <Text style={styles.permissionTitle}>Camera Permission</Text>
    <Text style={styles.permissionText}>NG PASS needs camera access to scan your document.</Text>

    <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
     <Text style={styles.permissionBtnText}>Allow Camera</Text>
    </TouchableOpacity>
   </View>
  )
 }

 return(
  <View style={styles.container}>
   <CameraView style={styles.camera}>

    <View style={styles.overlay}>

     <Text style={styles.topText}>
      {isPassport
       ? "Please place the personal details page of your passport inside the frame."
       : "Please place the back of your ID inside the frame"}
     </Text>

     <View style={styles.center}>

      {isPassport ? (
       <View style={styles.passportOuter}>
        <View style={styles.passportInner}>
         <Text style={styles.mrz}>{"<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</Text>
        </View>
       </View>
      ) : (
       <View style={styles.idOuter}>
        <View style={styles.idInner}>
         <View style={styles.line} />
         <View style={styles.line} />
         <View style={styles.line} />
        </View>
       </View>
      )}

     </View>

     <TouchableOpacity
      style={styles.captureBtn}
      onPress={()=>router.push("/confirm-details?doc=nin")}
     >
      <Text style={styles.captureText}>Capture & Scan</Text>
     </TouchableOpacity>

     <TouchableOpacity
      style={styles.closeBtn}
      onPress={()=>router.back()}
     >
      <Ionicons name="close-outline" size={55} color="#fff"/>
     </TouchableOpacity>

    </View>

   </CameraView>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, backgroundColor:"#000" },
 camera:{ flex:1 },
 overlay:{ flex:1, backgroundColor:"rgba(0,0,0,0.30)", padding:10 },

 topText:{
  color:"#fff",
  fontSize:20,
  textAlign:"center",
  fontWeight:"700",
  lineHeight:28,
  marginTop:80,
  paddingHorizontal:25,
 },

 center:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
 },

 passportOuter:{
  width:"100%",
  height:250,
  borderWidth:3,
  borderColor:"#fff",
  borderRadius:10,
  justifyContent:"center",
  alignItems:"center",
 },

 passportInner:{
  width:"64%",
  height:130,
  borderWidth:5,
  borderColor:"#fff",
  borderRadius:10,
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:18,
 },

 mrz:{
  color:"#fff",
  fontSize:18,
  letterSpacing:2,
 },

 idOuter:{
  width:"100%",
  height:250,
  borderWidth:3,
  borderColor:"#fff",
  borderRadius:10,
  justifyContent:"center",
  alignItems:"center",
 },

 idInner:{
  width:"92%",
  height:115,
  borderWidth:5,
  borderColor:"#fff",
  borderRadius:10,
  justifyContent:"center",
  paddingHorizontal:18,
  gap:16,
 },

 line:{
  height:4,
  backgroundColor:"#fff",
  borderRadius:10,
  opacity:0.9,
 },

 captureBtn:{
  backgroundColor:"#000",
  padding:18,
  borderRadius:14,
  marginHorizontal:24,
  marginBottom:28,
 },

 captureText:{
  color:"#fff",
  textAlign:"center",
  fontWeight:"900",
  fontSize:16,
 },

 closeBtn:{
  position:"absolute",
  right:18,
  bottom:22,
 },

 permission:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:24,
  backgroundColor:COLORS.background,
 },

 permissionTitle:{
  fontSize:28,
  fontWeight:"900",
  marginTop:20,
 },

 permissionText:{
  color:COLORS.gray,
  textAlign:"center",
  marginTop:10,
  lineHeight:22,
 },

 permissionBtn:{
  backgroundColor:COLORS.primary,
  padding:18,
  borderRadius:16,
  marginTop:30,
  width:"100%",
 },

 permissionBtnText:{
  color:COLORS.white,
  textAlign:"center",
  fontWeight:"900",
 },
});
