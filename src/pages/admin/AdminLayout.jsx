import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div>
            <aside>
                <Link to='products'>Cars</Link>
                <Link to='users'>Users</Link>
            </aside>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}