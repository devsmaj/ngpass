import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import { useLoading } from "../components/LoadingOverlay";

export default function ScanIDBack(){
 const { doc } = useLocalSearchParams();
 const [permission, requestPermission] = useCameraPermissions();
 const { showLoading, hideLoading } = useLoading();

 const isPassport = doc === "passport";

 function finishBackScan(){
  showLoading();

  setTimeout(()=>{
   router.push("/confirm-details?doc=nin");
   hideLoading();
  },300);
 }

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
   <CameraView
    style={StyleSheet.absoluteFill}
    facing="back"
   />

   <View style={styles.overlay}>

    <Text style={styles.topText}>
     {isPassport
      ? "Please place the personal details page of your passport inside the frame."
      : "Please place the back of your ID inside the frame"}
    </Text>

    <View style={styles.center}>

     {isPassport ? (
      <View style={styles.passportOuter}>
       <View style={styles.passportPageLeft} />
       <View style={styles.passportPageRight} />
       <View style={styles.passportInner}>
        <View style={styles.passportTopRule} />
        <View style={styles.passportPhotoRule} />
        <Text style={styles.mrz}>{"<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</Text>
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
      onPress={finishBackScan}
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
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, backgroundColor:"#000" },
 overlay:{
  position:"absolute",
  top:0,
  right:0,
  bottom:0,
  left:0,
  backgroundColor:"rgba(0,0,0,0.30)",
 },

 topText:{
  position:"absolute",
  top:88,
  width:"100%",
  color:"#fff",
  fontSize:21,
  textAlign:"center",
  fontWeight:"600",
  lineHeight:29,
  paddingHorizontal:42,
 },

 center:{
  position:"absolute",
  top:"37.5%",
  width:"100%",
  alignItems:"center",
 },

 passportOuter:{
  width:"98%",
  aspectRatio:1.44,
  borderWidth:2.5,
  borderColor:"#fff",
  borderRadius:7,
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:8,
 },

 passportInner:{
  width:"64%",
  aspectRatio:1.6,
  borderWidth:4.5,
  borderColor:"#fff",
  borderRadius:13,
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:18,
  overflow:"hidden",
 },

 passportPageLeft:{
  position:"absolute",
  top:0,
  bottom:"47%",
  left:"22%",
  width:2,
  backgroundColor:"rgba(255,255,255,0.85)",
 },

 passportPageRight:{
  position:"absolute",
  top:0,
  bottom:"47%",
  right:"22%",
  width:2,
  backgroundColor:"rgba(255,255,255,0.85)",
 },

 passportTopRule:{
  position:"absolute",
  top:20,
  left:0,
  right:0,
  height:3,
  backgroundColor:"#fff",
 },

 passportPhotoRule:{
  position:"absolute",
  top:55,
  left:0,
  right:0,
  height:2,
  backgroundColor:"rgba(255,255,255,0.9)",
 },

 mrz:{
  color:"#fff",
  fontSize:14,
  letterSpacing:2.8,
  lineHeight:18,
 },

 idOuter:{
  width:"98%",
  aspectRatio:1.44,
  borderWidth:2.5,
  borderColor:"#fff",
  borderRadius:7,
  justifyContent:"center",
  alignItems:"center",
 },

 idInner:{
  width:"92%",
  height:"76%",
  borderWidth:4.5,
  borderColor:"#fff",
  borderRadius:16,
  justifyContent:"flex-end",
  paddingHorizontal:24,
  paddingBottom:"11%",
  overflow:"hidden",
 },

 line:{
  height:3,
  backgroundColor:"#fff",
  borderRadius:20,
  marginTop:16,
  width:"100%",
 },

 captureBtn:{
  position:"absolute",
  bottom:82,
  alignSelf:"center",
  width:"88%",
  height:72,
  backgroundColor:"transparent",
 },

 captureText:{
  color:"transparent",
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
