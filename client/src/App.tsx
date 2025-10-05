import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignupScreen from "./pages/signupScreen";
import LoginScreen from "./pages/loginScreen";
import HomePage from "./pages/homeScreen";
import AdminDashboard from "./pages/adminScreens/adminScreen";
import NotFoundPage from "./pages/NotFoundPage";
import PrimScreen from "./pages/primScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/events";
import NewEvent from "./pages/adminScreens/newEvent";
import EditEvent from "./pages/adminScreens/editEvent";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(["token"]);
  const { isAuthenticated } = useAuth();
  return (cookies.token || isAuthenticated) ? <>{children}</> : <Navigate to="/loginScreen" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrimScreen />} />
          <Route path="/loginScreen" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/newEvent" element={
            <ProtectedRoute>
              <NewEvent />
            </ProtectedRoute>
          } />
          <Route path="/editEvent" element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          } />
          

          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
