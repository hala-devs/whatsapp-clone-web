import React, { useState, useEffect } from "react";
import { TbSend } from "react-icons/tb";
import { userStore } from "../../lips/state";
import { useParams, useLocation } from "react-router-dom"; // أضفنا useLocation

export default function ChatFooter() {
  const [input, setInput] = useState("");
  const { socket } = userStore();
const { receiverId: receiverId } = useParams(); // استخراج الـ receiverId بشكل صحيح
  const location = useLocation(); // استخدمنا useLocation بدلاً من المتغير العام location

  useEffect(() => {
    if (!socket) return;

    if (input !== "") {
      socket.emit("typing", receiverId); // استخدام receiverId مباشرة
    } else {
      socket.emit("stop_typing", receiverId);
    }
  }, [input, socket, receiverId]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !receiverId) {
      console.error("Cannot send:", { input, socket, receiverId });
      return;
    }

    socket.emit("send_message", {
      receiverId,
      content: input
    }, (acknowledgement) => {
      console.log("Server acknowledgement:", acknowledgement);
      if (acknowledgement?.success) {
        setInput("");
      }
    });
  };

  return (
    <div className="flex items-center bg-[#202C33] p-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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