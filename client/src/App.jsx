import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Switch is replaced by Routes
import { lazy, Suspense } from 'react'

const Loading = lazy(() => import('./pages/error/loading'))
const NotFound = lazy(() => import('./pages/error/404'))
const Login = lazy(() => import('./pages/login'))
const Home = lazy(() => import('./pages/home'))
const Manager = lazy(() => import('./pages/manager'))
const Employee = lazy(() => import('./pages/employee'))

function App() {
  return (
    <>
      <Loading/>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App