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
import Jobs from './Pages/Jobs';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Register from './Pages/Register';
import ResumeUpload from './Pages/ResumeUpload';
import FilteredResumes from './Pages/FilteredResumes';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { verifyUser } from './Redux/auth.service';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let userToken = localStorage.getItem('userToken')
  let auth = useSelector(state => state.auth)
  const verify = async () => {
    userToken = localStorage.getItem('userToken')
    if(userToken)
    await dispatch(verifyUser({}));
    // if(auth.error) navigate('/login')
  }
  useEffect(() => {
    // setTimeout(verify, 50);
    verify();
  }, [])
  userToken = localStorage.getItem('userToken')
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
                <Route path="/upload" element={<ResumeUpload />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/job/:jobid" element={<FilteredResumes />} />
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
