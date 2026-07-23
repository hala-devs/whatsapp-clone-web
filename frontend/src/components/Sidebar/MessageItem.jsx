import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../lips/state";
import { getReceiverMessages } from "../../lips/functions";
import moment from "moment";

export default function MessageItem(props) {

  const navigate = useNavigate();

  const { setCurrentReceiver, socket, messages } = userStore();


  function onClick() {

    navigate("" + props.id);

    setCurrentReceiver({
      _id: props.id,
      sender: props.sender,
      status: props.status,
      profilePicture: props.profilePicture, online: props.online, online: props.online
    });

    if (socket) {
      socket.emit("seen", props.id);
    }
  }


  const contactMessages = getReceiverMessages(
    Array.isArray(messages) ? messages : [],
    props.id
  );


  const lastMessage =
    contactMessages.length > 0
      ? contactMessages[contactMessages.length - 1]
      : null;


  const lastMessageTime = lastMessage?.createdAt;


  const unreadMessages = contactMessages.filter(
    (message) =>
      !message.seen &&
      message.receiverId !== props.id
  ).length;



  return (

    <div
      onClick={onClick}
      className="flex items-center p-4 cursor-pointer hover:bg-[#202C33]"
    >

      <img
        alt="profile-picture"
        src={props.profilePicture || "default-profile.png"}
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />


      <div className="flex-1">

        <p className="text-white font-semibold">
          {props.sender}
        </p>


        <p className="text-white text-sm truncate">
          {lastMessage
            ? lastMessage.content
            : "Start Conversation"}
        </p>


      </div>



      <div className="flex flex-col items-end space-y-1">


        {unreadMessages > 0 && (

          <div className="bg-[#3B82F6] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">

            {unreadMessages}

          </div>

        )}



        {lastMessageTime && (

          <p className="text-gray-400 text-xs">

            {moment(lastMessageTime).format("hh:mm A")}

          </p>

        )}


      </div>


    </div>

  );
}
