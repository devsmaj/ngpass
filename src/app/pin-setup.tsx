import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { COLORS } from "../constants/colors";
import { getUser, saveUser } from "../services/storage";
import { registerUser } from "../services/api";

export default function PinSetup() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function completeSetup() {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert("Invalid PIN", "Please enter a 4-digit PIN.");
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert("PIN mismatch", "PIN and confirm PIN must match.");
      return;
    }

    const scannedUser = await getUser();

    if (!scannedUser) {
      Alert.alert("Missing Data", "Please scan your document again.");
      router.replace("/select-id");
      return;
    }

    setLoading(true);

    const result = await registerUser({
      fullName: scannedUser.fullName,
      contact: scannedUser.contact,
      identity: scannedUser.identity,
      pin,
    });

    setLoading(false);

    if (result.success) {
      await saveUser({
        ...scannedUser,
        verified: true,
      });

      router.replace("/(tabs)");
    } else {
      Alert.alert("Registration Failed", result.message || "Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Secure PIN</Text>
      <Text style={styles.sub}>Use this PIN to unlock your NG PASS.</Text>

      <TextInput
        placeholder="Enter 4-digit PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={confirmPin}
        onChangeText={setConfirmPin}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={completeSetup} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Creating..." : "Complete Setup"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:22, backgroundColor:COLORS.background },
  title:{ marginTop:80, fontSize:30, fontWeight:"900" },
  sub:{ marginTop:8, color:COLORS.gray, marginBottom:30 },
  input:{ backgroundColor:COLORS.white, padding:18, borderRadius:16, marginBottom:15 },
  btn:{ backgroundColor:COLORS.primary, padding:18, borderRadius:18, marginTop:25 },
  btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900" },
});
