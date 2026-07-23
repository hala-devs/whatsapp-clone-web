import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { userStore } from "../../lips/state";
import { useNavigate } from "react-router-dom";

export default function ChatHeader(){

 const { currentReceiver, typing } = userStore();
 const navigate = useNavigate();

 return(
  <div className="flex items-center bg-[#222C32] h-16 p-3 justify-between">

   <div
    className="flex items-center space-x-3 cursor-pointer"
    onClick={()=>{
      if(currentReceiver?._id){
        navigate(`/profile/${currentReceiver._id}`);
      }
    }}
   >

    <img
     src={currentReceiver?.profilePicture || "/default-profile.png"}
     className="w-10 h-10 rounded-full object-cover"
     alt="avatar"
    />

    <div>

     <p className="text-white text-md font-semibold">
      {currentReceiver?.firstName
       ? `${currentReceiver.firstName} ${currentReceiver.lastName || ""}`
       : currentReceiver?.sender || "Unknown User"}
     </p>


     <p className="text-xs text-[#b0bac0]">
      {
       typing ? "typing..." : "online"
      }
     </p>

    </div>

   </div>


   <button onClick={() => { localStorage.clear(); window.location.replace("/login"); }} className="cursor-pointer"><IoLogOutOutline color="#BBBAC0" size={20}/></button>

  </div>
 );
}





