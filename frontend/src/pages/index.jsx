import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { userStore } from "../lips/state";
import axios from "axios";

export default function HomePage() {
    const {setSocket, token, setMessages, setFriends, messages, friends, user,     setTyping, setUser,
} = userStore();
   
    useEffect(() => {
        const socket = io("http://localhost:8000", {
            query:"token=" + token
        });

        socket.on("connect", () => {
            console.log("Connected to the server with id: ", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        socket.on("typing", () => setTyping(true))
        socket.on("stop_typing", () => setTyping(false))
       
        socket.on("user_created", (user_created) => {
            if (user_created._id !== user._id) {
                setFriends([...friends, user_created]);
            }
        });
socket.on("user_updated", (userUpdated) => {
    if (user._id === userUpdated._id) {
        setUser(userUpdated);
    }
});

        socket.on("receive_message", (newMessage) => {
            setMessages([...messages, newMessage]);
        });

        const fetchData = async () => {
           const usersRes = await axios.get("http://localhost:8000/user", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


            const users = usersRes.data

            const messagesRes = await axios.get("http://localhost:8000/message", {
                headers: {
                    Authorization:  `Bearer ${token}`
                }
            });

            const messages = messagesRes.data;
            setFriends(users);
            setMessages(messages);
        }

        setSocket(socket);
        fetchData();
        return () => {
            socket.disconnect();
        }
    }, []);
   
    return (
        <div className="flex h-screen">
            <div className="flex-[1]">
                <Sidebar />
            </div>
            
            <div className="flex-[4]">
                <Outlet />
            </div>
        </div>
    );
}