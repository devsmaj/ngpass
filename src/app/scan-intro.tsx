import { Image, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { useLoading } from "../components/LoadingOverlay";

export default function ScanIntro(){
 const { doc } = useLocalSearchParams();
 const isPassport = doc === "passport";
 const { showLoading, hideLoading } = useLoading();
 const { height } = useWindowDimensions();
 const artHeight = Math.max(240, Math.min(540, height * 0.34));

 const title = isPassport ? "Passport" : "Nigerian ID";
 const heading = isPassport ? "Scan Your Passport" : "Scan Your Nigerian ID";
 const subtitle = isPassport
  ? "Use your device's camera to scan your passport"
  : "Use your device's camera to scan your Nigerian ID";

 function scanNow(){
  showLoading();

  setTimeout(()=>{
   router.push(isPassport ? "/scan-id?doc=passport" : "/scan-id?doc=nin");
   hideLoading();
  },300);
 }

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>{title}</Text>

   <View style={styles.progress}>
    <View style={[styles.progressIcon, styles.progressIconActive]}>
     <Ionicons name="scan-outline" size={28} color={COLORS.white}/>
    </View>
    <View style={styles.progressLine} />
    <View style={styles.progressIcon}>
     <Ionicons name="person-circle-outline" size={28} color={COLORS.white}/>
    </View>
    <View style={styles.progressLine} />
    <View style={styles.progressIcon}>
     <Ionicons name="lock-closed" size={26} color={COLORS.white}/>
    </View>
   </View>

   <Text style={styles.heading}>{heading}</Text>
   <Text style={styles.subtitle}>{subtitle}</Text>

   <View style={[styles.artWrap, { height:artHeight }]}>
    <Image
     source={isPassport
      ? require("../../assets/images/scan-passport-art.png")
      : require("../../assets/images/scan-id-art.png")}
     style={[styles.scanArt, { height:artHeight }]}
     resizeMode="contain"
    />
   </View>

   <TouchableOpacity style={styles.btn} onPress={scanNow}>
    <Text style={styles.btnText}>Scan Now</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  paddingHorizontal:24,
  backgroundColor:"#F7FAF7",
 },

 title:{
  fontSize:36,
  fontWeight:"400",
  marginBottom:28,
  color:COLORS.black,
 },

 progress:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:24,
 },

 progressIcon:{
  width:58,
  height:58,
  borderRadius:29,
  backgroundColor:"#777",
  borderWidth:4,
  borderColor:"#D6E8E1",
  alignItems:"center",
  justifyContent:"center",
 },

 progressIconActive:{
  backgroundColor:"#2BC28B",
 },

 progressLine:{
  width:70,
  height:3,
  backgroundColor:"#B9C4C0",
 },

 heading:{
  fontSize:38,
  fontWeight:"400",
  color:"#000",
  lineHeight:46,
 },

 subtitle:{
  fontSize:20,
  lineHeight:30,
  color:"#111",
  marginTop:12,
  maxWidth:340,
 },

 artWrap:{
  alignItems:"center",
  justifyContent:"center",
  marginTop:18,
  marginBottom:18,
 },

 scanArt:{
  width:"100%",
 },

 passportBook:{
  width:314,
  height:214,
  borderRadius:8,
  backgroundColor:"#F5FAFA",
  borderWidth:3,
  borderColor:"#6280B5",
  transform:[{ rotate:"-14deg" }],
  overflow:"hidden",
  shadowColor:"#0A3022",
  shadowOpacity:0.12,
  shadowRadius:18,
  shadowOffset:{ width:0, height:12 },
 },

 passportPattern:{
  flex:1,
  backgroundColor:"#EEF5F6",
  borderBottomWidth:4,
  borderBottomColor:"#6E83B7",
 },

 mapBlock:{
  position:"absolute",
  backgroundColor:"#CAD8E0",
  opacity:0.85,
 },

 mapOne:{
  left:70,
  top:34,
  width:70,
  height:44,
  borderRadius:22,
 },

 mapTwo:{
  left:150,
  top:48,
  width:62,
  height:52,
  borderRadius:18,
 },

 mapThree:{
  right:36,
  top:30,
  width:50,
  height:42,
  borderRadius:16,
 },

 passportRule:{
  position:"absolute",
  top:110,
  left:0,
  right:0,
  height:4,
  backgroundColor:"#6E83B7",
 },

 passportDetails:{
  position:"absolute",
  left:18,
  right:18,
  bottom:14,
  height:78,
  flexDirection:"row",
  gap:14,
 },

 passportPhoto:{
  width:54,
  height:64,
  borderRadius:4,
  backgroundColor:"#E5ECEC",
 },

 passportCopy:{
  flex:1,
 },

 passportTiny:{
  fontSize:11,
  fontWeight:"900",
  color:"#111",
  marginBottom:5,
 },

 passportLineLong:{
  height:6,
  width:"78%",
  borderRadius:4,
  backgroundColor:"#B7C3C6",
  marginBottom:6,
 },

 passportLine:{
  height:5,
  width:"56%",
  borderRadius:4,
  backgroundColor:"#C8D1D3",
  marginBottom:6,
 },

 passportMrz:{
  height:5,
  width:"96%",
  borderRadius:4,
  backgroundColor:"#7C8790",
  marginTop:4,
 },

 passportMrzShort:{
  height:5,
  width:"84%",
  borderRadius:4,
  backgroundColor:"#7C8790",
  marginTop:5,
 },

 idCard:{
  width:314,
  height:192,
  borderRadius:14,
  backgroundColor:"#E4F6F3",
  borderWidth:3,
  borderColor:"#6280B5",
  transform:[{ rotate:"-12deg" }],
  padding:18,
  shadowColor:"#0A3022",
  shadowOpacity:0.12,
  shadowRadius:18,
  shadowOffset:{ width:0, height:12 },
 },

 idHeader:{
  width:104,
  height:18,
  borderRadius:9,
  backgroundColor:"#84D6D0",
  alignSelf:"flex-end",
  marginBottom:16,
 },

 idChip:{
  position:"absolute",
  left:24,
  top:34,
  width:54,
  height:42,
  borderRadius:10,
  backgroundColor:"#E7D9A5",
 },

 idPhoto:{
  position:"absolute",
  left:24,
  bottom:24,
  width:54,
  height:54,
  borderRadius:27,
  backgroundColor:"#CCE6E0",
 },

 idRowShort:{
  width:112,
  height:8,
  borderRadius:5,
  backgroundColor:"#A7BBB6",
  marginBottom:14,
  marginLeft:86,
 },

 idRow:{
  width:"64%",
  height:8,
  borderRadius:5,
  backgroundColor:"#8FA7A0",
  marginBottom:12,
  marginLeft:86,
 },

 idDots:{
  position:"absolute",
  right:20,
  bottom:26,
  flexDirection:"row",
  gap:6,
 },

 idDot:{
  width:8,
  height:8,
  borderRadius:4,
  backgroundColor:"#5F76A5",
 },

 documentNumber:{
  position:"absolute",
  right:18,
  bottom:24,
  width:130,
  height:8,
  borderRadius:5,
  backgroundColor:"#5F76A5",
 },

 phone:{
  position:"absolute",
  width:160,
  height:224,
  borderRadius:28,
  backgroundColor:"#fff",
  alignItems:"center",
  paddingTop:28,
  shadowColor:"#0A3022",
  shadowOpacity:0.16,
  shadowRadius:20,
  shadowOffset:{ width:0, height:14 },
 },

 phoneSpeaker:{
  width:58,
  height:9,
  borderRadius:5,
  backgroundColor:"#D4E6E1",
  marginBottom:32,
 },

 scanFrame:{
  width:104,
  height:82,
 },

 corner:{
  position:"absolute",
  width:18,
  height:18,
  borderColor:"#B19700",
 },

 cornerTopLeft:{
  top:0,
  left:0,
  borderTopWidth:3,
  borderLeftWidth:3,
 },

 cornerTopRight:{
  top:0,
  right:0,
  borderTopWidth:3,
  borderRightWidth:3,
 },

 cornerBottomLeft:{
  bottom:0,
  left:0,
  borderBottomWidth:3,
  borderLeftWidth:3,
 },

 cornerBottomRight:{
  bottom:0,
  right:0,
  borderBottomWidth:3,
  borderRightWidth:3,
 },

 phoneButton:{
  position:"absolute",
  bottom:22,
  width:22,
  height:22,
  borderRadius:11,
  backgroundColor:"#D4E6E1",
 },

 hand:{
  position:"absolute",
  right:34,
  bottom:36,
  transform:[{ rotate:"-25deg" }],
 },

 btn:{
  backgroundColor:"#000",
  padding:22,
  borderRadius:12,
  marginBottom:36,
 },

 btnText:{
  color:COLORS.white,
  textAlign:"center",
  fontSize:20,
  fontWeight:"900",
 },
});
