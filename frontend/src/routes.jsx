import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./components/Chat/Chat";
import NoUserSelected from "./components/Chat/NoUserSeleted";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/Profile/UserProfile";


const router = createBrowserRouter([

  {
    path: "/",

    element:
    (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),

    children:[

      {
        index:true,
        element:<NoUserSelected/>
      },


      {
        path:"profile/:userId",
        element:<UserProfile/>
      },


      {
        path:":receiverId",
        element:<Chat/>
      }

    ]
  },


  {
    path:"/login",
    element:<Login/>
  },


  {
    path:"/register",
    element:<Register/>
  }

]);


export default function Router(){

 return <RouterProvider router={router}/>;

}
