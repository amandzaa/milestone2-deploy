import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";

//masukin data struktur
interface UserData {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

//masukin konteks data struktur
interface UserContextType {
  users: UserData[];
  loggedInUser: UserData | null;
  setLoggedInUser: (user: UserData | null) => void;
  login: (userData: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  newUserName: string;
  setNewUserName: (name: string) => void;
  newUserEmail: string;
  setNewUserEmail: (email: string) => void;
  newUserPassword: string;
  setNewUserPassword: (password: string) => void;
  loading: boolean;
  statusRespond: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  fetchUsers: () => Promise<void>;
  addUser: () => Promise<void>;
  updateUser: (
    id: number,
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

//buat context initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

//buat provider componentnya
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusRespond, setStatusRespond] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: UserData) => {
    setLoggedInUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const logout = () => {
    setLoggedInUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Clear cart on logout
    navigate("/login");
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      console.log("data",data);
    } catch (error) {
      setError("Error fetching todos");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current users to determine the last ID
      const cekResponse = await fetch("https://api.escuelajs.co/api/v1/users");

      const data = await cekResponse.json();
      // Get the highest ID in the list
      const lastId = data.reduce(
        (maxId: number, user: { id: number }) => Math.max(maxId, user.id),
        0
      );
      // Generate a new ID
      const newId = lastId + 1;
      const newUser = {
        id: newId,
        name: newUserName,
        role: "customer",
        email: newUserEmail,
        password: newUserPassword,
        avatar: "https://i.imgur.com/Jvh1OQm.jpeg",
      };

      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setStatusRespond(true);
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);
        login(createdUser);
        console.log("User registered successfully:", createdUser);
        navigate("/");
        alert("Registration successful! ");
      } else {
        setStatusRespond(false);
        const errorData = await response.json();
        console.error("Failed to register user.");
        console.error("Error response:", errorData);
        setError("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    id: number,
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateUser
          }),
        }
      );

      await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch edit product");
      }
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, name, email, password } : user
        )
      );
      if (loggedInUser && loggedInUser.id === id) {
        setLoggedInUser({
          ...loggedInUser,
          name,
          email,
          password,
        });
      }
    } catch (error) {
      setError("Error updating user");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      setError("Error deleting user");
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    users,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserPassword,
    setNewUserPassword,
    loading,
    statusRespond,
    error,
    setError,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    loggedInUser,
    setLoggedInUser,
    login,
    logout,
    isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
