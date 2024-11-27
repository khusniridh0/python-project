import { useEffect } from "react"
import { getAuth, on, select } from "../utils/main"
import { Link } from "react-router-dom"

const Loading = () => {
    
    useEffect(() => {
        on('click', '.toggle-sidebar-btn', () => {
            select('body').classList.toggle('toggle-sidebar')
        })
    }, [])

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center">
                    <img src="https://khusniridh0.github.io/creator/assets/img/logo.png" alt="Logo" />
                    <span className="d-none d-lg-block">CompanyApp</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" />
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle" href="#">
                            <i className="bi bi-search" />
                        </a>
                    </li>

                    <li className="nav-item dropdown pe-3">
                        <div className="nav-link nav-profile d-flex align-items-center pe-0">
                            {/* <img src="img/profile-img.jpg" alt="Profile" className="rounded-circle" /> */}
                            <span className="d-none d-md-block ps-2">{getAuth('name')}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Loading