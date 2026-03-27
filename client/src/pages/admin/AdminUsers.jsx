import React from "react";
import { Link } from "react-router-dom";
import { deleteUser, toggleUserStatus } from "../../services/userService";
import "./AdminUsers.css";
import { ToastContainer, useToast } from "../../components/common/Toast";
export default function AdminUsers() {

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [error, setError] = React.useState(null);

const { toasts, removeToast, confirm, success, error: showError } = useToast();

  React.useEffect(() => {

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const query = new URLSearchParams({
          search: searchQuery
        });

        const res = await fetch(
          `http://localhost:5000/api/admin/users?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        setUsers(data);

      } catch (err) {
        setError("Failed to load users");
      }

      setLoading(false);
    };

    setLoading(true);
    fetchUsers();

  }, [searchQuery]);


function handleDelete(userId) {
  confirm("Are you sure you want to delete this user?", async () => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      success("User deleted successfully");
    } catch {
      showError("Failed to delete user");
    }
  });
}



  function handleToggleBlock(user) {

    toggleUserStatus(user._id, !user.isBlocked)
      .then(updatedUser => {
        setUsers(prev =>
          prev.map(u => u._id === user._id ? updatedUser : u)
        );
      })
      .catch(() => alert("Failed to update user status"));

  }


  return (
    <div className="admin-container">

      <div className="admin-header">

        <div className="header-top">

          <div className="header-left">

            <h1 className="admin-title">
              User Management
            </h1>

            <p className="admin-subtitle">
              Manage all registered users and their accounts
            </p>

          </div>

        </div>

        <div className="search-filter-bar">

          <div className="search-box-admin">

            <input
              type="text"
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-admin"
            />

          </div>

          <div className="stats-bar">

            <div className="stat-item-admin">
              <span className="stat-value">
                {users.filter((user) => user.role !== "admin").length}
              </span>
              <span className="stat-label">Total Users</span>
            </div>

            <div className="stat-item-admin">
              <span className="stat-value">{users.length}</span>
              <span className="stat-label">Showing</span>
            </div>

          </div>

        </div>

      </div>

      <div className="admin-content">

        {loading ? (

          <div className="loading-state">
            <p>Loading users...</p>
          </div>

        ) : error ? (

          <div className="error-state">
            <h3>{error}</h3>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>

        ) : users.length === 0 ? (

          <div className="empty-state">
            <h3>No users found</h3>
          </div>

        ) : (

          <div className="users-table-container">

            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user._id}>

                    <td>

                      <div className="user-cell">

                        <div className="user-avatar">
                          {user.username?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="user-info">
                          <span className="user-name">
                            {user.username || "Unknown"}
                          </span>
                          <span className="user-id">
                            ID: {user._id}
                          </span>
                        </div>

                      </div>

                    </td>

                    <td>
                      <span className="user-email">
                        {user.email || "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="role-badge">
                        {user.role || "Customer"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          user.isBlocked ? "blocked" : "active"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <Link
                          to={`/admin/users/${user._id}`}
                          className="action-btn view-btn"
                        >
                          View
                        </Link>

                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>

                        <button
                          className={`action-btn ${
                            user.isBlocked ? "activate-btn" : "block-btn"
                          }`}
                          onClick={() => handleToggleBlock(user)}
                        >
                          {user.isBlocked ? "Activate" : "Block"}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}