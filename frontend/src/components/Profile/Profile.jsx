import React, { useState } from "react";
import axios from "axios";
import { IoReturnUpBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import EditableInput from "./EditableInput";
import { userStore } from "../../lips/state";

export default function Profile(props) {

    const { user, setUser } = userStore();

    const [lastName, setLastName] = useState(user?.lastName || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [Status, setStatus] = useState(user?.status || "no status...");
    const [image, setImage] = useState(user?.profilePicture || null);

    const token = localStorage.getItem("token");


    async function handleProfilePictureChange(e) {

        const selectedImage = e.target.files[0];

        if (!selectedImage) return;


        setImage(URL.createObjectURL(selectedImage));


        const formData = new FormData();

        formData.append(
            "profilePicture",
            selectedImage
        );


        try {

            const res = await axios.put(
                "http://localhost:8000/user/profile-picture",
                formData,
                {
                    headers:{
                        Authorization: token,
                        "Content-Type":"multipart/form-data"
                    }
                }
            );


            setUser({ ...user, profilePicture: res.data.profilePicture });

            setImage(res.data.profilePicture);

            setStatus(
                "Profile picture updated successfully!"
            );


        } catch(error){

            console.log(error);

            setStatus(
                "Failed to update profile picture"
            );

        }

    }



    return (

        <div className="flex-1 bg-[#131820] border-r border-[#a7a8a62F] h-screen">


            <div className="flex space-x-4 items-center bg-[#222C32] p-4 h-16">

                <button
                    onClick={props.onClose}
                    className="rounded-full p-1 hover:bg-[#0A5C48]"
                >
                    <IoReturnUpBack 
                        size={24}
                        color="#808A9C"
                    />
                </button>


                <p className="text-white text-lg font-semibold">
                    Profile
                </p>

            </div>



            <div className="px-4 space-y-4">


                <div className="flex justify-center py-7">

                    <div className="relative w-[200px] h-[200px]">


                        <img

                            src={
                                image ||
                                "/default-profile.png"
                            }

                            alt="Avatar"

                            className="w-full h-full rounded-full object-cover"

                        />



                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full cursor-pointer">


                            <div className="text-white flex flex-col items-center">

                                <FaCamera size={24}/>

                                <p>
                                    Change profile picture
                                </p>

                            </div>



                            <input

                                type="file"

                                className="absolute inset-0 opacity-0 cursor-pointer"

                                onChange={handleProfilePictureChange}

                            />


                        </div>


                    </div>


                </div>




                <form className="space-y-4">


                    <EditableInput

                        value={firstName}

                        onChange={(e)=>setFirstName(e.target.value)}

                        id="firstName"

                        label="your first name..."

                    />



                    <EditableInput

                        value={lastName}

                        onChange={(e)=>setLastName(e.target.value)}

                        id="lastName"

                        label="your last name..."

                    />



                    <EditableInput

                        value={Status}

                        onChange={(e)=>setStatus(e.target.value)}

                        id="status"

                        label="your Status..."

                    />


                </form>


            </div>


        </div>

    );
}
