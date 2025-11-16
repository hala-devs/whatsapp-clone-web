import React, { useState, useEffect } from "react"; // أضفنا useEffect
import axios from "axios";
import { IoReturnUpBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import EditableInput from "./EditableInput";
import { userStore } from "../../lips/state"

export default function Profile(props) {
    const {user } = userStore() 
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [Status, setStatus] = useState(user.status || "no status...");
    const [image, setImage] = useState(null);
    const token = localStorage.getItem("token");

    // أضفنا هذا الجزء لإخفاء الرسالة بعد 3 ثواني
    useEffect(() => {
        if (Status === "no status...") {
            const timer = setTimeout(() => {
                setStatus("no status...");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [Status]);

    async function handleProfilePictureChange(e) {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(URL.createObjectURL(selectedImage));
            
            const formData = new FormData();
            formData.append("profilePicture", selectedImage);

            try {
                await axios.put("http://localhost:8000/user/profile-picture", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStatus("Profile picture updated successfully!");
            } catch (error) {
                setStatus("Failed to update profile picture");
                console.error(error);
            }
        }
    }

    return (
        <div className="flex-1 bg-[#131820] border-r border-[#a7a8a62F] h-screen">
            <div className="flex space-x-4 items-center bg-[#222C32] p-4 h-16">
                <button className="justify-center rounded-full p-1 cursor-pointer hover:bg-[#0A5C48] transition-all">
                    <IoReturnUpBack size={24} color="#808A9C" className="cursor-pointer" onClick={props.onClose} />
                </button>
                <p className="text-white text-lg font-semibold">Profile</p>
            </div>

            <div className="px-4 space-y-4">
                <div className="flex items-center justify-center py-7 select-none">
                    <div className="relative w-[200px] h-[280px]">
                        <img
                            src={image || "image"}
                            alt="Avatar"
                            className="w-full h-full rounded-full transition-opacity duration-300"
                        />
                        <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 rounded-full">
                            <div className="text-white flex flex-col items-center justify-center m-2">
                                <FaCamera size={24} color="#B0BAC0" />
                                <p className="text-center">change the profile picture</p>
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleProfilePictureChange}
                            />
                        </div>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <EditableInput 
                        value={firstName}
                        onChange={(e)=> setFirstName(e.target.value)}
                        id="firstName" 
                        lebel="your first name..."
                    /> 
                    <EditableInput
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                        id="lastName"
                        lebel="your last name..."
                    /> 
                    <EditableInput
                        value={Status}
                        onChange={(e)=> setStatus(e.target.value)}
                        id="status"
                        lebel="your Status..."
                    /> 
                </form>
            </div>
        </div>
    );
}