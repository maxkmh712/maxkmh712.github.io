function CategoryList() {
  const categories = ["PROJECT", "JavaScript", "Node.js", "알고리즘", "기타"];

  return (
    <div className="category-list">
      <h3>카테고리</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href={`/categories/#${category}`}>{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
