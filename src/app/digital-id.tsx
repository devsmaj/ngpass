import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { useUser } from "../hooks/useUser";

export default function DigitalID() {
 const savedUser = useUser();

 const fullName = savedUser?.fullName || "NG PASS User";
 const initial = fullName.charAt(0).toUpperCase();

 return (
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Digital ID</Text>

   <View style={styles.card}>
    <Text style={styles.logo}>NG PASS</Text>

    <View style={styles.avatar}>
     <Text style={styles.avatarText}>{initial}</Text>
    </View>

    <Text style={styles.name}>{fullName}</Text>
    <Text style={styles.status}>✓ Verified Citizen</Text>

    <View style={styles.qr}>
     <Ionicons name="qr-code-outline" size={90} color={COLORS.primary} />
    </View>

    <Text style={styles.id}>NG PASS ID: NG-000001</Text>
   </View>

   <View style={styles.actions}>
    <TouchableOpacity style={styles.action}>
     <Ionicons name="create-outline" size={25} color={COLORS.primary}/>
     <Text>Sign</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.action}>
     <Ionicons name="shield-checkmark-outline" size={25} color={COLORS.primary}/>
     <Text>Verify</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.action}>
     <Ionicons name="share-social-outline" size={25} color={COLORS.primary}/>
     <Text>Share</Text>
    </TouchableOpacity>
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, padding:22, backgroundColor:COLORS.background },
 title:{ fontSize:30, fontWeight:"900" },
 card:{ marginTop:25, backgroundColor:COLORS.primary, borderRadius:28, padding:25, alignItems:"center" },
 logo:{ color:COLORS.white, fontSize:28, fontWeight:"900" },
 avatar:{ marginTop:25, width:90, height:90, borderRadius:60, backgroundColor:COLORS.white, justifyContent:"center", alignItems:"center" },
 avatarText:{ fontSize:40, color:COLORS.primary, fontWeight:"900" },
 name:{ marginTop:18, color:COLORS.white, fontSize:22, fontWeight:"900" },
 status:{ color:"#E8FFF2" },
 qr:{ backgroundColor:COLORS.white, padding:20, borderRadius:20, marginTop:25 },
 id:{ marginTop:18, color:COLORS.white, fontWeight:"700" },
 actions:{ marginTop:20, flexDirection:"row", gap:15 },
 action:{ flex:1, backgroundColor:COLORS.white, padding:18, borderRadius:18, alignItems:"center", gap:8 },
});
