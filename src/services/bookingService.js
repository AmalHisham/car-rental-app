const API_URL = "http://localhost:3001";

export async function createBooking(booking) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  return res.json();
}

export async function getUserBookings(userId) {
  const res = await fetch(`${API_URL}/bookings?userId=${userId}`);
  return res.json();
}
