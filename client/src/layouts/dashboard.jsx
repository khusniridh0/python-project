import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { is_admin, is_manager, is_employee } from './../utils/main'
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Footer from "../components/footer";

const Dashboard = ({ children }) => {
    const navigate = useNavigate()
    const [view, setView] = useState('')

    useEffect(() => {
        if (is_admin || is_manager || is_employee) {
            setView(
                <>
                    <Sidebar />
                    <Navbar />
                    {children}
                    <Footer />
                </>
            )
        } else {
            navigate('/')
        }
    }, [children])

    return view
}

export default Dashboard