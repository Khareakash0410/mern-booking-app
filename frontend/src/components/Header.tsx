import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";


const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
        <div className="bg-blue-800 py-6">
             <div className="container mx-auto flex justify-between">
                <span className="font-bold text-white text-3xl tracking-tight">
                      <Link to="/">
                        BooksOyyo.com
                      </Link>
                </span>

                <span className="flex space-x-2">
                  {isLoggedIn ? (
                  <>
                  <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Bookings</Link>
                  <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Hotels</Link>
                  <SignOutButton />
                  </>
                )  : (
                  <Link 
                  to="/sign-in" 
                  className=" bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-200 hover:text-green-500">
                    Sign In
                 </Link> )}
                   
                </span>
             </div>
        </div>
  );
};

export default Header;