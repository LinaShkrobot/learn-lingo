import { useState, useEffect } from "react";
import "./Filters.css";

interface FiltersProps {
  onFilter: (filters: {
    language: string;
    level: string;
    price: string;
  }) => void;
}

const languages = ["French", "English", "German", "Ukrainian", "Polish"];
const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
];
const prices = ["10", "20", "30", "40"];

export default function Filters({ onFilter }: FiltersProps) {
  const [language, setLanguage] = useState("French");
  const [level, setLevel] = useState("A1 Beginner");
  const [price, setPrice] = useState("30");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    onFilter({ language, level, price });
  }, []);

  const handleSelect = (field: string, value: string) => {
    if (field === "language") {
      setLanguage(value);
      onFilter({ language: value, level, price });
    } else if (field === "level") {
      setLevel(value);
      onFilter({ language, level: value, price });
    } else {
      setPrice(value);
      onFilter({ language, level, price: value });
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label className="filter-label">Languages</label>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("language")}
          >
            {language}
            <svg className="dropdown-arrow" width="12" height="7">
              <use href="/sprite.svg#icon-chevron-down" />
            </svg>
          </button>
          {openDropdown === "language" && (
            <ul className="dropdown-list">
              {languages.map((item) => (
                <li
                  key={item}
                  className={`dropdown-item ${item === language ? "selected" : ""}`}
                  onClick={() => handleSelect("language", item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Level of knowledge</label>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("level")}
          >
            <span className="dropdown-text">{level}</span>
            <svg className="dropdown-arrow" width="12" height="7">
              <use href="/sprite.svg#icon-chevron-down" />
            </svg>
          </button>
          {openDropdown === "level" && (
            <ul className="dropdown-list">
              {levels.map((item) => (
                <li
                  key={item}
                  className={`dropdown-item ${item === level ? "selected" : ""}`}
                  onClick={() => handleSelect("level", item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Price</label>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("price")}
          >
            {price} $
            <svg className="dropdown-arrow" width="12" height="7">
              <use href="/sprite.svg#icon-chevron-down" />
            </svg>
          </button>
          {openDropdown === "price" && (
            <ul className="dropdown-list">
              {prices.map((item) => (
                <li
                  key={item}
                  className={`dropdown-item ${item === price ? "selected" : ""}`}
                  onClick={() => handleSelect("price", item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
