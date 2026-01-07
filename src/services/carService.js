const API_URL = "http://localhost:3001"

/* GET ALL CARS */
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
  await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE"
  })
}

export const updateCar = async (id, car) => {
    const res = await fetch(`http://localhost:3001/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    })
  
    return await res.json()
  }
  
