import React, { useState } from "react";
import "./App.css"; // ✅ Import CSS file

function App() {
  // Initial JSON data
  const initialData = {
    "CSPM Executive Dashboard": [
      { id: 1, name: "Widget 1", text: "Random text for widget 1" },
      { id: 2, name: "Widget 2", text: "Random text for widget 2" },
    ],
    "Security Dashboard": [
      { id: 3, name: "Widget 3", text: "Random text for widget 3" },
    ],
  };

  const [categories, setCategories] = useState(initialData);
  const [search, setSearch] = useState("");

  // Add widget
  const addWidget = (category) => {
    const name = prompt("Enter Widget Name:");
    const text = prompt("Enter Widget Text:");
    if (!name || !text) return;

    const newWidget = {
      id: Date.now(),
      name,
      text,
    };

    setCategories((prev) => ({
      ...prev,
      [category]: [...prev[category], newWidget],
    }));
  };

  // Remove widget
  const removeWidget = (category, id) => {
    setCategories((prev) => ({
      ...prev,
      [category]: prev[category].filter((w) => w.id !== id),
    }));
  };

  // Search filter
  const filteredCategories = {};
  Object.keys(categories).forEach((cat) => {
    filteredCategories[cat] = categories[cat].filter((w) =>
      w.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="app">
      <h1>My Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search widgets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {Object.keys(filteredCategories).map((category) => (
        <div key={category} className="category-box">
          <h2>
            {category}{" "}
            <button onClick={() => addWidget(category)} className="add-btn">
              + Add Widget
            </button>
          </h2>

          <div className="widgets">
            {filteredCategories[category].length > 0 ? (
              filteredCategories[category].map((widget) => (
                <div key={widget.id} className="widget-box">
                  <strong>{widget.name}</strong>
                  <p>{widget.text}</p>
                  <button
                    onClick={() => removeWidget(category, widget.id)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p>No widgets found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
