import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../lips/state";
import { Socket } from "socket.io-client";
import { getReceiverMessages } from '../../lips/functions';
import moment from "moment";

export default function MessageItem(props) {
  
  const lastMessageTime = '' || new Date();


  const navigate = useNavigate();

  const {currentReceiver, setCurrentReceiver,socket , messages } = userStore()
  function onClick() {
    navigate('' + props.id);
    props.setCurrentReceiver({
      _id: props.id,
      sender :props.sender,
      status : props.status
    });

    socket.emit("seen",props.id)
  }

  const contactMessages = getReceiverMessages(messages, props.id)
  const unreadMessages = contactMessages.filter(
    (message) => !message.seen && message.receiverId !== props.id ).length

  return (
    <div onClick={onClick} className='flex items-center p-4 cursor-pointer hover:bg-[#202C33]'>
      <img
        alt='profile-picture'
        src={props.profilePicture}
        className='w-10 h-10 rounded-full mr-4'
      />
      <div>
        <p className=' text-white font-semibold'>{props.sender}</p>
        <p className='text-white text-sm'>Start Conversation</p>
      </div>
      <div>
        {unreadMessages > 0 && (
          <div className='bg-[#3B82F6] text-white rounded-full w-5 h-5 flex items-center justify-center'>
            {unreadMessages}
          </div>
        )}
        <p>{moment(lastMessageTime).format('hh:mm A')}</p>
      </div>
    </div>
  );
}
