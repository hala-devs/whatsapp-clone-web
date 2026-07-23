import React from 'react';
import logoHsoub from '../../assets/logo.png';
import { IoLogOutOutline } from 'react-icons/io5';

export default function NoUserSelected() {
  return (
    <div className="flex-[3] flex flex-col h-screen">

      {/* Top bar */}
      <div className="flex items-center justify-end bg-[#222C32] h-16 p-3">
        <button
          className="rounded-full p-2 hover:bg-[#0A5C48] transition-all"
        >
          <IoLogOutOutline 
            size={24}
            color="#B0BAC0"
          />
        </button>
      </div>


      {/* Welcome Area */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-8 bg-[#131C21]">

        <img
          src={logoHsoub}
          alt="logo"
          className="w-64"
        />

        <h1 className="text-white text-3xl">
          Welcome to Chat App
        </h1>

      </div>

    </div>
  );
}