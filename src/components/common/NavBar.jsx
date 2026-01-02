import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';

export default function NavBar() {
    const { user, logout } = React.useContext(AuthContext);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">
                        <span className="brand-icon">●</span>
                        <span className="brand-text">STORE</span>
                    </Link>
                </div>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        <span className="link-text">Home</span>
                        <span className="link-underline"></span>
                    </Link>

                    {!user && (
                        <>
                            <Link to="/login" className="nav-link">
                                <span className="link-text">Login</span>
                                <span className="link-underline"></span>
                            </Link>
                            <Link to="/register" className="nav-link nav-link-cta">
                                <span className="link-text">Register</span>
                                <span className="link-shine"></span>
                            </Link>
                        </>
                    )}

                    {user && (
                    <div className="user-section">
                        <span className="user-welcome">
                        Hey, <span className="user-name">{user.name}</span>
                        </span>
                        <button onClick={logout} className="logout-btn">
                        <span className="btn-text">Logout</span>
                        <span className="btn-icon">→</span>
                        </button>
                    </div>
                    )}

                </div>
            </div>
            
            <div className="navbar-glow"></div>
        </nav>
    );
}




{/* <Link to = '/cart'>Cart</Link> {" | "} */}