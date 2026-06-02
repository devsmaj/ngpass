import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function ActionButton({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>

      <View style={styles.iconBox}>
        <Ionicons name={icon} size={26} color={COLORS.white}/>
      </View>

      <Text style={styles.text}>{title}</Text>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

 button:{
  backgroundColor:COLORS.black,
  padding:18,
  borderRadius:18,
  flex:1,
 },

 iconBox:{
  width:46,
  height:46,
  borderRadius:12,
  backgroundColor:COLORS.primary,
  justifyContent:"center",
  alignItems:"center",
 },

 text:{
  color:COLORS.white,
  fontWeight:"800",
  marginTop:14,
 },

});
