import { Socket } from "socket.io-client";
import { create } from "zustand";

export const userStore = create((set) => ({
  user:  JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token") || null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  friends: [],
  setFriends: (friends) => set({friends}),
  Socket: null,
  setSocket: (socket) => set({socket}),
  messages:[],
  setMessages: (messages) => set({messages}),
  currentReceiver: { // إضافة قيمة افتراضية فقط
    sender: "",
    status: ""
  },
  setCurrentReceiver: (receiver) => set({currentReceiver: receiver}),
  typing: false,
  setTyping: (typing) => set( {typing} ),
}));

export default userStore;