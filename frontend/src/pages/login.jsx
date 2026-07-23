import { userStore } from "../lips/state";
import { useFormik } from "formik";
import * as Yup from "yup";
import logoHsoub from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser, setToken } = userStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string().required("Password is required"),
    }),
    async onSubmit(values) {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/login",
          values
        );
        const data = response.data;

        if (data.error) {
          alert(data.error);
        } else {
          setUser(data.user);
          setToken(data.token);
          navigate("/");
        }
      } catch (error) {
        alert("Login failed. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <div className='h-screen bg-[#111821]'>
      <div className='flex flex-col space-y-8 justify-center h-full max-w-lg mx-auto px-8 '>
        <img src={logoHsoub} alt='logo' className='w-64 mx-auto' />
        <form onSubmit={formik.handleSubmit}>
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

          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-semibold'>
            Login
          </button>
          {console.log(formik.errors)}
        </form><p className="text-gray-400 text-center mt-4">Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/register")}>Create account</span></p>
      </div>
    </div>
  );
}

