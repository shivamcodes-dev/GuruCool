import { BrowserRouter, Routes, Route } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Mentors from "./pages/Mentors";
import MentorDetail from "./pages/MentorDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParentDashboard from "./pages/ParentDashboard";
import MentorDashboard from "./pages/MentorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentor" element={<Mentors />} />
          <Route path="/mentor/:id" element={<MentorDetail />} />
        </Route>

        {/* Dashboard pages */}
        <Route element={<DashboardLayout role="parent" />}>
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
        </Route>
        <Route element={<DashboardLayout role="mentor" />}>
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
