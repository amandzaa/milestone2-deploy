import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    users,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    statusRespond,
    loading,
    error,
    addUser,
  } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(newUserPassword)) {
      alert(
        "Password must be at least 8 characters and contain only letters and numbers!"
      );
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newUserEmail)) {
      alert("Please input corect email address!");
      return false;
    }

    // Validate password match
    if (newUserPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }

    const userExists = users.some((user) => user.email === newUserEmail);

    if (userExists) {
      const confirmRedirect = window.confirm(
        "Email is already registered. Would you like to go to the login page?"
      );
      if (confirmRedirect) {
        navigate("/login");
      }
    } else {
      setIsButtonDisabled(true); // Disable the button
      addUser();

      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable the button after 5 seconds
      }, 5000);
      console.log(statusRespond);
      if (statusRespond) {
        // Clear form values
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-[--bgcolorpage]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-[--bgcolorpage] mb-6">
          Register
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newUserName}
              placeholder="Enter your name"
              className="text-white w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--activeColor] focus:outline-none"
              onChange={(event) => setNewUserName(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={newUserEmail}
              placeholder="Enter your email"
              className="text-white w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--activeColor] focus:outline-none"
              onChange={(event) => setNewUserEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={newUserPassword}
              placeholder="Enter your password"
              className="text-white w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--activeColor] focus:outline-none"
              onChange={(event) => setNewUserPassword(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              className="text-white w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--activeColor] focus:outline-none"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[--activeColor] font-medium hover:underline"
            >
              Login
            </a>
          </p>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full px-4 py-2 text-white font-medium bg-gradient-to-r from-pink-500 to-[--bgcolorpage] rounded-lg shadow-md transition-all duration-500 ease-in-out ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:from-[--bgcolorpage] hover:to-pink-500"
            }`}
          >
            {isButtonDisabled ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
