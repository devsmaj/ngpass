const API_URL = "https://refactored-barnacle-wrr654r4rxrvh957w-5000.app.github.dev/api";

export async function registerUser(data:any){
 const response = await fetch(`${API_URL}/register`,{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify(data),
 });

 return response.json();
}


export async function loginUser(data:any){
 const response = await fetch(`${API_URL}/login`,{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify(data),
 });

 return response.json();
}


export async function approveRequest(){
 return {success:true,message:"Approved"};
}
