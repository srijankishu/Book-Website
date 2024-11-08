import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email, 
      password: data.password,
      
    };
    console.log(userInfo)
     await axios.post("http://localhost:4001/user/login", userInfo)
    .then((res)=>{
      console.log(res.data);
      if(res.data){
      
        toast.success('Login success')
        document.getElementById("my_modal_3").close();

        setTimeout(() =>{
        window.location.reload();
      },3000);


      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    }).catch((err) => {
      if(err.response){
      console.log(err);
      toast.error("Error: " + err.response.data.message)
      setTimeout(() =>{},2000);

      }
    });
  }

  return (
    <div className="flex justify-center">
    <dialog id="my_modal_3" className="modal flex justify-center items-center mx-auto sm:h-screen sm:w-screen md:gap-2 ">
      <div className="modal-box relative  dark:bg-slate-300 bg-[#F7F7F8]   ">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black" onClick = {() =>
                 document.getElementById("my_modal_3").close()}>
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4  text-black ">Login</h3>
          <div className="space-y-6 ">
            <div>
              <label className="flex items-center lg:gap-2 md:gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70 dark:text-black"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="Email"
                  className="grow p-2 border border-black rounded-md outline-none text-black"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
              </label>
              {errors.Email && <span className="px-6 block text-red-500">Email is required</span>}
            </div>

            <div>
              <label className="flex items-center lg:gap-2 md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70 dark:text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow p-2 border border-black rounded-md outline-none text-black"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
              </label>
              {errors.Password && <span className=" px-6 block text-red-500">Password is required</span>}
            </div>

            <div className="flex items-center gap-10">
              <button className="py-2 px-4 bg-slate-700 text-white rounded-lg cursor-pointer">Login</button>
              <p className=" text-black">
                Not Registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Sign up</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </dialog>
    </div>
  );
};

export default Login;
