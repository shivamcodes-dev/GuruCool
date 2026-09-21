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
  Calendar,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useState } from "react";
import { mentors } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

export default function MentorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
          {/* Header card */}
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
                <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {mentor.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />{" "}
                    {mentor.languages.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold font-display text-neutral-900 mb-3">
              About
            </h2>
            <p className="text-neutral-600 leading-relaxed">{mentor.bio}</p>
          </Card>

          {/* Focus areas */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold font-display text-neutral-900 mb-3">
              Focus Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.focusAreas.map((area) => (
                <Badge key={area} variant="primary" size="lg">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Subjects */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold font-display text-neutral-900 mb-3">
              Subjects
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.subjects.map((subject) => (
                <Badge key={subject} variant="secondary" size="lg">
                  {subject}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-600" />
              Education
            </h2>
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
            </div>
          </Card>

          {/* Achievements */}
          <Card padding="lg">
            <h2 className="text-lg font-semibold font-display text-neutral-900 mb-4">
              Achievements
            </h2>
            <div className="space-y-3">
              {mentor.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-600">{achievement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - booking */}
        <div className="space-y-4">
          <Card padding="lg" className="sticky top-24">
            <div className="text-center pb-4 border-b border-neutral-100">
              <p className="text-3xl font-bold font-display text-neutral-900">
                {formatCurrency(mentor.hourlyRate)}
              </p>
              <p className="text-sm text-neutral-500">per session (1 hour)</p>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock className="w-4 h-4 text-neutral-400" />
                Available: {mentor.availability.join(", ")}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Languages className="w-4 h-4 text-neutral-400" />
                {mentor.languages.join(", ")}
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => setBookingOpen(true)}
            >
              <Calendar className="w-4 h-4" />
              Book a Session
            </Button>
            <Button variant="outline" fullWidth size="md" className="mt-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>

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
