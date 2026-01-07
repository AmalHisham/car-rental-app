import React from "react"
import { addCar } from "../../services/carService"

export default function AddCar({ onCarAdded }) {
  const [car, setCar] = React.useState({
    model: "",
    type: "",
    pricePerDay: "",
    image: ""
  })

  function handleChange(e) {
    setCar({ ...car, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newCar = await addCar(car)
    onCarAdded(newCar)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="model" placeholder="Model" onChange={handleChange} required />
      <input name="type" placeholder="Type" onChange={handleChange} required />
      <input name="pricePerDay" type="number" placeholder="Price per day" onChange={handleChange} required />
      <input name="image" placeholder="Image URL" onChange={handleChange} required />
      <button>Add Car</button>
    </form>
  )
}
