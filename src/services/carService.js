const API_URL = "http://localhost:3001"


export const getCars = async () => {
  const res = await fetch(`${API_URL}/cars`)
  return await res.json() 
}


export const addCar = async (car) => {
  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Date.now(),
      ...car
    })
  })
  return await res.json()
}

export const deleteCar = async (id) => {
    const res = await fetch(`http://localhost:3001/cars/${id}`, {
      method: "DELETE"
    })
  
    if (!res.ok) {
      throw new Error("Failed to delete car")
    }
  }

export const updateCar = async (id, car) => {
    const res = await fetch(`http://localhost:3001/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    })
  
    return await res.json()
  }
  
