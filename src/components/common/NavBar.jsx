import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <nav>
            <Link to = '/'>Cars</Link> {" | "}
            <Link to = '/cart'>Cart</Link> {" | "}
            <Link to = '/login'>login</Link> 
        </nav>
        
    )
}