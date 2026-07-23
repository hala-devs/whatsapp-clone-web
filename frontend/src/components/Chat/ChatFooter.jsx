import React, { useState, useEffect } from "react";
import { TbSend } from "react-icons/tb";
import { userStore } from "../../lips/state";
import { useParams } from "react-router-dom";


export default function ChatFooter() {

  const [input, setInput] = useState("");

  const { socket } = userStore();

  const { receiverId } = useParams();



  useEffect(() => {

    if (!socket || !receiverId) return;


    if (input.trim() !== "") {

      socket.emit(
        "typing",
        receiverId
      );

    } else {

      socket.emit(
        "stop_typing",
        receiverId
      );

    }


  }, [input, socket, receiverId]);



  const sendMessage = () => {


    if (
      !input.trim() ||
      !socket ||
      !receiverId
    ) {
      return;
    }



    socket.emit(
      "send_message",
      {
        receiverId,
        content: input
      }
    );



    setInput("");

  };



  return (

    <div className="flex items-center bg-[#202C33] p-3">


      <input

        value={input}

        onChange={(e) =>
          setInput(e.target.value)
        }

        onKeyDown={(e) => {

          if (e.key === "Enter") {
            sendMessage();
          }

        }}

        className="flex-1 bg-[#2A3942] rounded-lg px-4 py-2 text-white"

        placeholder="اكتب رسالة..."

      />



      <button

        onClick={sendMessage}

        disabled={!input.trim()}

        className="ml-2 p-2 text-white bg-[#005C4B] rounded-full disabled:opacity-50"

      >

        <TbSend size={20} />

      </button>


    </div>

  );

}