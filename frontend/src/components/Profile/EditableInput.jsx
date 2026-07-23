import React, { useState } from "react";
import cn from "classnames";
import { FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import userStore from "../../lips/state";

export default function EditableInput(props) {

  const [isEditable, setIsEditable] = useState(false);

  const { token, setUser } = userStore();

  const updateField = async () => {

    try {

      const res = await axios.put(
        "http://localhost:8000/user/",
        {
          [props.id]: props.value
        },
        {
          headers:{
            Authorization: token
          }
        }
      );

      setUser(res.data); window.dispatchEvent(new Event("userUpdated"));
      setIsEditable(false);

    } catch(error) {

      console.log(error.response?.data || error);

    }

  };


  return (
    <div>

      <label className="text-[#005c4b]">
        {props.label}
      </label>


      <div className="relative">

        <input
          type="text"
          value={props.value}
          onChange={props.onChange}
          className={cn(
            "w-full bg-transparent outline-none text-white py-1",
            {
              "border border-[#b0bac0]": isEditable
            }
          )}
          disabled={!isEditable}
        />


        {!isEditable ? (

          <FaEdit
            size={22}
            color="#B0BAC0"
            className="absolute right-0 top-1 cursor-pointer"
            onClick={() => setIsEditable(true)}
          />

        ) : (

          <FaCheck
            size={22}
            color="#B0BAC0"
            className="absolute right-0 top-1 cursor-pointer"
            onClick={updateField}
          />

        )}

      </div>

    </div>
  );
}
