import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useLoading } from "./LoadingOverlay";

export default function BackButton() {
  const { showLoading, hideLoading } = useLoading();

  function goBack(){
    showLoading();
    router.back();

    setTimeout(()=>{
      hideLoading();
    },3000);
  }

  return (
    <TouchableOpacity style={styles.back} onPress={goBack}>
      <Ionicons name="arrow-back" size={34} color={COLORS.primary}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 58,
    marginBottom: 34,
    alignSelf: "flex-start",
  },
});
