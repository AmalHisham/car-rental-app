import React from "react";

const CartContext = React.createContext()

export function CartProvider({children}) {

    const [cartItems, setCartItems] = React.useState([])

    function addToCart(car) {
        setCartItems((prev) => [...prev, car])
    }

    function removeFromCart(id) {
        setCartItems((prev) => prev.filter((item) => item.id != id))
    }
 
    return (
        <CartContext.Provider 
        value={{cartItems,addToCart,removeFromCart}}
        >
        
        {children}
        </CartContext.Provider>
        


    )
} 

export default CartContext