const API_URL = "https://ngpass.onrender.com/api";

export async function registerUser(data:any){
 try{
  const response = await fetch(`${API_URL}/register`,{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify(data),
  });

  return response.json();
 }catch(error){
  return {
   success:false,
   message:"Network error. Please try again.",
  };
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
 }catch(error){
  return {
   success:false,
   message:"Network error. Please try again.",
  };
 }
}

export async function approveRequest(){
 return { success:true, message:"Approved" };
}
