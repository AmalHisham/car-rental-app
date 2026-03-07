import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    cars: 0,
    users: 0,
    bookings: 0,
    revenue: 0,
    recentBookings: [],
    bookingStatusData: [],
    carsByTypeData: []
  });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStats() {
      try {
        const [carsRes, usersRes, bookingsRes] = await Promise.all([
          fetch("http://localhost:3001/cars"),
          fetch("http://localhost:3001/users"),
          fetch("http://localhost:3001/bookings"),
        ]);

        const cars = await carsRes.json();
        const users = await usersRes.json();
        const bookings = await bookingsRes.json();

        const customerUsers = users.filter(u => u.role !== "admin");

        const totalRevenue = bookings.reduce(
          (sum, b) => sum + Number(b.totalPrice || 0),
          0
        );

        const bookingStatusData = [
          { name: "Confirmed", value: bookings.filter(b => b.bookingStatus === "CONFIRMED").length },
          { name: "Pending", value: bookings.filter(b => b.bookingStatus === "PENDING").length },
          { name: "Cancelled", value: bookings.filter(b => b.bookingStatus === "CANCELLED").length },
        ];

        const carsByTypeMap = {};
        cars.forEach(car => {
          carsByTypeMap[car.type] = (carsByTypeMap[car.type] || 0) + 1;
        });

        const carsByTypeData = Object.entries(carsByTypeMap).map(
          ([type, count]) => ({ name: type, value: count })
        );

        setStats({
          cars: cars.length,
          users: customerUsers.length,
          bookings: bookings.length,
          revenue: totalRevenue,
          recentBookings: bookings.slice(-5).reverse(),
          bookingStatusData,
          carsByTypeData
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load stats:", error);
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const COLORS = ['#00ff88', '#00cc6e', '#f97316', '#ec4899'];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content-dash">
          <h1 className="dashboard-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard Overview
          </h1>
         
        </div>
        
      </div>

      {loading ? (
        <div className="loading-state-dash">
          <div className="spinner-dash"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card-dash cars">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Cars</p>
                <h3 className="stat-value">{stats.cars}</h3>
                
              </div>
            </div>

            <div className="stat-card-dash users">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Users</p>
                <h3 className="stat-value">{stats.users}</h3>
                
              </div>
            </div>

            <div className="stat-card-dash bookings">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Bookings</p>
                <h3 className="stat-value">{stats.bookings}</h3>
                
              </div>
            </div>

            <div className="stat-card-dash revenue">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Revenue</p>
                <h3 className="stat-value">₹{stats.revenue.toLocaleString()}</h3>
               
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card-dash">
              <div className="chart-header">
                <h3 className="chart-title">Bookings by Status</h3>
                <span className="chart-subtitle">Current distribution</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.bookingStatusData}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis allowDecimals={false} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '2px solid #00ff88', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="#00ff88" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card-dash">
              <div className="chart-header">
                <h3 className="chart-title">Cars by Type</h3>
                <span className="chart-subtitle">Fleet composition</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.carsByTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {stats.carsByTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '2px solid #00ff88', borderRadius: '8px' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="recent-bookings-section">
            <div className="section-header-dash">
              <h2 className="section-title-dash">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Recent Bookings
              </h2>
              <span className="section-subtitle-dash">Last 5 transactions</span>
            </div>

            {stats.recentBookings.length === 0 ? (
              <div className="empty-bookings">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3>No bookings yet</h3>
                <p>Bookings will appear here once customers start renting</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Route</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <div className="user-cell-dash">
                            <div className="user-avatar-dash">
                              {booking.userName?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <span>{booking.userName || "Unknown"}</span>
                          </div>
                        </td>
                        <td>
                          <span className="car-name">{booking.car?.model || "N/A"}</span>
                        </td>
                        <td>
                          <span className="route-text">
                            {booking.pickupCity} → {booking.dropCity}
                          </span>
                        </td>
                        <td>
                          <span className="amount-text">₹{booking.totalPrice}</span>
                        </td>
                        <td>
                          <span className={`status-badge-dash status-${booking.bookingStatus?.toLowerCase()}`}>
                            {booking.bookingStatus || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}