import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { userStore } from "../../lips/state";
import { IoArrowBack } from "react-icons/io5";

export default function UserProfile(){

  const { userId } = useParams();
  const navigate = useNavigate();

  const { token } = userStore();

  const [profile, setProfile] = useState(null);


  useEffect(()=>{

    if(!userId || !token) return;


    axios.get(
      `http://localhost:8000/user/${userId}`,
      {
        headers:{
          Authorization: token
        }
      }
    )
    .then(res=>{
      setProfile(res.data);
    })
    .catch(err=>{
      console.log(err.response?.data || err);
    });


  },[userId, token]);



  if(!profile){

    return (
      <div className="flex-1 h-screen bg-[#111b21] flex items-center justify-center">
        <p className="text-gray-400">
          Loading profile...
        </p>
      </div>
    );

  }



  return (

    <div className="flex-1 h-screen bg-[#111b21]">


      {/* Header */}
      <div className="h-16 bg-[#202c33] flex items-center px-5">

        <button
          onClick={()=>navigate(-1)}
          className="cursor-pointer mr-5 hover:bg-[#374045] rounded-full p-2 transition"
        >

          <IoArrowBack
            size={25}
            color="#ffffff"
          />

        </button>


        <h1 className="text-white text-lg font-semibold">
          Profile
        </h1>

      </div>



      {/* Profile Card */}
      <div className="flex flex-col items-center mt-10">


        <div className="relative">

          <img
            src={
              profile.profilePicture ||
              "/default-profile.png"
            }
            alt="profile"
            className="
              w-44
              h-44
              rounded-full
              object-cover
              border-4
              border-[#005c4b]
              shadow-lg
            "
          />


          <div
            className="
              absolute
              bottom-3
              right-3
              w-5
              h-5
              bg-green-500
              rounded-full
              border-2
              border-[#111b21]
            "
          />

        </div>



        <h2 className="text-white text-3xl font-semibold mt-6">

          {profile.firstName} {profile.lastName}

        </h2>



        <p className="text-[#aebac1] mt-2">

          {profile.status || "No status"}

        </p>



      </div>



      {/* Information */}
      <div className="mx-8 mt-10 bg-[#202c33] rounded-xl p-5">


        <h3 className="text-[#00a884] text-sm mb-4">
          Account Information
        </h3>



        <div className="mb-4">

          <p className="text-gray-400 text-sm">
            Email
          </p>

          <p className="text-white mt-1">
            {profile.email}
          </p>

        </div>



        <div>

          <p className="text-gray-400 text-sm">
            Status
          </p>

          <p className="text-white mt-1">
            {profile.status || "No status"}
          </p>

        </div>


      </div>



    </div>

  );

}
