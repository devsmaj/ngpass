import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../../constants/colors";
import { logout } from "../../services/storage";
import { useUser } from "../../hooks/useUser";

export default function Profile() {
 const savedUser = useUser();

 const fullName = savedUser?.fullName || "NG PASS User";
 const initial = fullName.charAt(0).toUpperCase();

 return (
  <View style={styles.container}>
   <View style={styles.avatar}>
    <Text style={styles.avatarText}>{initial}</Text>
   </View>

   <Text style={styles.name}>{fullName}</Text>
   <Text style={styles.status}>✓ Verified Citizen</Text>

   <View style={styles.card}>
    <Ionicons name="person-outline" size={24} color={COLORS.primary}/>
    <Text style={styles.cardText}>Account Type: Citizen</Text>
   </View>

   <TouchableOpacity style={styles.card} onPress={()=>router.push("/activity")}>
    <Ionicons name="time-outline" size={24} color={COLORS.primary}/>
    <Text style={styles.cardText}>Activity Logs</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card} onPress={()=>router.push("/settings")}>
    <Ionicons name="settings-outline" size={24} color={COLORS.primary}/>
    <Text style={styles.cardText}>Settings</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.card} onPress={()=>router.push("/help")}>
    <Ionicons name="help-circle-outline" size={24} color={COLORS.primary}/>
    <Text style={styles.cardText}>Help & Support</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.logoutCard}
    onPress={async()=>{ await logout(); router.replace("/welcome"); }}
   >
    <Ionicons name="log-out-outline" size={24} color="#D32F2F"/>
    <Text style={styles.logoutText}>Logout</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:22, backgroundColor:COLORS.background, alignItems:"center" },
 avatar:{ marginTop:70, width:90, height:90, borderRadius:60, backgroundColor:"#E8FFF2", justifyContent:"center", alignItems:"center" },
 avatarText:{ fontSize:40, color:COLORS.primary, fontWeight:"900" },
 name:{ fontSize:24, fontWeight:"900", marginTop:18 },
 status:{ color:COLORS.success, marginTop:6, marginBottom:30 },
 card:{ width:"100%", backgroundColor:COLORS.white, padding:18, borderRadius:18, marginBottom:14, flexDirection:"row", gap:12, alignItems:"center" },
 cardText:{ fontSize:16, fontWeight:"800" },
 logoutCard:{ width:"100%", backgroundColor:COLORS.white, padding:18, borderRadius:18, flexDirection:"row", gap:12, alignItems:"center" },
 logoutText:{ color:"#D32F2F", fontSize:16, fontWeight:"900" },
});
