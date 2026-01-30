import axios from "axios";

export default function SearchBar({ setProducts }) {
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.post("http://localhost:5000/api/ai/search", {
        query: e.target.value
      });
      setProducts(res.data);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search like a human..."
      onKeyDown={handleSearch}
      style={{ width: "100%", padding: 10, marginBottom: 20 }}
    />
  );
}
