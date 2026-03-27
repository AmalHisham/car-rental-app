const API_URL = "http://localhost:5000/api/bookings";

/* CREATE BOOKING */
export async function createBooking(booking) {
  const token = localStorage.getItem("token")

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(booking)
  })

  return res.json()
}


/* USER BOOKINGS */
export async function getUserBookings() {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}


/* ADMIN - ALL BOOKINGS */
export async function getAllBookings() {
  const token = localStorage.getItem("token")

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}


/* ADMIN - BOOKINGS OF A PARTICULAR USER */
export async function getBookingsByUser(userId) {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/admin/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json()
}

export const cancelBooking = async (id) => {
  const res = await fetch(`http://localhost:5000/api/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  return res.json()
}