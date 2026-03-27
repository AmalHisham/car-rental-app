const API_URL = "http://localhost:5000/api/auth"

/* REGISTER USER */
export async function registerUser(username, email, password) {

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Registration failed")
  }

  return data
}



/* LOGIN USER */
export async function loginUser(email, password) {

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Invalid credentials")
  }

  return data
}