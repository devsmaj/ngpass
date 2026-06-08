import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Animated, Easing, Image, Modal, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

type LoadingContextValue = {
 isLoading:boolean;
 showLoading:()=>void;
 hideLoading:()=>void;
 withLoading:<T>(task:()=>Promise<T>)=>Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }:{ children:ReactNode }){
 const [count,setCount] = useState(0);
 const spin = useRef(new Animated.Value(0)).current;
 const pulse = useRef(new Animated.Value(0)).current;
 const fill = useRef(new Animated.Value(0)).current;
 const isLoading = count > 0;

 const showLoading = useCallback(()=>{
  setCount((value)=>value + 1);
 },[]);

 const hideLoading = useCallback(()=>{
  setCount((value)=>Math.max(0, value - 1));
 },[]);

 const withLoading = useCallback(async<T,>(task:()=>Promise<T>)=>{
  showLoading();

  try{
   return await task();
  }finally{
   hideLoading();
  }
 },[hideLoading,showLoading]);

 useEffect(()=>{
  Animated.loop(
   Animated.sequence([
    Animated.timing(spin, {
     toValue:1,
     duration:900,
     easing:Easing.out(Easing.ease),
     useNativeDriver:true,
    }),
    Animated.timing(spin, {
     toValue:0,
     duration:900,
     easing:Easing.in(Easing.ease),
     useNativeDriver:true,
    }),
   ])
  ).start();

  Animated.loop(
   Animated.sequence([
    Animated.timing(pulse, {
     toValue:1,
     duration:650,
     easing:Easing.inOut(Easing.ease),
     useNativeDriver:true,
    }),
    Animated.timing(pulse, {
     toValue:0,
     duration:650,
     easing:Easing.inOut(Easing.ease),
     useNativeDriver:true,
    }),
   ])
  ).start();

  Animated.loop(
   Animated.sequence([
    Animated.timing(fill, {
     toValue:1,
     duration:1450,
     easing:Easing.inOut(Easing.ease),
     useNativeDriver:false,
    }),
    Animated.timing(fill, {
     toValue:0,
     duration:420,
     easing:Easing.out(Easing.ease),
     useNativeDriver:false,
    }),
   ])
  ).start();
 },[fill,pulse,spin]);

 const value = useMemo(()=>({
  isLoading,
  showLoading,
  hideLoading,
  withLoading,
 }),[hideLoading,isLoading,showLoading,withLoading]);

 return(
  <LoadingContext.Provider value={value}>
   {children}
   <LoadingOverlay visible={isLoading} spin={spin} pulse={pulse} fill={fill} />
  </LoadingContext.Provider>
 )
}

export function useLoading(){
 const value = useContext(LoadingContext);

 if(!value){
  throw new Error("useLoading must be used inside LoadingProvider");
 }

 return value;
}

function LoadingOverlay({
 visible,
 spin,
 pulse,
 fill,
}:{
 visible:boolean;
 spin:Animated.Value;
 pulse:Animated.Value;
 fill:Animated.Value;
}){
 const glowScale = spin.interpolate({
  inputRange:[0,1],
  outputRange:[0.96,1.08],
 });

 const glowOpacity = pulse.interpolate({
  inputRange:[0,1],
  outputRange:[0.18,0.42],
 });

 const fillHeight = fill.interpolate({
  inputRange:[0,1],
  outputRange:[0,106],
 });

 return(
  <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
   <View style={styles.backdrop}>
    <View style={styles.card}>
     <View style={styles.logoWrap}>
      <Animated.View style={[styles.glow, { opacity:glowOpacity, transform:[{ scale:glowScale }] }]} />

      <View style={styles.logoFrame}>
       <Image
        source={require("../../assets/images/fingerprint-mark.png")}
        style={[styles.logo, styles.logoBase]}
        resizeMode="contain"
       />

       <Animated.View style={[styles.fillMask, { height:fillHeight }]}>
        <Image
         source={require("../../assets/images/fingerprint-mark.png")}
         style={[styles.logo, styles.logoFill]}
         resizeMode="contain"
        />
       </Animated.View>
      </View>
     </View>

     <Text style={styles.text}>Loading please wait...</Text>
    </View>
   </View>
  </Modal>
 )
}

const styles = StyleSheet.create({
 backdrop:{
  flex:1,
  backgroundColor:"rgba(0,0,0,0.42)",
  alignItems:"center",
  justifyContent:"center",
  padding:28,
 },

 card:{
  width:"100%",
  maxWidth:310,
  borderRadius:26,
  backgroundColor:COLORS.white,
  alignItems:"center",
  paddingVertical:34,
  paddingHorizontal:28,
  shadowColor:"#000",
  shadowOpacity:0.18,
  shadowRadius:26,
  shadowOffset:{ width:0, height:14 },
  elevation:12,
 },

 logoWrap:{
  width:132,
  height:132,
  alignItems:"center",
  justifyContent:"center",
  overflow:"hidden",
 },

 glow:{
  position:"absolute",
  width:122,
  height:122,
  borderRadius:61,
  backgroundColor:"rgba(0,135,81,0.22)",
 },

 logo:{
  width:106,
  height:106,
 },

 logoFrame:{
  width:106,
  height:106,
 },

 logoBase:{
  opacity:0.9,
  tintColor:"#EAF5F0",
 },

 fillMask:{
  position:"absolute",
  left:0,
  right:0,
  bottom:0,
  width:106,
  overflow:"hidden",
  alignItems:"center",
 },

 logoFill:{
  position:"absolute",
  left:0,
  bottom:0,
  tintColor:COLORS.primary,
 },

 text:{
  marginTop:18,
  color:"#202020",
  fontSize:17,
  fontWeight:"800",
  textAlign:"center",
 },
});
