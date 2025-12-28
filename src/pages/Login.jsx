import React from "react"
import AuthContext from "../context/AuthContext"
import {useLocation, useNavigate} from "react-router-dom"

import "./Login.css"

export default function Login() {

    const {login} = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
 
    const [error,setError] = React.useState("")

    const location = useLocation()
    const from = location.state?.from?.pathname || "/"


    function handleSubmit(e) {
        e.preventDefault()
        const success = login(email, password)

        if(success) {
            navigate(from, {replace : true})
        } else {
            setError("Invalid email or password")
        }
    }



    return (
        <div className="login-container">
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

                <button type="submit">Login</button>
            </form>

            {error && <p className="error">{error}</p>}
       </div>
    )
}