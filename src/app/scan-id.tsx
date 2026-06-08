import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

import { COLORS } from "../constants/colors";
import { scanDocument } from "../services/api";
import { saveUser } from "../services/storage";
import { useLoading } from "../components/LoadingOverlay";

export default function ScanID(){
 const { doc } = useLocalSearchParams();
 const [permission, requestPermission] = useCameraPermissions();
 const cameraRef = useRef<any>(null);
 const [scanning,setScanning] = useState(false);
 const { width, height } = useWindowDimensions();
 const { withLoading } = useLoading();

 const isPassport = doc === "passport";
 const frameWidth = width * 0.98;
 const frameHeight = Math.min(height * 0.31, frameWidth / 1.43);
 const frameTop = height * 0.38;
 const instructionTop = height * 0.19;
 const passportInnerWidth = frameWidth * 0.63;
 const passportInnerHeight = frameHeight * 0.56;
 const idInnerHeight = frameHeight * 0.76;

 async function capture(){
  setScanning(true);

  try{
   await withLoading(async()=>{
    const photo = await cameraRef.current?.takePictureAsync({ quality:0.7 });

    if(photo?.uri){
     const result = await scanDocument(photo.uri);

     if(result.success){
      await saveUser({
       ...result.details,
       documentType: isPassport ? "Passport" : "National ID",
       verified:false,
      });
     }
    }

    if(isPassport){
     router.push(`/confirm-details?doc=${doc}`);
    }else{
     router.push("/scan-id-back");
    }
   });
  }finally{
   setScanning(false);
  }
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
    ref={cameraRef}
    style={StyleSheet.absoluteFill}
    facing="back"
   />

   <View style={styles.overlay}>
    <Text style={[styles.topText, { top:instructionTop }]}>
     {isPassport
      ? "Please place the personal details page of your passport inside the frame."
      : "Please place the front of your ID inside the frame"}
    </Text>

     <View style={[styles.center, { top:frameTop }]}>
      {isPassport ? (
       <View style={[styles.passportOuter, { width:frameWidth, height:frameHeight }]}>
        <View style={styles.passportPageLeft} />
        <View style={styles.passportPageRight} />
        <View style={[styles.passportInner, { width:passportInnerWidth, height:passportInnerHeight }]}>
         <View style={styles.passportTopRule} />
         <View style={styles.passportPhotoRule} />
         <Text style={styles.mrz}>{"<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</Text>
         <Text style={styles.mrz}>{"<<<<<<<<<<<<<<<<<<<<<<<<<<<"}</Text>
        </View>
       </View>
      ) : (
       <View style={[styles.idOuter, { width:frameWidth, height:frameHeight }]}>
        <View style={[styles.idInner, { height:idInnerHeight }]}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
       </View>
      </View>
     )}
    </View>

    <TouchableOpacity style={styles.captureBtn} onPress={capture} disabled={scanning}>
     <Text style={styles.captureText}>{scanning ? "Scanning..." : "Capture & Scan"}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.closeBtn} onPress={()=>router.back()}>
     <Ionicons name="close-outline" size={55} color="#fff"/>
    </TouchableOpacity>
   </View>

  </View>
 )
}


const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#000"
 },

 overlay:{
  position:"absolute",
  top:0,
  right:0,
  bottom:0,
  left:0,
  backgroundColor:"rgba(0,0,0,0.35)",
 },

 topText:{
  position:"absolute",
  width:"100%",
  color:"#fff",
  fontSize:20,
  textAlign:"center",
  fontWeight:"600",
  lineHeight:28,
  paddingHorizontal:54,
 },

 center:{
  position:"absolute",
  width:"100%",
  alignItems:"center",
 },

 passportOuter:{
  borderWidth:3,
  borderColor:"#fff",
  borderRadius:7,
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:8,
 },

 passportInner:{
  borderWidth:5,
  borderColor:"#fff",
  borderRadius:14,
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:16,
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
  top:18,
  left:0,
  right:0,
  height:3,
  backgroundColor:"#fff",
 },

 passportPhotoRule:{
  position:"absolute",
  top:52,
  left:0,
  right:0,
  height:2,
  backgroundColor:"rgba(255,255,255,0.9)",
 },

 mrz:{
  color:"#fff",
  fontSize:13,
  letterSpacing:2.6,
  lineHeight:17,
 },


 idOuter:{
  borderWidth:3,
  borderColor:"#fff",
  borderRadius:7,
  justifyContent:"center",
  alignItems:"center",
 },

 idInner:{
  width:"92%",
  borderWidth:5,
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
  fontSize:16,
  fontWeight:"900",
 },

 closeBtn:{
  position:"absolute",
  right:22,
  bottom:18,
 },

 permission:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
 },

 permissionTitle:{
  fontSize:25,
  fontWeight:"900",
 },

 permissionText:{
  textAlign:"center",
 },

 permissionBtn:{
  marginTop:20,
 },

 permissionBtnText:{
  fontWeight:"900",
 }

});
