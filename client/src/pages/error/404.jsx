import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <h1>404</h1>
                <h2>Halaman yang Anda cari tidak ada.</h2>
                <Link className="btn" to="/">Kembali</Link>
                <img src="assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found" />
                <div className="credits">
                    Modify by <a href="https://bootstrapmade.com/">Khusni Ridho</a>
                </div>
            </section>
        </div>

    )
}





