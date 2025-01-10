import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const Profile: React.FC = () => {
  const { loggedInUser, logout, updateUser, deleteUser} = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    password: loggedInUser?.password || "",
  });

  if (!loggedInUser) {
    return <p>User is not logged in</p>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!loggedInUser.id) return;
      console.log("login user id", loggedInUser.id);
      await updateUser(
        loggedInUser.id,
        formData.name,
        formData.email,
        formData.password,
      );
      
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
    console.log(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteUser(loggedInUser.id);
        // Redirect or handle post-deletion logic
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 justify-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Profile
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div>
          <img
            src={loggedInUser.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />

          {isEditing ? (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:border-[var(--activeColor)] text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:border-[var(--activeColor)] text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:border-[var(--activeColor)] text-white"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleUpdate}
                  className="w-32 bg-[var(--activeColor)] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-32 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">{loggedInUser.name}</h2>
              <p className="text-gray-500">{loggedInUser.email}</p>
              <p className="text-gray-500">{loggedInUser.role}</p>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-32 bg-[var(--bgcolorpage)] text-white py-2 px-4 rounded-lg hover:bg-[var(--activeColor)] transition duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-32 bg-[var(--bgcolorpage)] text-white py-2 px-4 rounded-lg hover:bg-[var(--activeColor)] transition duration-300"
                >
                  Logout
                </button>
                <button
                  onClick={handleDelete}
                  className="w-32 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
