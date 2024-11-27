import { Link, useLocation } from "react-router-dom"
import { is_admin, is_employee, is_manager } from "../utils/main";

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname

    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-heading">application</li>
                {is_employee &&
                    <li className="nav-item">
                        <Link className={`nav-link ${currentPath != '/dashboard' && 'collapsed'}`} to="/dashboard">
                            <i className="bi bi-grid" />
                            <span>Absen</span>
                        </Link>
                    </li>
                }
                {is_admin &&
                    <li className="nav-item">
                        <Link className={`nav-link ${currentPath != '/manager' && 'collapsed'}`} to="/manager">
                            <i className="bi bi-person" />
                            <span>Manajer</span>
                        </Link>
                    </li>
                }
                {is_manager || is_admin ?
                    <li className="nav-item">
                        <Link className={`nav-link ${currentPath != '/employee' && 'collapsed'}`} to="/employee">
                            <i className="bi bi-people" />
                            <span>Karyawan</span>
                        </Link>
                    </li>
                    : ''}
                <li className="nav-heading">security</li>
                <li className="nav-item">
                    <button className="nav-link collapsed w-100" onClick={logout}>
                        <i className="bi bi-box-arrow-left" />
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar