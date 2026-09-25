import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  Star,
  Shield,
  MapPin,
  Languages,
  Clock,
  Award,
  GraduationCap,
  CheckCircle,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  MessageSquare,
  Heart,
  Brain,
  BookOpen,
  Target,
  Lightbulb,
  Sparkles,
  Users,
  Smile,
  Wifi,
  Building2,
  Monitor,
  Quote,
  BadgeCheck,
  Briefcase,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import ProgressBar from "../components/ProgressBar";
import Rating from "../components/Rating";
import { mentors, personalityOptions } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

const sessionModeLabels = {
  online: { label: "Online only", icon: Wifi },
  "in-person": { label: "In-person only", icon: Building2 },
  both: { label: "Online & In-person", icon: Monitor },
};

const mockReviews = [
  {
    name: "Rohit Singh",
    role: "Parent of Aarav (Class 8)",
    rating: 5,
    date: "2 weeks ago",
    text: "My son went from struggling with math to actually enjoying it. The concept-based approach made all the difference. Highly recommend!",
  },
  {
    name: "Meera Patel",
    role: "Parent of Ira (Class 7)",
    rating: 5,
    date: "1 month ago",
    text: "Excellent mentor. Very patient and really understands how to connect with children. Ira looks forward to every session.",
  },
  {
    name: "Anil Joshi",
    role: "Parent of Kabir (Class 9)",
    rating: 4.5,
    date: "2 months ago",
    text: "Great communication skills and really helped Kabir build confidence. We saw improvement in his school participation within weeks.",
  },
];

const teachingStyles = [
  {
    icon: Lightbulb,
    title: "Concept-First Approach",
    description:
      "Builds deep understanding before practice, ensuring foundations are solid.",
  },
  {
    icon: Target,
    title: "Personalized Pacing",
    description:
      "Adapts speed and difficulty to each child's comfort and progress level.",
  },
  {
    icon: Heart,
    title: "Encouragement-Driven",
    description:
      "Focuses on positive reinforcement to build motivation and self-belief.",
  },
];

const skillLevels = [
  { skill: "Mathematics", value: 95 },
  { skill: "Concept-Based Learning", value: 92 },
  { skill: "Homework Support", value: 88 },
  { skill: "Confidence Building", value: 85 },
  { skill: "Communication", value: 80 },
  { skill: "Habit Building", value: 78 },
];

export default function MentorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [saved, setSaved] = useState(false);

  const mentor = mentors.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          Mentor not found
        </h1>
        <p className="text-neutral-500 mt-2">
          This mentor profile doesn't exist.
        </p>
        <Link to="/mentors">
          <Button variant="primary" className="mt-4">
            Back to mentors
          </Button>
        </Link>
      </div>
    );
  }

  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];
  const modeInfo =
    sessionModeLabels[mentor.sessionMode] || sessionModeLabels.online;
  const ModeIcon = modeInfo.icon;

  const tabs = [
    {
      label: "Overview",
      content: (
        <div className="space-y-6">
          {/* Introduction */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-2">
              Introduction
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          {/* Teaching philosophy */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary-600" />
              Teaching Philosophy
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {mentor.bio} I believe that every child learns differently, and
              the role of a mentor is not just to teach but to unlock the
              curiosity and confidence that already exists within each student.
              Learning should feel like discovery, not obligation.
            </p>
          </div>

          {/* Teaching style */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary-600" />
              Teaching Style
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {teachingStyles.map((style) => {
                const Icon = style.icon;
                return (
                  <div
                    key={style.title}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {style.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {style.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Expertise",
      content: (
        <div className="space-y-6">
          {/* Academic expertise */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-600" />
              Academic Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {mentor.subjects.map((subject) => (
                <Badge key={subject} variant="primary" size="lg">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Personality-development expertise */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-secondary-600" />
              Personality Development Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {mentor.focusAreas.map((area) => (
                <Badge key={area} variant="secondary" size="lg">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills with bars */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary-600" />
              Skills
            </h3>
            <div className="space-y-3">
              {skillLevels.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-600">
                      {skill.skill}
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      {skill.value}%
                    </span>
                  </div>
                  <ProgressBar
                    value={skill.value}
                    size="sm"
                    animated={false}
                    color={skill.value >= 90 ? "success" : "primary"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Experience & Certifications",
      content: (
        <div className="space-y-6">
          {/* Experience */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary-600" />
              Experience
            </h3>
            <div className="space-y-4">
              {mentor.education.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {edu.institution} &middot; {edu.year}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-success-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">
                    {mentor.experience} years of mentoring experience
                  </p>
                  <p className="text-sm text-neutral-500">
                    {mentor.reviews} sessions completed with verified reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-base font-semibold font-display text-neutral-900 mb-3 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-primary-600" />
              Certifications
            </h3>
            <div className="space-y-2">
              {mentor.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 border border-neutral-100"
                >
                  <BadgeCheck className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-600">{achievement}</p>
                </div>
              ))}
              {mentor.psychologyTraining && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-success-50 border border-success-100">
                  <Brain className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Certified in Child Psychology
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Trained in child development and behavioral mentoring
                      methodologies.
                    </p>
                  </div>
                </div>
              )}
              {mentor.specialNeedsExperience && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 border border-accent-100">
                  <Heart className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Special Learning Needs Training
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Experienced in adapting teaching methods for diverse
                      learning needs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Reviews",
      count: mockReviews.length,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-primary-700">
                {mentor.rating}
              </p>
              <Rating value={mentor.rating} size="sm" />
              <p className="text-xs text-neutral-500 mt-1">
                {mentor.reviews} reviews
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 w-3">{star}</span>
                  <Star className="w-3 h-3 fill-accent-400 text-accent-400" />
                  <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-400 rounded-full"
                      style={{
                        width: `${star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 2}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {mockReviews.map((review, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-neutral-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-neutral-500">{review.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Rating value={review.rating} size="sm" />
                  <p className="text-xs text-neutral-400 mt-1">{review.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <Quote className="w-4 h-4 text-neutral-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container-page py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile header */}
          <Card padding="lg">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold font-display text-neutral-900">
                    {mentor.name}
                  </h1>
                  {mentor.verified && (
                    <Badge variant="success" size="sm">
                      <Shield className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                  {mentor.featured && (
                    <Badge variant="accent" size="sm">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500 mt-1">{mentor.title}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                    <span className="font-semibold text-neutral-900">
                      {mentor.rating}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ({mentor.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    {mentor.experience} years experience
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {mentor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />{" "}
                    {mentor.languages.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <ModeIcon className="w-4 h-4" /> {modeInfo.label}
                  </span>
                </div>
                {/* Personality badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {mentor.personality.map((trait) => {
                    const label =
                      personalityOptions.find((p) => p.value === trait)
                        ?.label || trait;
                    return (
                      <Badge key={trait} variant="neutral" size="sm">
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Verified qualifications badges */}
          {(mentor.verified ||
            mentor.psychologyTraining ||
            mentor.specialNeedsExperience) && (
            <div className="flex flex-wrap gap-2">
              {mentor.verified && (
                <Badge variant="success" size="md">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Identity Verified
                </Badge>
              )}
              {mentor.psychologyTraining && (
                <Badge variant="success" size="md">
                  <Brain className="w-3.5 h-3.5" />
                  Psychology Certified
                </Badge>
              )}
              {mentor.specialNeedsExperience && (
                <Badge variant="accent" size="md">
                  <Heart className="w-3.5 h-3.5" />
                  Special Needs Trained
                </Badge>
              )}
            </div>
          )}

          {/* Tabbed content */}
          <Card padding="lg">
            <Tabs tabs={tabs} />
          </Card>
        </div>

        {/* Sidebar - booking + availability + pricing */}
        <div className="space-y-4">
          {/* Pricing */}
          <Card padding="lg" className="sticky top-24">
            <div className="text-center pb-4 border-b border-neutral-100">
              <p className="text-3xl font-bold font-display text-neutral-900">
                {formatCurrency(mentor.hourlyRate)}
              </p>
              <p className="text-sm text-neutral-500">per session (1 hour)</p>
            </div>

            {/* Availability */}
            <div className="py-4">
              <h4 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" />
                Availability
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {mentor.availability.map((day) => (
                  <span
                    key={day}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-success-50 text-success-700"
                  >
                    {day}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm text-neutral-600">
                <ModeIcon className="w-4 h-4 text-neutral-400" />
                {modeInfo.label}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-neutral-600">
                <Languages className="w-4 h-4 text-neutral-400" />
                {mentor.languages.join(", ")}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => setBookingOpen(true)}
              >
                <Calendar className="w-4 h-4" />
                Book a Session
              </Button>
              <Button
                variant={saved ? "primary" : "outline"}
                fullWidth
                size="md"
                onClick={() => setSaved((s) => !s)}
              >
                <Heart
                  className={["w-4 h-4", saved ? "fill-white" : ""].join(" ")}
                />
                {saved ? "Saved" : "Save Mentor"}
              </Button>
              <Button variant="ghost" fullWidth size="md">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </Button>
            </div>

            <p className="text-xs text-neutral-400 text-center mt-4">
              No payment required to request a session
            </p>
          </Card>
        </div>
      </div>

      {/* Booking modal */}
      <Modal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Book a session"
        description={`With ${mentor.name} — ${formatCurrency(mentor.hourlyRate)}/hour`}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setBookingOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!selectedDay || !selectedTime}
              onClick={() => {
                setBookingOpen(false);
                setSelectedDay(null);
                setSelectedTime(null);
              }}
            >
              Confirm Booking
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">
              Select a day
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentor.availability.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={[
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    selectedDay === day
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                  ].join(" ")}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="animate-fade-in">
              <h4 className="text-sm font-semibold text-neutral-700 mb-2">
                Select a time
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={[
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedTime === time
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                    ].join(" ")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDay && selectedTime && (
            <div className="bg-primary-50 rounded-lg p-4 animate-fade-in">
              <p className="text-sm text-neutral-700">
                <span className="font-semibold">{selectedDay}</span> at{" "}
                <span className="font-semibold">{selectedTime}</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                A confirmation will be sent to your registered email.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
