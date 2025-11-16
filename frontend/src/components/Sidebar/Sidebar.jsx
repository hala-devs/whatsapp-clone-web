import React, { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { userStore } from '../../lips/state';
import MessageItem from './MessageItem.jsx';
import Profile from '../Profile/Profile.jsx';
import { getReceiverMessages } from '../../lips/functions';

export default function Sidebar() {
const { friends, user, messages, setCurrentReceiver } = userStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showUnseenMessages, setShowUnseenMessages] = useState(false);
  const [search, setSearch] = useState('');

  // ✅ تصحيح: .trim يجب أن تنتهي بأقواس () لأنها دالة
  const handleSearch = (contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().includes(search.toLowerCase().trim());
  };

  // ✅ تصحيح: التحقق من وجود رسائل غير مقروءة
  const unseenMessagesContacts = (contact) => {
    if (!showUnseenMessages) return true;

    const contactMessages = getReceiverMessages(messages, contact._id);
    const containUnseenMessages = contactMessages.some((message) => !message.seen);

    return containUnseenMessages;
  };

  // ✅ إذا تم تفعيل صفحة البروفايل، اعرضها
  if (showProfile) {
    return <Profile onClose={() => setShowProfile(false)} />;
  }

  return (
    <div className='flex-[1] bg-[#131B20] border-r border-[#a7a8a82f] h-full overflow-y-scroll'>
      <div className='flex items-center justify-between bg-[#222C32] p-3 h-16'>
        <div className='flex items-center'>
          <img
            className='w-10 h-10 rounded-full cursor-pointer'
            alt='avatar'
            src={user?.profilePicture || 'default-profile.png'}
            onClick={() => setShowProfile(true)}
          />
          <div className='ml-4'>
            <p className='text-white text-md'>{user?.firstName} {user?.lastName}</p>
          </div>
        </div>
      </div>

      <div className='p-3 flex justify-between items-center space-x-3'>
        <div className='relative flex-1'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search your contacts...'
            className='w-full py-2 pl-10 pr-4 text-white bg-[#222C32] rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
          />
          <FaSearch className='absolute top-3 left-3 text-gray-400' />
        </div>
        <button onClick={() => setShowUnseenMessages((val) => !val)}>
          <IoFilter size={16} color='#B0BAC0' />
        </button>
      </div>

      <div>
        {friends.length > 0 ? (
          friends
            .filter(handleSearch)
            .filter(unseenMessagesContacts)
            .map((friend) => (
              <MessageItem
                sender={`${friend.firstName} ${friend.lastName}`}
                profilePicture={friend.profilePicture}
                id={friend._id}
                key={friend._id}
                status={friend.status}
                  setCurrentReceiver={setCurrentReceiver} // ✅ تمرير الدالة هنا

              />
            ))
        ) : (
          <div>
            <p className='text-center text-gray-400'>No contacts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
