import { Image, StyleSheet } from "react-native";

export default function Logo(){

 return(
  <Image
   source={require("../../assets/images/logo.png")}
   style={styles.logo}
  />
 )

}

const styles = StyleSheet.create({

 logo:{
  width:170,
  height:90,
  resizeMode:"contain",
 }

});
