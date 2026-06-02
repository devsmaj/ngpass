import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function IdentityCard() {
  return (
    <View style={styles.card}>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>S</Text>
      </View>

      <View>
        <Text style={styles.name}>
          Saleh Mala Ajimi
        </Text>

        <Text style={styles.status}>
          ✓ Verified Account
        </Text>

        <Text style={styles.id}>
          NG PASS ID: NG-000001
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E8FFF2",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.primary,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
  },

  status: {
    color: COLORS.success,
    marginTop: 4,
  },

  id: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 12,
  },

});
