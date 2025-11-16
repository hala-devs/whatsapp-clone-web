import React from 'react';
import logoHsoub from '../../assets/logo.png';
import { IoLogOutOutline } from 'react-icons/io5';

export default function NoUserSelected() {
  return (
    <div className="flex flex-col flex-[3]">
      <div className="flex items-center justify-end bg-[#222C32] h-16 p-3">
        <div className="flex space-x-4">
          <button className="justify-center rounded-full p-1 cursor-pointer hover:bg-[#0A5C48] transition-all">
            <IoLogOutOutline color="#B0BAC0" className="cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center items-center space-y-8 bg-[#131C21]">
        <div>
          <img src={logoHsoub} alt="logo" className="w-64" />
        </div>
        <div>
          <h1 className="text-white text-3xl">Welcome to Chat App</h1>
        </div>
      </div>
    </div>
  );
}
