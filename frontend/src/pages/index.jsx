import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { userStore } from "../lips/state";
import axios from "axios";

export default function HomePage() {

    const {
        setSocket,
        token,
        setMessages,
        setFriends,
        setTyping,
        setUser,
        setCurrentReceiver,
        currentReceiver,
        user
    } = userStore();


    useEffect(() => {

        if (!token) return;


        const socket = io("http://localhost:8000", {
            query: "token=" + token
        });



        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });



        socket.on("disconnect", () => {
            console.log("Disconnected");
        });



        socket.on("typing", () => {
            setTyping(true);
        });



        socket.on("stop_typing", () => {
            setTyping(false);
        });



        socket.on("user_created", (user_created) => {

            if (user_created._id !== user?._id) {

                setFriends((currentFriends) => [
                    ...currentFriends,
                    user_created
                ]);

            }

        });



        socket.on("user_updated", (userUpdated) => {

            console.log("User updated:", userUpdated);


            // تحديث بيانات المستخدم الحالي
            if (user?._id === userUpdated._id) {

                setUser(userUpdated);

            }



            // تحديث الشخص المفتوح في الشات
            if (
                currentReceiver &&
                currentReceiver._id === userUpdated._id
            ) {

                setCurrentReceiver({

                    ...currentReceiver,

                    sender:
                        userUpdated.firstName +
                        " " +
                        userUpdated.lastName,

                    status: userUpdated.status,

                    profilePicture:
                        userUpdated.profilePicture

                });

            }



            // تحديث السايدبار
            setFriends((friends) =>

                friends.map((friend) =>

                    friend._id === userUpdated._id
                        ? userUpdated
                        : friend

                )

            );


        });




        socket.on("receive_message", (newMessage) => {

            console.log("New message:", newMessage);


            setMessages((currentMessages) => [

                ...currentMessages,

                newMessage

            ]);


        });




        const fetchData = async () => {

            try {


                const usersRes = await axios.get(

                    "http://localhost:8000/user",

                    {

                        headers: {

                            Authorization: token

                        }

                    }

                );



                const messagesRes = await axios.get(

                    "http://localhost:8000/message",

                    {

                        headers: {

                            Authorization: token

                        }

                    }

                );



                setFriends(usersRes.data);



                const messages = Array.isArray(messagesRes.data)

                    ? messagesRes.data

                    : messagesRes.data.messages || [];



                setMessages(messages);



            } catch(error) {


                console.log(

                    error.response?.data || error

                );


            }


        };




        setSocket(socket);


        fetchData();




        return () => {

            socket.disconnect();

        };



    }, [token]);




    return (

        <div className="flex h-screen overflow-hidden">


            <div className="flex-[1]">

                <Sidebar />

            </div>



            <div className="flex-[4]">

                <Outlet />

            </div>


        </div>

    );

}
