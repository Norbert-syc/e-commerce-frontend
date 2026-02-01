import {useEffect, useState}from "react";
import api from "../api/axios";
import "./categoryList.css";


interface category{
  id:string;
  name:string;
  image:string;
}


const CategoryList = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  if (loading) return <p>Loading categories...</p>
  return (
    <section className="category-section">
      <div className="category-wrapper">
        <h2 className="category-title">SHOP BY CATEGORY</h2>
        <div className="category-container">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <img src={category.image} alt={category.name} />
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
