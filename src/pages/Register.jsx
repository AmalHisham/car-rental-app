import React from "react"
import AuthContext from "../context/AuthContext"

export default function Register() {

    const {register} = React.useContext(AuthContext)

    const [email,setEmail] = React.useState("")
    const [password ,setPassword] = React.useState("")

    function handleSubmit(e) {
        e.preventDefault
        register(email,password)
        alert("Registered Successfully")
    }

    return (

        <>  
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
        </>
    )
}