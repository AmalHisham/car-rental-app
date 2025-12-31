import React from "react";
import BookingContext from "../context/BookingContext";
import carsData from "../data/carsData";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

export default function SearchResults() {
  const {
    pickupCity,
    dropCity,
    startDate,
    endDate,
    totalDays,
    setSelectedCar,
  } = React.useContext(BookingContext);

  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  const filteredCars = carsData.filter((car) =>
    car.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <div className="container">
        {/* Booking Summary Section */}
        <div className="summary-card">
          <div className="summary-header">


            <span className="results-count">
              {filteredCars.length} cars available
            </span>
          </div>

          {/* Trip Details */}
          <div className="trip-details">
            <div className="trip-info">
              <div className="trip-route">
                <div className="location-badge">
                  <span>{pickupCity}</span>
                </div>

                <div className="route-arrow">→</div>

                <div className="location-badge">
                  <span>{dropCity}</span>
                </div>
              </div>

              <div className="date-info">
                <div className="date-badge">{startDate}</div>
                <span className="date-separator">to</span>
                <div className="date-badge">{endDate}</div>
              </div>
            </div>

            <div className="duration-badge">
              {totalDays} {totalDays === 1 ? "day" : "days"}
            </div>
          </div>

          {/* 🔍 Inline Search Box (replaces title) */}
          <div className="search-bar-inline">
              <svg
                className="search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Search car model..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input-inline"
              />

              {query && (
                <button
                  className="clear-btn-inline"
                  onClick={() => setQuery("")}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="results-grid">
            {filteredCars.map((car) => (
              <div key={car.id} className="result-card">
                <div className="car-image-container">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="car-image"
                  />
                  <div className="car-badge">Premium</div>
                </div>

                <div className="car-details">
                  <h3 className="car-model">{car.model}</h3>

                  <div className="pricing-section">
                    <div className="price-info">
                      <span className="price-label">Per Day</span>
                      <span className="price-daily">₹{car.pricePerDay}</span>
                    </div>

                    <div className="price-divider"></div>

                    <div className="price-info">
                      <span className="price-label">
                        Total ({totalDays}{" "}
                        {totalDays === 1 ? "day" : "days"})
                      </span>
                      <span className="price-total">
                        ₹{car.pricePerDay * totalDays}
                      </span>
                    </div>
                  </div>

                  <button
                    className="select-btn"
                    onClick={() => {
                      setSelectedCar(car);
                      navigate("/checkout");
                    }}
                  >
                    Select This Car →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No cars found</h3>
            <p>Try searching a different model</p>
          </div>
        )}
      </div>
    </div>
  );
}
