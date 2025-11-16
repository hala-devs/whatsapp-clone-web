import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatFooter from './ChatFooter'
import { useLocation } from 'react-router-dom'
import { getReceiverMessages } from "../../lips/functions"
import { userStore } from "../../lips/state"

export default function Chat() {
  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);
  const { messages, user } = userStore()

  // التصحيح الأساسي: التأكد من أن messages مصفوفة قبل استخدام filter
  const currentMessages = Array.isArray(messages) 
    ? getReceiverMessages(messages, receiverId)
    : []

  return (
    <div className='flex-[1] flex flex-col h-screen w-full'>
      <ChatHeader />
      <div className='px-8 py-6 flex-1 space-y-2 bg-[#08141A] overflow-y-scroll h-8'>
        {currentMessages.map((message, i) => (
          <ChatMessages 
            key={i}
            content={message.content}
            createdAt={message.createdAt}
            isSender={message.senderId === user._id}
          />
        ))}
      </div>
      <ChatFooter />
    </div>
  )
}