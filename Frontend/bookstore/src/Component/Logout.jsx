import React from 'react'
import toast from 'react-hot-toast';
import {useAuth} from "../Context/Auth"

function Logout(){
const [auth,setAuth] = useAuth()
const Logoutkro =()=>{
   try{
      setAuth({
        ...auth,
        user:null

      })
      localStorage.removeItem("Users")
      toast.success("Logout Sucessfully")
      setTimeout(() =>{
        window.location.reload();
      },2000);
      
   }catch(error){
      toast.error("Error: " + error.message)
   }
}
return (
    <div>
       <button className="py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer" 
       onClick={Logoutkro}>Logout</button>

    </div>
  )
}

 


export default Logout
