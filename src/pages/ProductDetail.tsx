import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Products } from "../types";
import { useCart } from "../context/CartContext";
import ProductSlideshow from "../components/ProductSlideshow";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate= useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details.");
      setLoading(false);
      navigate("/404");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-40 pt-20">
      <Link to="/" className="text-[var(--bgcolorpage)] hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-6 overflow-auto">
        <div className="slideshow-container">
          <ProductSlideshow images={product.images} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 break-words">
          {product.title}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-500 font-bold text-2xl mb-4">
          ${product.price}
        </p>
        <p className="text-gray-500">
          Category: {product.category?.name || "N/A"}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-40 mt-4 bg-[var(--bgcolorpage)] text-white py-2 px-4 text-center rounded-lg hover:bg-[var(--activeColor)] transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
