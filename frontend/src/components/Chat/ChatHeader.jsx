import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { userStore } from '../../lips/state'

export default function ChatHeader() {
  const { currentReceiver, typing } = userStore();

  return (
    <div className='flex items-center bg-[#222C32] h-16 p-3 justify-between'>
      <div className='flex items-center space-x-3'>
        <img
          src={currentReceiver?.profilePicture || "default-profile.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className='text-white text-md font-semibold'>{currentReceiver?.sender || "Unknown User"}</p>
          <p className='text-xs text-[#b0bac0]'>{typing ? "typing..." : currentReceiver?.status || "online"}</p>
        </div>
      </div>
      <div className='flex space-x-4'>
        <button className='justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all'>
          <IoLogOutOutline className='cursor-pointer' color='#BBBAC0' size={20} />
        </button>
      </div>
    </div>
  )
}
