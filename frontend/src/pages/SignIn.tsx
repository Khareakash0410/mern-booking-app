import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string; 
    password: string;
}

const SignIn = () => {
   const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const  { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
           showToast({ message: "Successfully signed!", type: "SUCCESS"});
           await queryClient.invalidateQueries("validateToken");
           navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
             showToast({ message: error.message, type: "ERROR"});
        },

    });

    const onSubmit = handleSubmit((data) => {
       mutation.mutate(data);
    });

  return (
     <form className="flex flex-col gap-5" onSubmit={onSubmit}>
       <h2 className="text-3xl font-bold">
          Sign In Here
       </h2>

       <label className="text-gray-800 text-sm font-bold flex-1">
                          Email
                         <input type="email" className="border w-full rounded px-2 py-1 font-normal"  {...register("email", { required: "This field is required" })} />
                         {errors.email && (<span className="text-red-500"> {errors.email.message} </span>)}
            </label>

            <label className="text-gray-800 text-sm font-bold flex-1">
                          Password
                         <input type="password" className="border w-full rounded px-2 py-1 font-normal"  {...register("password", { required: "This field is required", minLength: {
                            value: 6,
                            message: "Password must be at least 6 or more characters",
                         }, })} />
                         {errors.password && (<span className="text-red-500"> {errors.password.message} </span>)}
            </label>

            <span className="flex items-center justify-between">
               <span className="text-sm">
                   Not Registered? <Link to="/register" className="underline text-blue-600">Register here</Link>
               </span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md">
                    Sign In
                </button>
            </span>


     </form>
  );
};

export default SignIn;