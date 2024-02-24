import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import LoginNew from './Pages/LoginNew';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';
import ResumeUpload from './Pages/ResumeUpload';
import FilteredResumes from './Pages/FilteredResumes';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { verifyUser } from './Redux/auth.service';


const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken')
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(verifyUser({}))
  //   }
  // }, [])
  return userToken ? <Outlet /> : <Navigate to="/login" replace />
}

function ProtectedLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<ResumeUpload />} />
                <Route path="/job" element={<FilteredResumes />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
