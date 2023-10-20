import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: Array<{ id: number; data: string }>;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch product data from your ASP.NET API
    axios.get("https://localhost:44312/api/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            {product.images.map((image) => (
              <img
                key={image.id}
                src={`data:image/jpeg;base64,${image.data}`}
                alt="Product Image"
                width="100"
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
