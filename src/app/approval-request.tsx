import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { useLoading } from "../components/LoadingOverlay";

export default function ApprovalRequest() {
  const { showLoading, hideLoading } = useLoading();

  function approve() {
    showLoading();

    setTimeout(()=>{
      hideLoading();
      Alert.alert("Approved", "Access request approved successfully.");
      router.replace("/success");
    },350);
  }

  function reject() {
    Alert.alert("Rejected", "Access request rejected.");
    router.back();
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.iconBox}>
        <Ionicons name="lock-open-outline" size={60} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>Access Request</Text>

      <Text style={styles.sub}>
        University Portal wants to access your NG PASS identity.
      </Text>

      <View style={styles.permission}>
        <Text>✓ Full Name</Text>
        <Text>✓ Verification Status</Text>
        <Text>✓ Digital ID</Text>
      </View>

      <TouchableOpacity style={styles.approve} onPress={approve}>
        <Text style={styles.approveText}>Approve</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reject} onPress={reject}>
        <Text style={styles.rejectText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background, alignItems:"center" },
  iconBox:{ marginTop:50, backgroundColor:COLORS.white, padding:30, borderRadius:60 },
  title:{ marginTop:25, fontSize:30, fontWeight:"900" },
  sub:{ textAlign:"center", color:COLORS.gray, marginTop:10 },
  permission:{ width:"100%", backgroundColor:COLORS.white, padding:20, borderRadius:18, gap:10, marginTop:30 },
  approve:{ width:"100%", backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
  approveText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
  reject:{ marginTop:18 },
  rejectText:{ color:"red", fontWeight:"900" },
});
