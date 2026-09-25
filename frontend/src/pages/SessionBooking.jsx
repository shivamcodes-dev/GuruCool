import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Calendar,
  Clock,
  Shield,
  Star,
  BookOpen,
  MessageCircle,
  Heart,
  Sparkles,
  Target,
  Lightbulb,
  Award,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  User,
  DollarSign,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { mentors } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

const TOTAL_STEPS = 6;

const stepMeta = [
  {
    title: "Select Mentor",
    subtitle: "Choose who you want to book with",
    icon: User,
  },
  {
    title: "Session Type",
    subtitle: "What does your child need help with?",
    icon: BookOpen,
  },
  {
    title: "Select Date",
    subtitle: "Pick a day that works for you",
    icon: Calendar,
  },
  { title: "Select Time", subtitle: "Choose a time slot", icon: Clock },
  {
    title: "Review Booking",
    subtitle: "Confirm the details before booking",
    icon: CheckCircle2,
  },
  { title: "Confirmed", subtitle: "Your session is booked!", icon: Check },
];

const sessionTypes = [
  {
    value: "academic",
    label: "Academic",
    icon: BookOpen,
    description: "Subject-specific tutoring and exam prep",
  },
  {
    value: "homework",
    label: "Homework Help",
    icon: BookOpen,
    description: "Guidance through daily assignments",
  },
  {
    value: "communication",
    label: "Communication",
    icon: MessageCircle,
    description: "Improve expression and articulation",
  },
  {
    value: "confidence",
    label: "Confidence Building",
    icon: Heart,
    description: "Build self-belief and self-esteem",
  },
  {
    value: "speaking",
    label: "Speaking Skills",
    icon: Sparkles,
    description: "Public speaking and presentation",
  },
  {
    value: "habit",
    label: "Habit Coaching",
    icon: Target,
    description: "Build positive daily routines",
  },
  {
    value: "concept",
    label: "Concept Clarification",
    icon: Lightbulb,
    description: "Deep-dive into fundamental concepts",
  },
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return {
    value: d.toISOString().split("T")[0],
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
});

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-8">
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
                  "w-6 sm:w-10 h-0.5 transition-colors duration-300",
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

function MentorPicker({ selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {mentors.slice(0, 6).map((m) => {
        const selected = selectedId === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={[
              "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
              selected
                ? "border-primary-500 bg-primary-50"
                : "border-neutral-200 hover:border-neutral-300",
            ].join(" ")}
          >
            <img
              src={m.avatar}
              alt={m.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {m.name}
                </p>
                {m.verified && (
                  <Shield className="w-3.5 h-3.5 text-success-500" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-0.5 text-xs text-neutral-500">
                  <Star className="w-3 h-3 fill-accent-400 text-accent-400" />
                  {m.rating}
                </span>
                <span className="text-xs text-neutral-500">
                  {formatCurrency(m.hourlyRate)}/hr
                </span>
              </div>
            </div>
            {selected && (
              <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function SessionBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMentorId = searchParams.get("mentor") || "";

  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    mentorId: initialMentorId,
    sessionType: "",
    date: "",
    time: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const mentor = mentors.find((m) => m.id === booking.mentorId);
  const selectedSessionType = sessionTypes.find(
    (t) => t.value === booking.sessionType,
  );
  const selectedDate = nextSevenDays.find((d) => d.value === booking.date);

  const canProceed = () => {
    if (step === 1) return !!booking.mentorId;
    if (step === 2) return !!booking.sessionType;
    if (step === 3) return !!booking.date;
    if (step === 4) return !!booking.time;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      if (step === 5) {
        setConfirmed(true);
        setStep(6);
      } else {
        setStep((s) => s + 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setStep(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const meta = stepMeta[step - 1];
  const StepIcon = meta.icon;

  // Confirmation page
  if (step === 6 && confirmed) {
    return (
      <div className="container-page py-8 max-w-2xl">
        <Card padding="lg" className="text-center">
          <div className="w-20 h-20 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success-500" />
          </div>
          <h1 className="text-2xl font-bold font-display text-neutral-900">
            Session Booked!
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Your session with {mentor?.name} has been confirmed. A confirmation
            has been sent to your email.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Mentor</span>
              <span className="text-sm font-medium text-neutral-900">
                {mentor?.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Session Type</span>
              <span className="text-sm font-medium text-neutral-900">
                {selectedSessionType?.label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Date</span>
              <span className="text-sm font-medium text-neutral-900">
                {selectedDate?.day}, {selectedDate?.month} {selectedDate?.date}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Time</span>
              <span className="text-sm font-medium text-neutral-900">
                {booking.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Duration</span>
              <span className="text-sm font-medium text-neutral-900">
                1 hour
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
              <span className="text-sm font-semibold text-neutral-700">
                Total
              </span>
              <span className="text-lg font-bold font-display text-neutral-900">
                {mentor ? formatCurrency(mentor.hourlyRate) : ""}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 justify-center">
            <Link to="/parent/dashboard">
              <Button variant="primary" size="md">
                Go to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="md" onClick={() => navigate(-1)}>
              Book Another Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-page py-8 max-w-2xl">
      <Link
        to="/mentors"
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

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

      <Card padding="lg" key={step}>
        {/* Step 1: Select mentor */}
        {step === 1 && (
          <MentorPicker
            selectedId={booking.mentorId}
            onSelect={(id) => setBooking({ ...booking, mentorId: id })}
          />
        )}

        {/* Step 2: Session type */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sessionTypes.map((type) => {
              const Icon = type.icon;
              const selected = booking.sessionType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() =>
                    setBooking({ ...booking, sessionType: type.value })
                  }
                  className={[
                    "flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left",
                    selected
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-neutral-300",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      selected
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-500",
                    ].join(" ")}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-neutral-900">
                        {type.label}
                      </p>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {type.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 3: Select date */}
        {step === 3 && (
          <div>
            <p className="text-sm text-neutral-500 mb-4">
              {mentor
                ? `Available days for ${mentor.name}: ${mentor.availability.join(", ")}`
                : "Select a date below."}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {nextSevenDays.map((d) => {
                const selected = booking.date === d.value;
                const isAvailable =
                  !mentor || mentor.availability.includes(d.day);
                return (
                  <button
                    key={d.value}
                    onClick={() =>
                      isAvailable && setBooking({ ...booking, date: d.value })
                    }
                    disabled={!isAvailable}
                    className={[
                      "p-3 rounded-xl border-2 transition-all text-center",
                      selected
                        ? "border-primary-500 bg-primary-50"
                        : isAvailable
                          ? "border-neutral-200 hover:border-neutral-300"
                          : "border-neutral-100 opacity-40 cursor-not-allowed",
                    ].join(" ")}
                  >
                    <p className="text-xs text-neutral-500">{d.day}</p>
                    <p className="text-lg font-bold font-display text-neutral-900 mt-1">
                      {d.date}
                    </p>
                    <p className="text-xs text-neutral-500">{d.month}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Select time */}
        {step === 4 && (
          <div>
            <p className="text-sm text-neutral-500 mb-4">
              {selectedDate
                ? `Available times for ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}`
                : "Select a time slot below."}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((time) => {
                const selected = booking.time === time;
                return (
                  <button
                    key={time}
                    onClick={() => setBooking({ ...booking, time })}
                    className={[
                      "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      selected
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                    ].join(" ")}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <img
                src={mentor?.avatar}
                alt={mentor?.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-neutral-900">
                    {mentor?.name}
                  </p>
                  {mentor?.verified && (
                    <Shield className="w-4 h-4 text-success-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-0.5 text-xs text-neutral-500">
                    <Star className="w-3 h-3 fill-accent-400 text-accent-400" />
                    {mentor?.rating}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {mentor?.experience}y exp
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-neutral-500 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-neutral-400" />
                  Session Type
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  {selectedSessionType?.label}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-neutral-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  Date
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  {selectedDate?.day}, {selectedDate?.month}{" "}
                  {selectedDate?.date}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-neutral-500 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  Time
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  {booking.time}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-neutral-500 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  Duration
                </span>
                <span className="text-sm font-medium text-neutral-900">
                  1 hour
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-100">
                <span className="text-sm text-neutral-500 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-neutral-400" />
                  Price
                </span>
                <span className="text-sm font-bold text-neutral-900">
                  {mentor ? formatCurrency(mentor.hourlyRate) : ""}
                </span>
              </div>
            </div>

            {/* Cancellation policy */}
            <div className="p-4 rounded-xl bg-warning-50 border border-warning-100">
              <p className="text-sm font-semibold text-warning-800 flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4" />
                Cancellation Policy
              </p>
              <p className="text-xs text-warning-700 leading-relaxed">
                You can cancel or reschedule this session up to 4 hours before
                the scheduled start time at no charge. Cancellations within 4
                hours of the session will be charged at 50% of the session fee.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 6 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button variant="ghost" size="md" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            {step < 5 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : step === 5 ? (
              <Button variant="primary" size="md" onClick={handleConfirm}>
                <Check className="w-4 h-4" />
                Confirm Booking
              </Button>
            ) : null}
          </div>
        )}
      </Card>
    </div>
  );
}
