import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";
// Masukin data structure
interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Categories;
  images: string[];
}

interface Categories {
  id: number;
  name: string;
  image: string;
}

// Masukan context data structure
interface ProductContextType {
  products: ProductData[];
  categories: Categories[];
  loadingProduct: boolean;
  errorProduct: string | null;
}

const defaultValue: ProductContextType = {
    products: [],
    categories: [],
    loadingProduct: false,
    errorProduct: null,
  };

// buat context initial value
export const ProductContext = createContext<ProductContextType>(defaultValue);

// buat provider componentnya
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      setProducts(data);
      setLoadingProduct(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorProduct("Failed to load products.");
      setLoadingProduct(false);
      navigate("/404");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
    setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setErrorProduct("Failed to load categories.");
      navigate("/404");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const valueProduct = {
    products,
    categories,
    loadingProduct,
    errorProduct,
  };

  return (
    <ProductContext.Provider value={valueProduct}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error("useProduct must be used within ProductProvider ");
  }

  return context;
};
