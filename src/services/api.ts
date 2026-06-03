const API_URL = "http://localhost:5000/api";

export async function registerUser(data:any){
 const response = await fetch(`${API_URL}/register`,{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify(data),
 });

 return response.json();
}

export async function loginUser(data:any){
 return {
  success:true,
  message:"Demo login successful",
  token:"demo-token",
 };
}

export async function approveRequest(){
 return {
  success:true,
  message:"Approved",
 };
}
