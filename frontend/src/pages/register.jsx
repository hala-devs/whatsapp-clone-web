import {userStore} from "../lips/state";
import {useFormik} from "formik";
import * as Yup from "yup";
import logoHsoub from "../assets/logo.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const {setUser, setToken} = userStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      status: Yup.string().required("Status is required"),
    }),
    async onSubmit(values) {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        values
      );
      const data = response.data;
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        setUser(data.user);
        setToken(data.token);
        navigate("/");
      }
    },
  });

  return (
    <div className='h-screen bg-[#111821]'>
      <div className='flex flex-col space-y-8 justify-center h-full max-w-lg mx-auto px-8 '>
        <img src={logoHsoub} alt='logo' className='w-64 mx-auto' />
        <form onSubmit={formik.handleSubmit}>
          <input
            type='text'
            placeholder='First Name...'
            id='firstName'
            className='w-full p-3 rounded-md bg-[#192734] mb-4 text-white'
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <input
            type='text'
            placeholder='Last Name...'
            id='lastName'
            className='w-full p-3 rounded-md bg-[#192734] mb-4 text-white'
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <input
            type='email'
            id='email'
            placeholder='Email...'
            className='w-full p-3 rounded-md bg-[#192734] mb-4 text-white'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <input
            type='password'
            id='password'
            placeholder='Password...'
            className='w-full p-3 rounded-md bg-[#192734] mb-4 text-white'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <input
            type='text'
            id='status'
            placeholder='Status...'
            className='w-full p-3 rounded-md bg-[#192734] mb-4 text-white'
            value={formik.values.status}
            onChange={formik.handleChange}
          />

          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-semibold'>
            Register
          </button>
          {console.log(formik.errors)}
        </form><p className="text-gray-400 text-center mt-4">Already have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
}

