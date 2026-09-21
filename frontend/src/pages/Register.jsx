import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Mail,
  Lock,
  User,
  Phone,
  GraduationCap,
  ArrowRight,
  Check,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("parent");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === "mentor" ? "/mentor/dashboard" : "/parent/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="lg:hidden flex items-center gap-2 mb-8 justify-center"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-neutral-900">
              GuruCool
            </span>
          </Link>

          <Card padding="lg" className="animate-fade-in-up">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-3">
                Create account
              </Badge>
              <h1 className="text-2xl font-bold font-display text-neutral-900">
                Join GuruCool
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Start your child's growth journey today.
              </p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setRole("parent")}
                className={[
                  "p-3 rounded-xl border-2 text-center transition-all",
                  role === "parent"
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 hover:border-neutral-300",
                ].join(" ")}
              >
                <User className="w-5 h-5 mx-auto mb-1 text-primary-600" />
                <p className="text-sm font-semibold text-neutral-900">
                  I'm a Parent
                </p>
              </button>
              <button
                type="button"
                onClick={() => setRole("mentor")}
                className={[
                  "p-3 rounded-xl border-2 text-center transition-all",
                  role === "mentor"
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 hover:border-neutral-300",
                ].join(" ")}
              >
                <GraduationCap className="w-5 h-5 mx-auto mb-1 text-primary-600" />
                <p className="text-sm font-semibold text-neutral-900">
                  I'm a Mentor
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                name="name"
                label="Full name"
                placeholder={role === "parent" ? "Your name" : "Your name"}
                icon={User}
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                id="email"
                name="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                id="phone"
                name="phone"
                label="Phone number"
                type="tel"
                placeholder="+91 98765 43210"
                icon={Phone}
                value={form.phone}
                onChange={handleChange}
                hint="Optional"
              />
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Create a password"
                icon={Lock}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Re-enter your password"
                icon={Lock}
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <label className="flex items-start gap-2 text-sm text-neutral-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span>
                  I agree to the{" "}
                  <span className="text-primary-600 font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary-600 font-medium">
                    Privacy Policy
                  </span>
                </span>
              </label>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Create account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>

      {/* Right panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-900 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display">GuruCool</span>
          </Link>
          <div>
            <h2 className="text-3xl font-bold font-display leading-tight">
              Where children don't just learn — they thrive
            </h2>
            <p className="mt-4 text-secondary-100 max-w-md">
              Join a community of parents and mentors committed to developing
              the whole child — academically, emotionally, and socially.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Verified mentors with child development expertise",
                "Track progress across 9 development areas",
                "Personalized mentor matching for your child",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-secondary-100"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-secondary-200">
            &copy; 2026 GuruCool. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
