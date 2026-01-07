import React from "react"
import { getCars, deleteCar, updateCar } from "../../services/carService"

export default function AdminCars() {
  const [cars, setCars] = React.useState([])
  const [editingCarId, setEditingCarId] = React.useState(null)
  const [formData, setFormData] = React.useState({
    model: "",
    type: "",
    pricePerDay: "",
    image: ""
  })

  React.useEffect(() => {
    getCars().then(data => {
      setCars(Array.isArray(data) ? data : [])
    })
  }, [])

  function handleDelete(id) {
    if (!window.confirm("Delete this car?")) return

    deleteCar(id).then(() => {
      setCars(prev => prev.filter(c => c.id !== id))
    })
  }

  function handleEdit(car) {
    setEditingCarId(car.id)
    setFormData({
      model: car.model,
      type: car.type,
      pricePerDay: car.pricePerDay,
      image: car.image
    })
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleUpdate(id) {
    const updatedCar = { id, ...formData }

    const savedCar = await updateCar(id, updatedCar)

    setCars(prev =>
      prev.map(car => (car.id === id ? savedCar : car))
    )

    setEditingCarId(null)
  }

  return (
    <>
      <h2>Cars</h2>

      {cars.length === 0 && <p>No cars found</p>}

      {cars.map(car => (
        <div
          key={car.id}
          style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}
        >
          {editingCarId === car.id ? (
            <>
              <input
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Model"
              />
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
              />
              <input
                name="pricePerDay"
                type="number"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Price per day"
              />
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
              />

              <button onClick={() => handleUpdate(car.id)}>Save</button>
              <button onClick={() => setEditingCarId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <img src={car.image} alt={car.model} width="120" />
              <p><b>{car.model}</b> ({car.type})</p>
              <p>₹{car.pricePerDay} / day</p>

              <button onClick={() => handleEdit(car)}>Edit</button>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  )
}

