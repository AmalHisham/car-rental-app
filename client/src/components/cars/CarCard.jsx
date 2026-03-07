import React from "react"
import CartContext from "../../context/CartContext"


export default function CarCard({car}) {
    const {addToCart}  = React.useContext(CartContext)
    return (
        <div>
            <img src={car.image}
             alt= {car.model}
             style = {{width : "250px", height : "160px", objectFit : "cover"}}
             />
            <h2>{car.model}</h2>
            <p>{car.type}</p>
            <p>{car.pricePerDay}</p>
            <button onClick={() => addToCart(car)}>Add to cart</button>
        </div>
    )
}