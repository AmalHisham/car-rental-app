import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

export default function NavBar() {

    const {user,logout} = React.useContext(AuthContext)
    return (
        <nav>
            <Link to = '/'>Cars</Link> {" | "}
            <Link to = '/cart'>Cart</Link> {" | "}

            {!user && (
            <>
                <Link to = '/login'>Login</Link> {" | "}
                <Link to = '/register'>Register</Link>
            </>
            )}

            {user && (
                <button onClick={logout}>Logout</button>
            )}
        </nav>
        
    )
}