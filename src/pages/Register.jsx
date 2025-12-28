import React from "react"
import AuthContext from "../context/AuthContext"
import "./Register.css"

export default function Register() {

  const { register } = React.useContext(AuthContext)

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault()   // ✅ FIXED
    register(email, password)
    alert("Registered Successfully")
  }

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
