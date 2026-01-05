import React from "react";
import AuthContext from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";
import "./MyBookings.css";

export default function MyBookings() {
  const { user } = React.useContext(AuthContext);

  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    async function loadBookings() {
      const data = await getUserBookings(user.id);
      setBookings(data);
    }
  
    loadBookings();
  }, [user.id]);

  if (bookings.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-bookings">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h2 className="empty-title">No Bookings Yet</h2>
            <p className="empty-subtitle">
              Start your journey by booking your first vehicle
            </p>
            <a href="/" className="browse-cars-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Browse Cars</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="bookings-header">
          <div className="header-content">
            <h1 className="bookings-title">My Bookings</h1>
            <p className="bookings-subtitle">
              Manage and track all your vehicle reservations
            </p>
          </div>
          <div className="bookings-count-badge">
            <span className="count-number">{bookings.length}</span>
            <span className="count-label">{bookings.length === 1 ? 'Booking' : 'Bookings'}</span>
          </div>
        </div>

        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card-modern">
              <div className="booking-status-bar">
                <span className={`status-badge status-${booking.bookingStatus.toLowerCase().replace(' ', '-')}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {booking.bookingStatus === "Confirmed" ? (
                      <polyline points="20 6 9 17 4 12"/>
                    ) : booking.bookingStatus === "Pending" ? (
                      <circle cx="12" cy="12" r="10"/>
                    ) : (
                      <line x1="18" y1="6" x2="6" y2="18"/>
                    )}
                  </svg>
                  {booking.bookingStatus}
                </span>
                <span className="booking-id">#{String(booking.id).slice(0, 8)}</span>
              </div>

              <div className="booking-content">
                <div className="car-preview">
                  <div className="car-image-wrapper">
                    <img
                      src={booking.car.image}
                      alt={booking.car.model}
                      className="car-image-booking"
                    />
                  </div>
                  <div className="car-details-compact">
                    <h3 className="car-model-name">{booking.car.model}</h3>
                    <p className="car-price-display">₹{booking.car.pricePerDay} / day</p>
                  </div>
                </div>

                <div className="booking-details-section">
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="10" r="3"/>
                          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Route</span>
                        <span className="detail-value">{booking.pickupCity} → {booking.dropCity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{booking.startDate} - {booking.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                      </div>
                      <div className="detail-content">
                        <span className="detail-label">Total Days</span>
                        <span className="detail-value-highlight">{booking.totalDays} {booking.totalDays === 1 ? 'day' : 'days'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="total-price-section">
                    <span className="price-label">Total Amount</span>
                    <span className="price-amount">₹{booking.totalPrice}</span>
                  </div>
                  <div className="booking-actions">
                    <button className="action-btn secondary-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      <span>Invoice</span>
                    </button>
                    <button className="action-btn primary-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}