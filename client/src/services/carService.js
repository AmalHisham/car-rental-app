const API_URL = "http://localhost:5000/api"

export const getCars = async (search = "", type = "ALL") => {
  const query = new URLSearchParams({
    search,
    type,
  });

  const res = await fetch(`${API_URL}/cars?${query}`);
  return await res.json();
};

export const getCarsByType = async (type) => {
  const res = await fetch(`${API_URL}/cars/type/${type}`)
  return await res.json()
}


export const addCar = async (car) => {

  const formData = new FormData()

  formData.append("model", car.model)
  formData.append("type", car.type)
  formData.append("pricePerDay", car.pricePerDay)
  formData.append("image", car.image)

  const token = localStorage.getItem("token")  

  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`  
    },
    body: formData
  })

  return await res.json()
}


export const deleteCar = async (id) => {

  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error("Failed to delete car")
  }
}

export const updateCar = async (id, car) => {

  const formData = new FormData()

  formData.append("model", car.model)
  formData.append("type", car.type)
  formData.append("pricePerDay", car.pricePerDay)

  if (car.image) {
    formData.append("image", car.image)
  }

  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  return await res.json()
}
