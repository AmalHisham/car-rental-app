import React from "react";
import CitySearch from "../components/common/citySearch";
import BookingContext from "../context/BookingContext";
import SearchForm from "../components/booking/SearchForm";
import "./Cars.css";
import CarCard from "../components/cars/CarCard";
import carsData from "../data/carsData";

export default function Cars() {
  const {
    pickupCity,
    setPickupCity,
    dropCity,
    setDropCity,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = React.useContext(BookingContext);

  return (
    <div className="page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">Find Your Perfect Ride</h1>
          <p className="hero-subtitle">Premium car rentals at your fingertips</p>
        </div>

        <div className="booking-card">
          <div className="booking-form">
            {/* Location Section */}
            <div className="location-row">
              <div className="input-group location-input">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                  </svg>
                </div>
                <div className="input-content">
                  <label className="input-label">Pick-up Location</label>
                  <CitySearch 
                    onSelectCity={setPickupCity}
                    placeholder="Enter city name..."
                  />
                </div>
                {pickupCity && (
                  <div className="selected-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>

              <div className="swap-button">
                <button 
                  type="button" 
                  className="swap-icon-btn" 
                  aria-label="Swap locations"
                  onClick={() => {
                    const temp = pickupCity;
                    setPickupCity(dropCity);
                    setDropCity(temp);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <polyline points="19 12 12 19 5 12"/>
                  </svg>
                </button>
              </div>

              <div className="input-group location-input">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                  </svg>
                </div>
                <div className="input-content">
                  <label className="input-label">Drop-off Location</label>
                  <CitySearch 
                    onSelectCity={setDropCity}
                    placeholder="Enter city name..."
                  />
                </div>
                {dropCity && (
                  <div className="selected-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Date Section */}
            <div className="date-row">
              <div className="input-group date-input-group">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="input-content">
                  <label className="input-label">Pick-up Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group date-input-group">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="input-content">
                  <label className="input-label">Drop-off Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="search-button-wrapper">
              <SearchForm />
            </div>
          </div>

          {/* Quick Info */}
          <div className="booking-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Free Cancellation</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>No Hidden Fees</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {carsData && carsData.length > 0 && (
          <div className="cars-section">
            <div className="section-header">
              <h2 className="section-title">Available Vehicles</h2>
              <p className="section-subtitle">{carsData.length} cars ready for you</p>
            </div>
            <div className="cars-grid">
              {carsData.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

{/* <h1>Available Cars</h1> {carsData.map((item) => <CarCard key = {item.id} car = {item}/>)} */}
