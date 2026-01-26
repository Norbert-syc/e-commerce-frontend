import { categories } from "../data/category";
import "./categoryList.css";

const CategoryList = () => {
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
