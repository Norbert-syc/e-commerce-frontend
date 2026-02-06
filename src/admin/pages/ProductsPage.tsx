import { useState, useEffect } from "react";
import { getProducts, createProduct, deleteProduct } from "../../api/productService";
import { getCategories } from "../../api/categoryService";
import type { Product } from "../../types/product";
import type { Category } from "../../types/category";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    categoryId: "",
    quantity: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first. You need to be authenticated to create products.');
        return;
      }
      await createProduct(formData);
      setFormData({ name: "", price: 0, description: "", image: "", categoryId: "", quantity: 0 });
      fetchProducts();
      alert("Product created!");
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
      } else {
        alert("Failed to create product: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(id);
      fetchProducts();
      alert('Product deleted!');
    } catch (error: any) {
      alert('Failed to delete product: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "black" }}>Products Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", background: "white", border: "1px solid #ddd" }}>
        <h2 style={{ color: "black" }}>Create Product</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Enter price (e.g., 29.99)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Enter quantity (e.g., 100)"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            required
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "#9333ea", color: "white", border: "none", cursor: "pointer" }}>
          Create
        </button>
      </form>

      <h2 style={{ color: "black" }}>All Products</h2>
      {loading ? <p style={{ color: "black" }}>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Price</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Quantity</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id || prod.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{prod.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>${prod.price}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{prod.quantity}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  <button 
                    onClick={() => handleDelete(prod._id || prod.id?.toString() || '')}
                    style={{ padding: "5px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsPage;
