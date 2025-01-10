import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { loggedInUser} = useUser();
  return (
    <nav className="fixed top-0 left-0 w-full py-3 px-[9%] bg-[var(--backgroundColor)] text-[var(--whiteColor)] shadow-[0_4px_12px_rgba(0,0,0,0.659)] flex items-center z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold text-white hover:text-[var(--activeColor)]">
        <Link
              to="/"
              className="text-white hover:text-[var(--activeColor)] transition duration-300 ease-in-out"
            >
              ShoppingNow.
            </Link>
          
        </h1>
        <div className="container mx-auto flex justify-end items-center">
          <div className="space-x-6 text-lg mr-6">
            <Link
              to="/"
              className="text-white hover:text-[var(--activeColor)] transition duration-300 ease-in-out"
            >
              Home
            </Link>
            
            {!loggedInUser && (
            <Link
              to="/login"
              className="text-white hover:text-[var(--activeColor)] transition duration-300 ease-in-out"
            >
              Login
            </Link>
            )}

            {loggedInUser && (
              <Link
              to="/profile"
              className="text-white hover:text-[var(--activeColor)] transition duration-300 ease-in-out"
            >
                {loggedInUser.name}
              </Link>
            )}
            
          </div>

          {loggedInUser && <CartBadge />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
