import React from "react"
import { getCars, deleteCar } from "../../services/carService"

export default function AdminCars() {
  const [cars, setCars] = React.useState([])   // ✅ array

  React.useEffect(() => {
    getCars()
      .then(data => {
        console.log("Cars API response:", data) // DEBUG
        setCars(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error("Failed to load cars", err)
        setCars([])
      })
  }, [])

  function handleDelete(id) {
    if (!window.confirm("Delete this car?")) return

    deleteCar(id).then(() => {
      setCars(prev => prev.filter(c => c.id !== id))
    })
  }

  return (
    <>
      <h2>Cars</h2>

      {cars.length === 0 && <p>No cars found</p>}

      {cars.map(car => (
        <div key={car.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
          <img src={car.image} alt={car.model} width="120" />
          <p><b>{car.model}</b> ({car.type})</p>
          <p>₹{car.pricePerDay} / day</p>
          <button onClick={() => handleDelete(car.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}
