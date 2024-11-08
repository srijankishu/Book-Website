import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate();

      const onSubmit = async (data) => {
        const userInfo = {
          fullname: data.fullname,
          password: data.password,
          email: data.email, 
        };
         await axios.post("http://localhost:4001/user/signup", userInfo)
        .then((res)=>{
          console.log(res.data);
          if(res.data){
            
            toast.success('signup success')
            navigate("/");
          }
          localStorage.setItem("Users",JSON.stringify(res.data.user));
        }).catch((err) => {
          if(err.response){
          console.log(err);
         
          toast.error("Error: " + err.response.data.message)
          }
        })
      }
  return (
    <div className="flex h-screen p-4 items-center justify-center  bg-[#F7F7F8]">
      <div className="p-6 dark:bg-slate-300 sm:p-8 border rounded-lg shadow shadow-black/30 relative bg-[#F7F7F8] dark:text-white text-white w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-black">✕</Link>
        
        <h3 className="font-bold text-lg mb-4 text-black text-center  sm:text-lg">Signup</h3>
        <div className="space-y-4 sm:space-y-6">
          <label className="flex items-center lg:gap-2 md:gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 text-black">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" 
             className="grow p-2 border border-black text-black rounded-md outline-none" 
             placeholder="Username"
             {...register('fullname', { required: true })} />
          </label>
          {errors.fullname && <span className="block  text-sm text-red-500">Username is required</span>}
          <label className="flex items-center lg:gap-2 md:gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-black flex">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" 
             className="grow p-2 border border-black text-black rounded-md outline-none" 
             placeholder="Email" 
             {...register('email', { required: true })}/>
          </label>
          {errors.Email && <span className="block  text-sm text-red-500">Email is required</span>}
          <label className="flex items-center lg:gap-2 md:gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" h-5 w-5 opacity-70 text-black">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input type="password" 
             className="grow p-2 border text-black border-black rounded-md outline-none" 
             placeholder="Password" 
             {...register('password', { required: true })}/>
          </label>
           {errors.password && <span className="block  text-sm text-red-500">Password is required</span>}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-10">
            <button className="py-2 px-4 bg-slate-700 text-white rounded-lg cursor-pointer">Signup</button>
            <p className="dark:text-black text-center sm:text-left text-black">
              Have an account? <button className="underline text-blue-500 cursor-pointer" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</button>
              <Login />
            </p>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};
