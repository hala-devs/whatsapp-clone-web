import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { userStore } from "../../lips/state";
import MessageItem from "./MessageItem.jsx";
import Profile from "../Profile/Profile.jsx";
import { getReceiverMessages } from "../../lips/functions";

export default function Sidebar() {

  const {
    friends: storeFriends,
    user,
    messages,
    setCurrentReceiver
  } = userStore();

  const friends = Array.isArray(storeFriends) ? storeFriends : [];

  const [showProfile, setShowProfile] = useState(false);
  const [showUnseenMessages, setShowUnseenMessages] = useState(false);
  const [search, setSearch] = useState("");


  const handleSearch = (contact) => {

    const fullName =
      `${contact.firstName} ${contact.lastName}`.toLowerCase();

    return fullName.includes(search.toLowerCase());

  };


  const unseenMessagesContacts = (contact) => {

    if (!showUnseenMessages)
      return true;


    const contactMessages =
      getReceiverMessages(messages, contact._id);


    return contactMessages.some(
      message => !message.seen
    );

  };


  if(showProfile){

    return (
      <Profile 
        onClose={() => setShowProfile(false)}
      />
    );

  }



  return (

    <div className="flex-[1] bg-[#131B20] border-r border-[#a7a8a82f] h-full overflow-y-auto">


      <div className="flex items-center bg-[#222C32] p-3 h-16">


        <img

          className="w-10 h-10 rounded-full cursor-pointer object-cover"

          src={
            user?.profilePicture ||
            "/default-profile.png"
          }

          onClick={() => setShowProfile(true)}

          alt="profile"

        />


        <p className="text-white ml-4">

          {user?.firstName} {user?.lastName}

        </p>


      </div>



      <div className="p-3 flex gap-3">


        <div className="relative flex-1">


          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search contacts..."

            className="w-full bg-[#222C32] text-white rounded-lg p-2 pl-10"

          />


          <FaSearch className="absolute top-3 left-3 text-gray-400"/>


        </div>



        <button
          onClick={() =>
            setShowUnseenMessages(!showUnseenMessages)
          }
        >

          <IoFilter 
            size={18}
            color="#B0BAC0"
          />

        </button>


      </div>




      {

        friends.length > 0 ?

        friends

        .filter(handleSearch)

        .filter(unseenMessagesContacts)

        .map(friend => (

          <MessageItem

            key={friend._id}

            id={friend._id}

            sender={
              `${friend.firstName} ${friend.lastName}`
            }

            profilePicture={
              friend.profilePicture
            }

            status={
              friend.status
            }

            setCurrentReceiver={
              setCurrentReceiver
            }

          />

        ))

        :

        <p className="text-gray-400 text-center mt-5">

          No contacts found

        </p>

      }



    </div>

  );

}
