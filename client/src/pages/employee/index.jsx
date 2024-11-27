import { useEffect, useRef, useState } from "react"
import { addSalary, addUser, deleteUser, getSalary, getUser, updateUser } from "../../services/request"
import Dashboard from "./../../layouts/dashboard"
import Swal from "sweetalert2"
import { is_admin, is_manager, removeToken } from "../../utils/main"
import { Link } from "react-router-dom"

const initialState = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    is_admin: false,
    is_employee: true,
    is_manager: false,
    salary: 0,
    description: '',
    user: 0
}

export default function Home() {
    const cancelRef = useRef()
    const formRef = useRef()
    const [user, setUser] = useState([])
    const [salary, setSalary] = useState([])
    const [data, setData] = useState([])
    const [form, setForm] = useState(initialState)

    const getData = () => {
        getUser().then(res => {
            setUser(res.filter(user => user.is_employee))
        })

        getSalary().then(res => {
            setSalary(res)
        })
    }

    useEffect(() => {
        const combined = user.map(user => ({ ...salary.find(salary => salary.user == user.id), ...user}))
        console.log(combined)
        setData(combined)
    }, [user, salary])

    const onEdit = (id) => {
        const formData = data.find(data => data.id == id)
        formData.user = id
        setForm(formData)
    }

    const onDelete = (id) => {
        Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: "Data tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id).then((res) => {
                    getData()
                    Swal.fire(
                        'Terhapus!',
                        'Data berhasil dihapus.',
                        'success'
                    )
                })
            }
        })
    }

    const onCancel = () => {
        setForm(initialState)
        formRef.current.reset()
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.id > 0) {
            await updateUser(form).then(res => {
                cancelRef.current.click()
                getData()
            })
            
            await addSalary(form).then(res => {
                cancelRef.current.click()
                getData()
            })
        } else {
            await addUser(form).then(res => {
                cancelRef.current.click()
                getData()
            })
        }

    }

    useEffect(() => {
        if (!is_manager && !is_admin) {
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
                    <h1>Pengelolaan Karyawan</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item active">Karyawan</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-12 my-4">
                            <button className="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#formManager">Tambah Karyawan</button>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Data Karyawan</h5>
                                    <table className="table datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nama Lengkap</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Gaji</th>
                                                <th scope="col">Deskripsi</th>
                                                <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.first_name} {item.last_name}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.salary}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <a className="nav-link nav-profile d-flex align-items-center pe-0 show" href="#" data-bs-toggle="dropdown" aria-expanded="true">
                                                            <span className="d-none d-md-block dropdown-toggle ps-2"><i className="bi bi-three-dots-vertical"></i></span>
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                                            <li>
                                                                <button className="dropdown-item d-flex align-items-center" onClick={() => onEdit(item.id)} data-bs-toggle="modal" data-bs-target="#formManager">Edit</button>
                                                                <button className="dropdown-item d-flex align-items-center text-danger" onClick={() => onDelete(item.id)}>Delete</button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal fade" id="formManager" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="formManagerLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="formManagerLabel">Form Karyawan</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={handleSubmit} ref={formRef}>
                                    <div className="mb-3">
                                        <label htmlFor="first_name" className="form-label">First Name</label>
                                        <input type="text" className="form-control" name="first_name" id="first_name" value={form.first_name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="last_name" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" name="last_name" id="last_name" value={form.last_name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" value={form.email} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" name="username" id="username" value={form.username} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="********" onChange={handleChange} />
                                    </div>
                                    {form.id && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="salary" className="form-label">Upah Kerja / jam</label>
                                                <input type="number" className="form-control" name="salary" id="salary" value={form.salary} onChange={handleChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Deskripsi</label>
                                                <textarea className="form-control" name="description" id="description" value={form.description} onChange={handleChange}></textarea>
                                            </div>
                                        </>
                                    )}
                                    <div className="d-flex gap-4">
                                        <button type="button" className="w-50 btn btn-secondary" data-bs-dismiss="modal" onClick={onCancel} ref={cancelRef}>Batal</button>
                                        <button type="submit" className="w-50 btn btn-primary">Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Dashboard>
    )
}
