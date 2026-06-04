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

 const formData:any = new FormData();

 formData.append("document",{
  uri:imageUri,
  name:"document.jpg",
  type:"image/jpeg",
 });

 const response = await fetch(`${API_URL}/ocr`,{
  method:"POST",
  body:formData,
  headers:{
   "Content-Type":"multipart/form-data",
  },
 });

 return response.json();

}
