import React from "react";
import AuthContext from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";
import "./MyBookings.css";
import { cancelBooking } from "../services/bookingService"
import { useToast, ToastContainer } from "../components/common/Toast";

export default function MyBookings() {
  const { user } = React.useContext(AuthContext);

  const [bookings, setBookings] = React.useState([]);
  const { toasts, removeToast, confirm, success, error: showError } = useToast();

  React.useEffect(() => {
    async function loadBookings() {
      const data = await getUserBookings();
      setBookings(data);
    }
  
    loadBookings();
  }, []);


  const handleCancel = (id) => {
  confirm("Are you sure you want to cancel this booking?", async () => {
    try {
      await cancelBooking(id);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, bookingStatus: "CANCELLED" } : b
        )
      );

      success("Booking cancelled successfully");
    } catch {
      showError("Failed to cancel booking");
    }
  });
};
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
            <div key={booking._id} className="booking-card-modern">
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
                      src={`http://localhost:5000/uploads/${booking.carId.image}`}
                      alt={booking.carId.model}
                      className="car-image-booking"
                    />
                  </div>
                  <div className="car-details-compact">
                    <h3 className="car-model-name">{booking.carId.model}</h3>
                    <p className="car-price-display">₹{booking.carId.pricePerDay} / day</p>
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
                    {booking.bookingStatus !== "CANCELLED" && (
                    <button
                      className="action-btn danger-btn"
                      onClick={() => handleCancel(booking._id)}
                    >
                      ❌ Cancel
                    </button>
)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}