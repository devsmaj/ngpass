import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveUser(user:any){
 await AsyncStorage.setItem("ngpass_user", JSON.stringify(user));
}

export async function getUser(){
 const data = await AsyncStorage.getItem("ngpass_user");
 return data ? JSON.parse(data) : null;
}

export async function logout(){
 await AsyncStorage.removeItem("ngpass_user");
}
