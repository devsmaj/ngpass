import * as FileSystem from "expo-file-system/legacy";

const API_URL = "https://ngpass.onrender.com/api";

export async function registerUser(data:any){
 try{
  const response = await fetch(`${API_URL}/register`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify(data),
  });

  return response.json();
 }catch{
  return { success:false, message:"Network error" };
 }
}

export async function loginUser(data:any){
 try{
  const response = await fetch(`${API_URL}/login`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify(data),
  });

  return response.json();
 }catch{
  return { success:false, message:"Network error" };
 }
}

export async function approveRequest(){
 return { success:true, message:"Approved" };
}

export async function scanDocument(imageUri:string){
 try{
  const response = await FileSystem.uploadAsync(`${API_URL}/ocr`, imageUri, {
   fieldName:"document",
   httpMethod:"POST",
   uploadType:FileSystem.FileSystemUploadType.MULTIPART,
   mimeType:"image/jpeg",
  });

  try{
   return JSON.parse(response.body);
  }catch{
   return {
    success:false,
    message:"Invalid OCR response",
    rawResponse:response.body,
   };
  }
 }catch(error:any){
  return {
   success:false,
   message:error?.message || "OCR upload failed",
  };
 }
}
