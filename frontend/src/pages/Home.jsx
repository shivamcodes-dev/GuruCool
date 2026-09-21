import { Link } from "react-router";
import {
  GraduationCap,
  Heart,
  MessageCircle,
  Target,
  BookOpen,
  Mic,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { mentors, focusAreas } from "../services/mockData";

const focusAreaIcons = {
  "Academic Tutoring": BookOpen,
  "Confidence Building": Heart,
  Communication: MessageCircle,
  Discipline: Target,
  "Habit Building": CheckCircle,
  "Speaking Skills": Mic,
  "Homework Support": BookOpen,
  "Concept-Based Learning": Sparkles,
  "Child Development Mentoring": TrendingUp,
};

const stats = [
  { label: "Verified Mentors", value: "500+", icon: Users },
  { label: "Focus Areas", value: "9", icon: Target },
  { label: "Happy Parents", value: "2,000+", icon: Heart },
  { label: "Avg. Improvement", value: "32%", icon: TrendingUp },
];

const steps = [
  {
    num: "01",
    title: "Tell us about your child",
    description:
      "Share your child's grade, subjects, and the areas where they need support — academic or personal development.",
  },
  {
    num: "02",
    title: "Get matched with mentors",
    description:
      "Browse verified mentors who specialize in both academics and child development. Compare profiles, ratings, and focus areas.",
  },
  {
    num: "03",
    title: "Start the journey",
    description:
      "Book a session, track progress, and watch your child grow — not just in grades, but in confidence, discipline, and communication.",
  },
];

export default function Home() {
  const featuredMentors = mentors.filter((m) => m.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-200 rounded-full blur-3xl" />
        </div>
        <div className="relative container-page py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" size="lg" className="mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              Beyond tutoring — mentorship for life
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-neutral-900 leading-tight animate-fade-in-up">
              Find the right mentor for your child's{" "}
              <span className="text-primary-600">academic</span> and{" "}
              <span className="text-secondary-600">personal</span> growth
            </h1>
            <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto animate-fade-in-up">
              GuruCool connects parents with verified mentors who don't just
              teach — they build confidence, discipline, communication, and
              habits that last a lifetime.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up">
              <Link to="/mentors">
                <Button variant="primary" size="lg" className="group">
                  Find a Mentor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Join as a Parent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-2xl font-bold font-display text-neutral-900">
                {stat.value}
              </p>
              <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="container-page py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            What we focus on
          </Badge>
          <h2 className="text-3xl font-bold font-display text-neutral-900">
            More than just grades
          </h2>
          <p className="mt-3 text-neutral-600">
            Our mentors specialize in nine core areas that shape a child's
            complete development.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusAreas.map((area, idx) => {
            const Icon = focusAreaIcons[area] || Sparkles;
            return (
              <Card key={area} hover className="animate-fade-in-up">
                <div
                  className="flex items-start gap-4"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm">
                      {area}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Specialized mentors to guide your child in this area.
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-900 py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge
              variant="primary"
              className="mb-3 bg-primary-600/20 text-primary-300"
            >
              How it works
            </Badge>
            <h2 className="text-3xl font-bold font-display text-white">
              Three simple steps to your child's growth
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-bold font-display text-primary-600/30 mb-3">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge variant="accent" className="mb-3">
              Top rated
            </Badge>
            <h2 className="text-3xl font-bold font-display text-neutral-900">
              Featured mentors
            </h2>
          </div>
          <Link to="/mentors" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="group">
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredMentors.map((mentor) => (
            <Link key={mentor.id} to={`/mentor/${mentor.id}`}>
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-neutral-900 truncate">
                        {mentor.name}
                      </h3>
                      {mentor.verified && (
                        <Shield className="w-4 h-4 text-success-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {mentor.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                      <span className="text-sm font-medium text-neutral-700">
                        {mentor.rating}
                      </span>
                      <span className="text-xs text-neutral-400">
                        ({mentor.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-600 line-clamp-2">
                  {mentor.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mentor.focusAreas.slice(0, 3).map((area) => (
                    <Badge key={area} variant="neutral" size="sm">
                      {area}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/mentors">
            <Button variant="outline" size="md">
              View all mentors
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-12 lg:px-12 lg:py-16 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-white">
              Ready to invest in your child's future?
            </h2>
            <p className="mt-3 text-primary-100 max-w-xl mx-auto">
              Join thousands of parents who've seen their children transform —
              not just in grades, but in confidence and character.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register">
                <Button variant="accent" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/mentors">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                >
                  Browse Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
