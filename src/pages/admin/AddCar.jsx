import React from "react";
import { addCar } from "../../services/carService";
import "./AddCar.css";

export default function AddCar({ onCarAdded, onCancel }) {
  const [car, setCar] = React.useState({
    model: "",
    type: "",
    pricePerDay: "",
    image: "",
  });

  const [loading, setLoading] = React.useState(false);

  function handleChange(e) {
    setCar({ ...car, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newCar = await addCar(car);
      onCarAdded(newCar);
      setCar({ model: "", type: "", pricePerDay: "", image: "" });
    } catch (error) {
      console.error("Failed to add car:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-car-container">
      <div className="add-car-header">
        <div className="header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13"/>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <div className="header-text">
          <h2 className="add-car-title">Add New Vehicle</h2>
          <p className="add-car-subtitle">Fill in the details to add a new car to your inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-row">
          <div className="form-group-add-car">
            <label className="form-label-add-car">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Car Model
            </label>
            <input
              name="model"
              placeholder="e.g., Tesla Model 3, BMW X5"
              onChange={handleChange}
              value={car.model}
              className="form-input-add-car"
              required
            />
          </div>

          <div className="form-group-add-car">
            <label className="form-label-add-car">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              Vehicle Type
            </label>
            <input
              name="type"
              placeholder="e.g., Sedan, SUV, Luxury"
              onChange={handleChange}
              value={car.type}
              className="form-input-add-car"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group-add-car">
            <label className="form-label-add-car">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Price per Day (₹)
            </label>
            <input
              name="pricePerDay"
              type="number"
              placeholder="2000"
              onChange={handleChange}
              value={car.pricePerDay}
              className="form-input-add-car"
              required
              min="0"
            />
          </div>

          <div className="form-group-add-car full-width">
            <label className="form-label-add-car">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Image URL
            </label>
            <input
              name="image"
              placeholder="https://example.com/car-image.jpg"
              onChange={handleChange}
              value={car.image}
              className="form-input-add-car"
              required
            />
          </div>
        </div>

        {car.image && (
          <div className="image-preview">
            <p className="preview-label">Image Preview:</p>
            <div className="preview-container">
              <img src={car.image} alt="Car preview" className="preview-image" />
            </div>
          </div>
        )}

        <div className="form-actions-add-car">
          <button
            type="button"
            className="cancel-btn-add-car"
            onClick={onCancel}
            disabled={loading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn-add-car"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-add-car"></span>
                Adding...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Add Vehicle
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}