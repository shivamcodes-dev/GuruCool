import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import Badge from "../components/Badge";

const parentNav = [
  { to: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentors", label: "Find Mentors", icon: Users },
  { to: "/parent/dashboard", label: "Sessions", icon: Calendar },
  { to: "/parent/dashboard", label: "Settings", icon: Settings },
];

const mentorNav = [
  { to: "/mentor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentor/dashboard", label: "My Students", icon: Users },
  { to: "/mentor/dashboard", label: "Sessions", icon: Calendar },
  { to: "/mentor/dashboard", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ role = "parent" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nav = role === "mentor" ? mentorNav : parentNav;

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside
        className={[
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-neutral-200",
          "flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display text-neutral-900">
              GuruCool
            </span>
          </Link>
          <button
            className="lg:hidden p-1 text-neutral-500 hover:bg-neutral-100 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
              ].join(" ")}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-neutral-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-neutral-200">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold font-display text-neutral-900 capitalize">
                {role === "mentor" ? "Mentor Portal" : "Parent Portal"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-700">
                    {role === "mentor" ? "AS" : "RS"}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-neutral-900">
                    {role === "mentor" ? "Dr. Ananya" : "Rohit Singh"}
                  </p>
                  <p className="text-xs text-neutral-500 capitalize">{role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
