import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/categoryService";
import type { Category } from "../../types/category";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first. You need to be authenticated to create categories.');
        return;
      }
      await createCategory(formData);
      setFormData({ name: "", description: "", image: "" });
      fetchCategories();
      alert("Category created!");
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
      } else {
        alert("Failed to create category: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await deleteCategory(id);
      fetchCategories();
      alert('Category deleted!');
    } catch (error: any) {
      alert('Failed to delete category: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "black" }}>Categories Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", background: "white", border: "1px solid #ddd" }}>
        <h2 style={{ color: "black" }}>Create Category</h2>
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
            type="text"
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
            style={{ width: "100%", padding: "8px", background: "white", color: "black", border: "1px solid #ccc" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "#9333ea", color: "white", border: "none", cursor: "pointer" }}>
          Create
        </button>
      </form>

      <h2 style={{ color: "black" }}>All Categories</h2>
      {loading ? <p style={{ color: "black" }}>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Description</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Image</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id || cat.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{cat.name || 'N/A'}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>{cat.description || 'No description'}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  {cat.image && <img src={cat.image} alt={cat.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd", color: "black" }}>
                  <button 
                    onClick={() => handleDelete(cat._id || cat.id?.toString() || '')}
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

export default CategoriesPage;
