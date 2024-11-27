import { useEffect, useState } from "react"
import { getAuth, is_admin, is_employee, is_manager, removeToken } from "../../utils/main"
import Dashboard from "./../../layouts/dashboard"
import { addAbsen, getAbsen, getSalary } from "../../services/request"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"

const initState = {
    checkin: '',
    checkout: '',
    user: getAuth('user_id')
}

export default function Home() {
    const navigate = useNavigate()
    const [form, setForm] = useState(initState)
    const [temp, setTemp] = useState(initState)
    const [absen, setAbsen] = useState('')
    const [salary, setSalary] = useState('')
    const [saldo, setSaldo] = useState("")

    const getData = () => {
        getAbsen(form).then((res) => {
            setAbsen(res.filter(item => item.user == getAuth('user_id')))
        })
        getSalary().then((res) => {
            setSalary(res.find(item => item.user == getAuth('user_id')))
        })
    }

    const handleChange = (e) => {
        setTemp({
            ...temp,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const checkinDate = new Date(form.checkin)
        const checkoutDate = new Date(form.checkout)

        if (checkoutDate <= checkinDate) {
            Swal.fire({
                icon: 'info',
                title: 'Maaf...',
                text: 'Jam Keluar harus lebih dari Jam Masuk',
            })
        } else {
            addAbsen(form).then((res) => {
                getData()
            })
        }
    }

    const calculate = (absenList) => {
        let totalMilliseconds = 0

        absenList.map(absen => {
            if (absen.checkin && absen.checkout) {

                const checkinDate = new Date(absen.checkin)
                const checkoutDate = new Date(absen.checkout)
                const timeDifference = checkoutDate - checkinDate
                totalMilliseconds += timeDifference
            }
        })

        return Math.floor(totalMilliseconds / (1000 * 60 * 60))
    }

    useEffect(() => {
        setForm(
            {
                ...form,
                user: getAuth('user_id'),
                checkin: `${temp.date}T${temp.checkin}:00Z`,
                checkout: `${temp.date}T${temp.checkout}:00Z`
            }
        )
    }, [temp])

    useEffect(() => {
        if (absen.length) {
            const amount = salary ? salary.salary : 0
            setSaldo(calculate(absen) * amount)
        }
    }, [absen, salary])

    useEffect(() => {
        if (!is_employee) {
            removeToken()
            window.location.href = '/'
            return false
        }
        getData()
    }, [])

    return (
        <Dashboard>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Absen Karyawan</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active">Home</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card info-card revenue-card">
                                <div className="card-body">
                                    <h5 className="card-title">Upah Kerja <span>| Hari ini</span></h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i className="bi bi-currency-dollar"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6>{new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            }).format(saldo)}</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card rounded-4 pt-3">
                                <div className="card-body">
                                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="date" className="form-label">Tanggal</label>
                                            <div className="input-group has-validation">
                                                <input type="date" name="date" className="form-control" id="date" onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="checkin" className="form-label">Waktu Masuk</label>
                                            <input type="time" name="checkin" className="form-control" id="checkin" onChange={handleChange} required />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="checkout" className="form-label">Waktu Keluar</label>
                                            <input type="time" name="checkout" className="form-control" id="checkout" onChange={handleChange} required />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">Absen</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}
