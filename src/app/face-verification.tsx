import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";

export default function FaceVerification(){
 const [permission, requestPermission] = useCameraPermissions();

 if(!permission){
  return <View style={styles.container} />;
 }

 if(!permission.granted){
  return(
   <View style={styles.permission}>
    <Ionicons name="camera-outline" size={70} color={COLORS.primary}/>
    <Text style={styles.permissionTitle}>Camera Permission</Text>
    <Text style={styles.permissionText}>NG PASS needs camera access for face verification.</Text>

    <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
     <Text style={styles.permissionBtnText}>Allow Camera</Text>
    </TouchableOpacity>
   </View>
  )
 }

 return(
  <View style={styles.container}>
   <CameraView style={styles.camera} facing="front">
    <View style={styles.overlay}>
     <Text style={styles.title}>Face Verification</Text>
     <Text style={styles.sub}>Position your face inside the frame.</Text>

     <View style={styles.center}>
      <View style={styles.faceFrame}>
       <Ionicons name="person-outline" size={90} color="#fff" />
      </View>
     </View>

     <TouchableOpacity style={styles.btn} onPress={()=>router.replace("/(tabs)")}>
      <Text style={styles.btnText}>Verify Face</Text>
     </TouchableOpacity>
    </View>
   </CameraView>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, backgroundColor:"#000" },
 camera:{ flex:1 },
 overlay:{ flex:1, padding:24, backgroundColor:"rgba(0,0,0,0.30)" },
 title:{ color:"#fff", fontSize:32, fontWeight:"900", marginTop:70 },
 sub:{ color:"#ddd", fontSize:16, marginTop:8 },
 center:{ flex:1, alignItems:"center", justifyContent:"center" },
 faceFrame:{
  width:260,
  height:330,
  borderWidth:4,
  borderColor:"#fff",
  borderRadius:140,
  alignItems:"center",
  justifyContent:"center",
 },
 btn:{ backgroundColor:COLORS.white, padding:18, borderRadius:16, marginBottom:25 },
 btnText:{ color:COLORS.black, textAlign:"center", fontWeight:"900", fontSize:16 },

 permission:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:24,
  backgroundColor:COLORS.background,
 },
 permissionTitle:{ fontSize:28, fontWeight:"900", marginTop:20 },
 permissionText:{ color:COLORS.gray, textAlign:"center", marginTop:10 },
 permissionBtn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:16, marginTop:30, width:"100%" },
 permissionBtnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
