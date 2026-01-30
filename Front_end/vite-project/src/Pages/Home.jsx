import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <SearchBar setProducts={setProducts} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
