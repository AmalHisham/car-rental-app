import React from "react";
import { getCars, deleteCar, updateCar } from "../../services/carService";
import AddCar from "./AddCar";
import "./AdminCars.css";

export default function AdminCars() {
  const [cars, setCars] = React.useState([]);
  const [editingCarId, setEditingCarId] = React.useState(null);
  const [showAddCar, setShowAddCar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [formData, setFormData] = React.useState({
    model: "",
    type: "",
    pricePerDay: "",
    image: "",
  });

  React.useEffect(() => {
    setLoading(true);
    getCars().then((data) => {
      setCars(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    deleteCar(id).then(() => {
      setCars((prev) => prev.filter((c) => c.id !== id));
    });
  }

  function handleEdit(car) {
    setShowAddCar(false);
    setEditingCarId(car.id);
    setFormData({
      model: car.model,
      type: car.type,
      pricePerDay: car.pricePerDay,
      image: car.image,
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(id) {
    const updatedCar = { id, ...formData };
    const savedCar = await updateCar(id, updatedCar);

    setCars((prev) => prev.map((car) => (car.id === id ? savedCar : car)));

    setEditingCarId(null);
  }

  const filteredCars = cars.filter((car) =>
    car.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-cars-container">
      <div className="cars-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="cars-title">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Vehicle Management
            </h1>
            <p className="cars-subtitle">Manage your car inventory</p>
          </div>
          <button
            className="add-car-btn-main"
            onClick={() => {
              setEditingCarId(null);
              setShowAddCar(true);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New Car
          </button>
        </div>

        <div className="search-stats-bar">
          <div className="search-box-cars">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search cars by model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-cars"
            />
            {searchQuery && (
              <button className="clear-search-cars" onClick={() => setSearchQuery("")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          <div className="stats-bar-cars">
            <div className="stat-item-cars">
              <span className="stat-value-cars">{cars.length}</span>
              <span className="stat-label-cars">Total Cars</span>
            </div>
            <div className="stat-item-cars">
              <span className="stat-value-cars">{filteredCars.length}</span>
              <span className="stat-label-cars">Showing</span>
            </div>
          </div>
        </div>
      </div>

      {showAddCar && (
        <div className="add-car-modal">
          <AddCar
            onCarAdded={(newCar) => {
              setCars((prev) => [...prev, newCar]);
              setShowAddCar(false);
            }}
            onCancel={() => setShowAddCar(false)}
          />
        </div>
      )}

      <div className="cars-content">
        {loading ? (
          <div className="loading-state-cars">
            <div className="spinner-cars"></div>
            <p>Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="empty-state-cars">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <h3>No cars found</h3>
            <p>Add your first vehicle to get started</p>
          </div>
        ) : (
          <div className="cars-grid">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card-admin">
                {editingCarId === car.id ? (
                  <div className="edit-form">
                    <h3 className="edit-title">Edit Vehicle</h3>
                    <div className="form-group-cars">
                      <label>Model</label>
                      <input
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="e.g., Tesla Model 3"
                        className="form-input-cars"
                      />
                    </div>
                    <div className="form-group-cars">
                      <label>Type</label>
                      <input
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="e.g., Sedan, SUV"
                        className="form-input-cars"
                      />
                    </div>
                    <div className="form-group-cars">
                      <label>Price per Day (₹)</label>
                      <input
                        name="pricePerDay"
                        type="number"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        placeholder="2000"
                        className="form-input-cars"
                      />
                    </div>
                    <div className="form-group-cars">
                      <label>Image URL</label>
                      <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/car.jpg"
                        className="form-input-cars"
                      />
                    </div>

                    <div className="form-actions">
                      <button className="save-btn" onClick={() => handleUpdate(car.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Save Changes
                      </button>
                      <button className="cancel-btn" onClick={() => setEditingCarId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="car-image-container">
                      <img src={car.image} alt={car.model} className="car-image-admin" />
                      <div className="car-type-badge">{car.type}</div>
                    </div>

                    <div className="car-details-admin">
                      <h3 className="car-model-admin">{car.model}</h3>
                      <div className="car-price-row">
                        <span className="car-price">₹{car.pricePerDay}</span>
                        <span className="price-period">/ day</span>
                      </div>

                      <div className="car-actions">
                        <button className="edit-btn-car" onClick={() => handleEdit(car)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button className="delete-btn-car" onClick={() => handleDelete(car.id)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}