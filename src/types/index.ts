export interface Users {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string };
  images: string[];
}

export interface CartItem extends Products{
    quantity: number;
  }
  
export  interface ProductListProps {
    products: Products[];
    addToCart: (product: Products) => void;
  }