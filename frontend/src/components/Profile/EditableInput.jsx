import React, { useState } from "react";
import cn from "classnames";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from 'axios'
import userStore from "../../lips/state";

export default function EditableInput(props) {
  const [isEditable, setIsEditable] = useState(false);
const {token} = userStore();
  return (
    <div>
      <label htmlFor={props.id} className="text-[#005c4b]">
        {props.label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className={cn(
            "w-full bg-transparent outline-none text-white py-1",
            {
              "border border-[#b0bac0]": isEditable,
            }
          )}
          disabled={!isEditable}
        />
        {!isEditable ? (
          <FaEdit
            size={22}
            color="#B0BAC0"
            className="absolute right-0 h-full bottom-0 cursor-pointer"
            onClick={() => setIsEditable(true)}
          />
        ) : (
          <FaCheck
            size={22}
            color="#B0BAC0"
            className="absolute right-0 h-full bottom-0 cursor-pointer"
            onClick={() => {
              setIsEditable(false)
              axios.put('http://localhost:8000/user/',{
              [props.id]: props.value

              },{
                headers:{
Authorization: `Bearer ${token}`
                },
              }
            );
            }}
          />
        )}
      </div>
    </div>
  );
}
