import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/parent/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
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
              Welcome back to your child's growth journey
            </h2>
            <p className="mt-4 text-primary-100 max-w-md">
              Track progress, manage sessions, and watch your child grow —
              academically and personally.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Real-time progress tracking across 9 focus areas",
                "Book and manage sessions with verified mentors",
                "Monthly reports on academic and personal development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-primary-100"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-primary-200">
            &copy; 2026 GuruCool. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50">
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
              <Badge variant="primary" className="mb-3">
                Sign in
              </Badge>
              <h1 className="text-2xl font-bold font-display text-neutral-900">
                Welcome back
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Sign in to manage your child's mentorship journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Sign in
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-neutral-400">or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate("/parent/dashboard")}
              >
                Parent Login
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate("/mentor/dashboard")}
              >
                Mentor Login
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
