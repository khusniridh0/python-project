import { useState } from "react";
import { auth } from "../../services/request";
import { getAuth, is_admin, is_employee, is_manager } from "../../utils/main";
import { Link } from "react-router-dom";

const initialState = { username: '', password: '' }
export default function Login() {
    const [form, setForm] = useState(initialState)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        auth(form).then(res => {
            const { access } = res
            if (access) {
                localStorage.setItem('access', access)

                if (getAuth('is_admin')) {window.location.href = '/manager'}
                if (getAuth('is_manager')) {window.location.href = '/employee'}
                if (getAuth('is_employee')) {window.location.href = '/dashboard'}
            }
        })
    }

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <Link to="/" className="logo d-flex align-items-center w-auto">
                                        <img src="https://khusniridh0.github.io/creator/assets/img/logo.png" alt="Logo" />
                                        <span className="d-none d-lg-block">CompanyApp</span>
                                    </Link>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your username &amp; password to login</p>
                                        </div>
                                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">Username</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input type="text" name="username" className="form-control" id="yourUsername" onChange={handleChange} required />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                                <input type="password" name="password" className="form-control" id="yourPassword" onChange={handleChange} required />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="credits">
                                    Modify by <a href="https://khusniridh0.github.io/creator/">Khusni Ridho & Syalomiele Pratama</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>

    )
}
