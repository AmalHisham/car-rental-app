const API_URL = 'http://localhost:3001'

export async function deleteUser(userId) {

    const res = await fetch(`${API_URL}/users/${userId}`, {
    method : "DELETE"
    })

    if(!res.ok) {
        throw new Error("Failed to delete user")
    }

    return true
}

export async function toggleUserStatus(userId, isBlocked) {
    const res = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBlocked }),
    })
  
    return res.json()
  }
  