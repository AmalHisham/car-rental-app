const API_URL = "http://localhost:3001";

/* REGISTER USER */
export async function registerUser(name, email, password) {
  // normalize email
  const normalizedEmail = email.trim().toLowerCase();

  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();

  const exists = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (exists) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(),
    name,
    email: normalizedEmail,
    password,
    role : "user",
    isBlocked: false 
  };

  const saveRes = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  if (!saveRes.ok) {
    throw new Error("Registration failed");
  }

  return newUser;
}

/* LOGIN USER */
export async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();

  const foundUser = users.find(
    (u) =>
      u.email.toLowerCase() === normalizedEmail &&
      u.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid credentials");
  }

  return foundUser;
}
