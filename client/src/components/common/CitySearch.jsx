import React from "react";
import { fetchCities } from "../../services/geoDbService";
import "./CitySearch.css";

export default function CitySearch({ label, onSelectCity, placeholder }) {
  const timeRef = React.useRef(null);

  const [query, setQuery] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setCities([]);
      setIsOpen(false);
      return;
    }

    clearTimeout(timeRef.current);

    timeRef.current = setTimeout(async () => {
      const results = await fetchCities(value);
      setCities(results);
      setIsOpen(results && results.length > 0);
    }, 600);
  }

  function handleSelectCity(cityName) {
    setQuery(cityName);
    setCities([]);
    setIsOpen(false);
    onSelectCity(cityName);
  }

  return (
    <div className="city-search-wrapper">
      {label && <label className="city-search-label">{label}</label>}
      <input
        type="text"
        className="city-search-input"
        value={query}
        onChange={handleChange}
        placeholder={placeholder || "Search for a city..."}
        autoComplete="off"
      />

      {isOpen && cities.length > 0 && (
        <ul className="city-dropdown">
          {Array.isArray(cities) &&
            cities.map((city) => (
              <li
                key={city.id}
                className="city-dropdown-item"
                onClick={() => handleSelectCity(city.city)}
              >
                <svg
                  className="city-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                </svg>
                <span>{city.city}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}