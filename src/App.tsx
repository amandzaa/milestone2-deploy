import Navbar from "./components/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./authentification/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Register from "./authentification/Register";
import ProductList from "./pages/ProductList";
import Cart from "./cart/Cart";
import ProductDetail from "./pages/ProductDetail";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routing/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/profile/" element={<Profile />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/profile" element={<Navigate to="/profile/Guest" replace />} /> */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
