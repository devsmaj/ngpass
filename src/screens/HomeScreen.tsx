import { View, Text, StyleSheet, ScrollView } from "react-native";

import IdentityCard from "../components/IdentityCard";
import ActionButton from "../components/ActionButton";
import { COLORS } from "../constants/colors";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.logo}>
          NG PASS
        </Text>

        <Text style={styles.subtitle}>
          Nigeria's Digital Identity Gateway
        </Text>

        <IdentityCard />

      </View>


      <View style={styles.actions}>

        <View style={styles.row}>

          <ActionButton
            title="Sign Documents"
            icon="create-outline"
          />

          <ActionButton
            title="Verify Documents"
            icon="shield-checkmark-outline"
          />

        </View>


        <View style={styles.row}>

          <ActionButton
            title="Add Documents"
            icon="document-text-outline"
          />

          <ActionButton
            title="Scan QR Code"
            icon="qr-code-outline"
          />

        </View>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 70,
    padding: 20,
    gap: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logo: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: "900",
  },

  subtitle: {
    color: COLORS.white,
    fontSize: 15,
  },

  actions: {
    padding: 20,
    gap: 15,
  },

  row: {
    flexDirection: "row",
    gap: 15,
  },

});
