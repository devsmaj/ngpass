import { useEffect, useState } from "react";
import { getUser } from "../services/storage";

export function useUser(){
 const [user,setUser] = useState<any>(null);

 useEffect(()=>{
  async function load(){
   const saved = await getUser();
   setUser(saved);
  }

  load();
 },[]);

 return user;
}
