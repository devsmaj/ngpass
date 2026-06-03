import * as SecureStore from "expo-secure-store";

export async function saveUser(user:any){
 await SecureStore.setItemAsync(
  "ngpass_user",
  JSON.stringify(user)
 );
}


export async function getUser(){
 const data = await SecureStore.getItemAsync("ngpass_user");

 if(!data){
  return null;
 }

 return JSON.parse(data);
}


export async function logout(){
 await SecureStore.deleteItemAsync("ngpass_user");
}
