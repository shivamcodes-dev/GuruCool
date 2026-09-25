import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Target,
  Lightbulb,
  Sparkles,
  Users,
  BookOpen,
  Award,
  Smile,
  MessageCircle,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

const TOTAL_STEPS = 5;

const stepMeta = [
  {
    title: "Parent Information",
    subtitle: "Tell us about yourself",
    icon: User,
  },
  {
    title: "Child Information",
    subtitle: "Tell us about your child",
    icon: Heart,
  },
  {
    title: "Academic Goals",
    subtitle: "What should the mentor focus on academically?",
    icon: BookOpen,
  },
  {
    title: "Personal Development",
    subtitle: "Which areas should your child grow in?",
    icon: Sparkles,
  },
  {
    title: "Mentor Personality",
    subtitle: "What kind of mentor will your child connect with?",
    icon: Users,
  },
];

const academicGoals = [
  {
    value: "concept-clarity",
    label: "Concept Clarity",
    icon: Lightbulb,
    description: "Deep understanding of fundamentals",
  },
  {
    value: "homework-support",
    label: "Homework Support",
    icon: BookOpen,
    description: "Help with daily assignments",
  },
  {
    value: "exam-preparation",
    label: "Exam Preparation",
    icon: Award,
    description: "Targeted prep for tests and exams",
  },
  {
    value: "subject-improvement",
    label: "Subject Improvement",
    icon: Target,
    description: "Boost performance in specific subjects",
  },
];

const personalGoals = [
  {
    value: "confidence",
    label: "Confidence",
    icon: Heart,
    description: "Believe in their abilities",
  },
  {
    value: "communication",
    label: "Communication",
    icon: MessageCircle,
    description: "Express thoughts clearly",
  },
  {
    value: "discipline",
    label: "Discipline",
    icon: Shield,
    description: "Stay focused and consistent",
  },
  {
    value: "habits",
    label: "Habits",
    icon: Clock,
    description: "Build positive daily routines",
  },
  {
    value: "speaking",
    label: "Speaking",
    icon: Sparkles,
    description: "Public speaking and presentation",
  },
  {
    value: "social-skills",
    label: "Social Skills",
    icon: Users,
    description: "Interact well with others",
  },
];

const mentorPersonalities = [
  {
    value: "patient",
    label: "Patient",
    icon: Heart,
    description: "Takes time, never rushes",
  },
  {
    value: "friendly",
    label: "Friendly",
    icon: Smile,
    description: "Warm and approachable",
  },
  {
    value: "strict",
    label: "Strict",
    icon: Shield,
    description: "Disciplined and structured",
  },
  {
    value: "motivational",
    label: "Motivational",
    icon: Target,
    description: "Pushes your child to excel",
  },
  {
    value: "calm",
    label: "Calm",
    icon: Star,
    description: "Steady and reassuring",
  },
  {
    value: "concept-focused",
    label: "Concept-Focused",
    icon: Lightbulb,
    description: "Prioritizes deep understanding",
  },
];

const schoolTypes = [
  { value: "", label: "Select school type" },
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "ib", label: "IB" },
  { value: "state-board", label: "State Board" },
  { value: "igcse", label: "IGCSE" },
  { value: "other", label: "Other" },
];

const classOptions = [
  { value: "", label: "Select class" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: `class-${i + 1}`,
    label: `Class ${i + 1}`,
  })),
];

function OptionCard({ option, selected, onToggle, multi = true }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group",
        selected
          ? "border-primary-500 bg-primary-50"
          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
            selected
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200",
          ].join(" ")}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">
              {option.label}
            </p>
            {selected && (
              <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            {option.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        return (
          <div key={stepNum} className="flex items-center">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                isComplete
                  ? "bg-success-500 text-white"
                  : isCurrent
                    ? "bg-primary-600 text-white ring-4 ring-primary-100"
                    : "bg-neutral-200 text-neutral-500",
              ].join(" ")}
            >
              {isComplete ? <Check className="w-4 h-4" /> : stepNum}
            </div>
            {stepNum < TOTAL_STEPS && (
              <div
                className={[
                  "w-8 sm:w-12 h-0.5 transition-colors duration-300",
                  isComplete ? "bg-success-500" : "bg-neutral-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ParentOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState({
    parent: { name: "", email: "", phone: "", city: "" },
    child: { name: "", age: "", class: "", schoolType: "" },
    academicGoals: [],
    personalGoals: [],
    mentorPersonality: [],
  });

  const updateParent = (field, value) => {
    setData((d) => ({ ...d, parent: { ...d.parent, [field]: value } }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const updateChild = (field, value) => {
    setData((d) => ({ ...d, child: { ...d.child, [field]: value } }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleArrayItem = (field, value) => {
    setData((d) => {
      const arr = d[field];
      return {
        ...d,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!data.parent.name.trim()) errs.name = "Name is required";
      if (!data.parent.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.parent.email))
        errs.email = "Enter a valid email";
      if (!data.parent.phone.trim()) errs.phone = "Phone is required";
      if (!data.parent.city.trim()) errs.city = "City is required";
    } else if (s === 2) {
      if (!data.child.name.trim()) errs.childName = "Child name is required";
      if (!data.child.age) errs.age = "Age is required";
      else if (data.child.age < 4 || data.child.age > 18)
        errs.age = "Age must be between 4 and 18";
      if (!data.child.class) errs.class = "Class is required";
      if (!data.child.schoolType) errs.schoolType = "School type is required";
    } else if (s === 3) {
      if (data.academicGoals.length === 0)
        errs.academicGoals = "Select at least one academic goal";
    } else if (s === 4) {
      if (data.personalGoals.length === 0)
        errs.personalGoals = "Select at least one development goal";
    } else if (s === 5) {
      if (data.mentorPersonality.length === 0)
        errs.mentorPersonality = "Select at least one personality trait";
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    const errs = validateStep(TOTAL_STEPS);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/parent/dashboard");
    }, 1000);
  };

  const meta = stepMeta[step - 1];
  const StepIcon = meta.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-neutral-900">
              Guru<span className="text-primary-600">Cool</span>
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Step <span className="font-semibold text-neutral-900">{step}</span>{" "}
            of {TOTAL_STEPS}
          </p>
        </div>
      </header>

      <div className="container-page py-8 lg:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <StepIndicator currentStep={step} />

          {/* Step header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <StepIcon className="w-7 h-7 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold font-display text-neutral-900">
              {meta.title}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">{meta.subtitle}</p>
          </div>

          {/* Step content */}
          <div
            className="bg-white rounded-2xl border border-neutral-200 p-6 lg:p-8 animate-fade-in"
            key={step}
          >
            {/* ── Step 1: Parent info ── */}
            {step === 1 && (
              <div className="space-y-4">
                <Input
                  label="Full name"
                  placeholder="Your name"
                  icon={User}
                  value={data.parent.name}
                  onChange={(e) => updateParent("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  icon={Mail}
                  value={data.parent.email}
                  onChange={(e) => updateParent("email", e.target.value)}
                  error={errors.email}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    icon={Phone}
                    value={data.parent.phone}
                    onChange={(e) => updateParent("phone", e.target.value)}
                    error={errors.phone}
                  />
                  <Input
                    label="City"
                    placeholder="Mumbai"
                    icon={MapPin}
                    value={data.parent.city}
                    onChange={(e) => updateParent("city", e.target.value)}
                    error={errors.city}
                  />
                </div>
              </div>
            )}

            {/* ── Step 2: Child info ── */}
            {step === 2 && (
              <div className="space-y-4">
                <Input
                  label="Child's name"
                  placeholder="Your child's name"
                  icon={Heart}
                  value={data.child.name}
                  onChange={(e) => updateChild("name", e.target.value)}
                  error={errors.childName}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Age"
                    type="number"
                    min="4"
                    max="18"
                    placeholder="e.g. 12"
                    value={data.child.age}
                    onChange={(e) => updateChild("age", e.target.value)}
                    error={errors.age}
                  />
                  <Select
                    label="Class"
                    options={classOptions}
                    value={data.child.class}
                    onChange={(e) => updateChild("class", e.target.value)}
                    error={errors.class}
                  />
                </div>
                <Select
                  label="School type"
                  options={schoolTypes}
                  value={data.child.schoolType}
                  onChange={(e) => updateChild("schoolType", e.target.value)}
                  error={errors.schoolType}
                />
              </div>
            )}

            {/* ── Step 3: Academic goals ── */}
            {step === 3 && (
              <div>
                <p className="text-sm text-neutral-500 mb-4">
                  Select all that apply. You can change these later.
                </p>
                {errors.academicGoals && (
                  <p className="text-xs text-error-600 mb-3">
                    {errors.academicGoals}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {academicGoals.map((goal) => (
                    <OptionCard
                      key={goal.value}
                      option={goal}
                      selected={data.academicGoals.includes(goal.value)}
                      onToggle={() =>
                        toggleArrayItem("academicGoals", goal.value)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 4: Personal development ── */}
            {step === 4 && (
              <div>
                <p className="text-sm text-neutral-500 mb-4">
                  Which areas should your child grow in beyond academics?
                </p>
                {errors.personalGoals && (
                  <p className="text-xs text-error-600 mb-3">
                    {errors.personalGoals}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personalGoals.map((goal) => (
                    <OptionCard
                      key={goal.value}
                      option={goal}
                      selected={data.personalGoals.includes(goal.value)}
                      onToggle={() =>
                        toggleArrayItem("personalGoals", goal.value)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 5: Mentor personality ── */}
            {step === 5 && (
              <div>
                <p className="text-sm text-neutral-500 mb-4">
                  Choose the traits you'd like in your child's mentor. We'll
                  match accordingly.
                </p>
                {errors.mentorPersonality && (
                  <p className="text-xs text-error-600 mb-3">
                    {errors.mentorPersonality}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentorPersonalities.map((trait) => (
                    <OptionCard
                      key={trait.value}
                      option={trait}
                      selected={data.mentorPersonality.includes(trait.value)}
                      onToggle={() =>
                        toggleArrayItem("mentorPersonality", trait.value)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 1 ? (
                <Button variant="ghost" size="md" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < TOTAL_STEPS ? (
                <Button variant="primary" size="md" onClick={handleNext}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Complete Onboarding
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Summary preview (steps 3+) */}
          {step >= 3 && (
            <div className="mt-6 bg-primary-50/50 border border-primary-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-2">
                Your selections so far
              </p>
              <div className="flex flex-wrap gap-2">
                {data.academicGoals.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-primary-200 text-primary-700"
                  >
                    {academicGoals.find((o) => o.value === g)?.label}
                  </span>
                ))}
                {data.personalGoals.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-secondary-200 text-secondary-700"
                  >
                    {personalGoals.find((o) => o.value === g)?.label}
                  </span>
                ))}
                {data.mentorPersonality.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-accent-200 text-accent-700"
                  >
                    {mentorPersonalities.find((o) => o.value === g)?.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
