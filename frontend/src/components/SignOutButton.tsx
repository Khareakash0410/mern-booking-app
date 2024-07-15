import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {

    const queyClient = useQueryClient();

    const { showToast } = useAppContext();
    const mutation = useMutation(
        apiClient.signOut, {
            onSuccess: async () => {
                await queyClient.invalidateQueries("validateToken");
                showToast({ message: "Signed Out!", type: "SUCCESS"});
            },
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR"})
            },
        }
    );

    const handleClick = () => {
        mutation.mutate();
    };
  return (
    <button onClick={handleClick} className="px-3 text-blue-600 font-bold bg-white hover:bg-gray-200">Sign Out</button>
  );
};

export default SignOutButton;