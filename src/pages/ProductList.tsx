import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { products, categories, loadingProduct, errorProduct } = useProduct();
  const { addToCart } = useCart();

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory
        );

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (errorProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{errorProduct}</p>
      </div>
    );
  }

  return (
    <div className="flex pt-20 h-screen px-40">
      {/* Sidebar */}
      <div className="w-1/4 h-full bg-[var(--bgProducthover)] border-r overflow-auto rounded-lg px-5 pt-6">
        <h2 className="flex flex-col text-2xl font-bold mb-4 items-center">
          Categories
        </h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer p-2 rounded-lg transition-transform duration-300 ease-in-out ${
              selectedCategory === "all"
                ? "bg-[var(--activeColor)] text-white"
                : "hover:bg-[var(--secondColor)] transform hover:scale-105"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer p-2 pl-6 rounded-lg transition-transform duration-300 ease-in-out ${
                selectedCategory === category.name
                  ? "bg-[var(--activeColor)] text-white shadow-md"
                  : "hover:bg-[var(--secondColor)] transform hover:scale-105"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center transform transition-all duration-300 hover:bg-[--bgProducthover] hover:shadow-lg"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-base md:text-lg font-bold text-center text-gray-800 break-words">
                  {product.title}
                </h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="w-40 block mt-4 bg-[var(--bgcolorpage)] text-white py-2 px-4 text-center rounded-lg hover:bg-[var(--activeColor)] transition duration-300"
                >
                  View Details
                </Link>

                <button
                  onClick={() => 
                    addToCart(product)
                  }
                  className="w-40 mt-4 bg-[var(--bgcolorpage)] text-white py-2 px-4 text-center rounded-lg hover:bg-[var(--activeColor)] transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
