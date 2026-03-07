import React from "react";
import { useParams, Link } from "react-router-dom";
import { getBookingsByUser } from "../../services/bookingService";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getBookingsByUser(id)
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div className="user-details-container">
      {/* Header */}
      <div className="user-details-header">
        <Link to="/admin/users" className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Users
        </Link>

        <div className="header-content-user">
          <div className="user-avatar-large">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="header-text-user">
            <h1 className="user-details-title">User Booking History</h1>
            <p className="user-details-subtitle">
              User ID: <span className="user-id-badge">{id}</span>
            </p>
          </div>
        </div>

        <div className="bookings-summary">
          <div className="summary-item">
            <span className="summary-value">{bookings.length}</span>
            <span className="summary-label">Total Bookings</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">
              ₹{bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
            </span>
            <span className="summary-label">Total Revenue</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="user-details-content">
        {loading ? (
          <div className="loading-state-user">
            <div className="spinner-user"></div>
            <p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state-user">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <h3>No Bookings Found</h3>
            <p>This user hasn't made any bookings yet</p>
          </div>
        ) : (
          <div className="bookings-list-user">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card-user">
                <div className="booking-header-user">
                  <div className="booking-id-user">
                    Booking #{booking.id?.toString().slice(0, 8)}
                  </div>
                  <span className={`status-badge-user status-${booking.bookingStatus?.toLowerCase()}`}>
                    {booking.bookingStatus || "Pending"}
                  </span>
                </div>

                <div className="booking-body-user">
                  {/* Car Info */}
                  <div className="info-section">
                    <div className="section-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13"/>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    </div>
                    <div className="section-content">
                      <span className="section-label">Vehicle</span>
                      <span className="section-value">{booking.car?.model || "N/A"}</span>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="info-section">
                    <div className="section-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="10" r="3"/>
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                      </svg>
                    </div>
                    <div className="section-content">
                      <span className="section-label">Route</span>
                      <span className="section-value">
                        {booking.pickupCity} → {booking.dropCity}
                      </span>
                    </div>
                  </div>

                  {/* Duration Info */}
                  <div className="info-section">
                    <div className="section-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="section-content">
                      <span className="section-label">Duration</span>
                      <span className="section-value">
                        {booking.startDate} - {booking.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="info-section">
                    <div className="section-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    </div>
                    <div className="section-content">
                      <span className="section-label">Payment</span>
                      <span className="section-value">
                        {booking.payment?.status || "Pending"} ({booking.payment?.method || "N/A"})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="booking-footer-user">
                  <div className="total-amount-user">
                    <span className="amount-label">Total Amount</span>
                    <span className="amount-value">₹{booking.totalPrice || 0}</span>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}