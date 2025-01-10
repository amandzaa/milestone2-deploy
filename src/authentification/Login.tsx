import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  
  const navigate = useNavigate();

  const {
    users,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    loading,
    error,
    setError,
    setLoggedInUser,
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

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const userExists = users.some((user) => user.email === newUserEmail);
    
    if (userExists) {
      // Find the user with matching email and password
      const user = users.find(
        (user) => user.email === newUserEmail && user.password === newUserPassword
      );
  
      if (user) {
        console.log("Login successful", user);
        setError("");
        setNewUserEmail("");
        setNewUserPassword("");
        setLoggedInUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // Redirect to the todo page
      } else {
        setError("Invalid password");
      }
    } else {
      setError("");
      // Email not found, redirect to the register page
      const confirmRedirect = window.confirm(
        "Email is not registered. Would you like to go to the register page?"
      );
      if (confirmRedirect) {
        navigate("/register");
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-[--bgcolorpage]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-[--bgcolorpage] mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-gradient-to-r from-pink-500 to-[--bgcolorpage] rounded-lg shadow-md transition-all duration-500 ease-in-out hover:shadow-xl hover:from-[--bgcolorpage] hover:to-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[--activeColor] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
