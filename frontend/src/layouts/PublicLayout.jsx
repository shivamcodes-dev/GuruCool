import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { GraduationCap, Menu, X, Search } from "lucide-react";
import Button from "../components/Button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/mentors", label: "Find Mentors" },
  { to: "/mentor", label: "For Mentors" },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-neutral-900">
                Guru<span className="text-primary-600">Cool</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={[
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.to
                      ? "text-primary-700 bg-primary-50"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white animate-fade-in">
            <div className="container-page py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.to
                      ? "text-primary-700 bg-primary-50"
                      : "text-neutral-600 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-neutral-900 text-neutral-300">
        <div className="container-page py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold font-display text-white">
                  GuruCool
                </span>
              </div>
              <p className="text-sm text-neutral-400 max-w-md">
                Helping parents find the right tutor and mentor for their
                child's academic and personal development needs.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/mentors"
                    className="hover:text-white transition-colors"
                  >
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mentor"
                    className="hover:text-white transition-colors"
                  >
                    For Mentors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Focus Areas
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Academic Tutoring</li>
                <li>Confidence Building</li>
                <li>Communication Skills</li>
                <li>Habit Building</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-neutral-800 text-sm text-neutral-500">
            <p>&copy; 2026 GuruCool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
