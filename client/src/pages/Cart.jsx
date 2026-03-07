import React from "react"
import CartContext from "../context/CartContext"


export default function Cart() {

    const {cartItems, removeFromCart} = React.useContext(CartContext)
    return (
        
        <div>

            <h1>Cart</h1>

            {cartItems.length === 0 && <h2>Cart is Empty</h2>}

            {cartItems.map((item,index) => (
                <div key={index}>
                    <p>{item.model}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}