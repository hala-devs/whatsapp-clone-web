import { create } from "zustand";

export const userStore = create((set) => ({

  user: JSON.parse(localStorage.getItem("user")) || null,

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

  setFriends: (friends) => set({ friends: Array.isArray(friends) ? friends : [] }),


  socket: null,

  setSocket: (socket) => set({ socket }),


  messages: [],

  setMessages: (messages) => {

    if(typeof messages === "function"){
      set((state)=>({
        messages: messages(state.messages)
      }));
    }
    else {
      set({ messages });
    }

  },


  currentReceiver:
    JSON.parse(localStorage.getItem("currentReceiver")) || null,


  setCurrentReceiver: (receiver) => {

    localStorage.setItem(
      "currentReceiver",
      JSON.stringify(receiver)
    );

    set({
      currentReceiver: receiver
    });

  },


  typing: false,

  setTyping: (typing) => set({ typing }),


}));

export default userStore;
