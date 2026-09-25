import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Shield,
  Star,
  Heart,
  Target,
  Lightbulb,
  BookOpen,
  MessageCircle,
  Clock,
  Sparkles,
  Users,
  Check,
  X,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Zap,
  Award,
  Brain,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Rating from "../components/Rating";
import { mentors, personalityOptions } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

const childRequirements = {
  primaryGoals: ["Confidence Building", "Communication"],
  preferredPersonality: ["Patient", "Motivational"],
  requiredSkills: ["Speaking Skills", "Homework Support"],
  academicGoals: ["Concept Clarity"],
  sessionMode: "both",
};

const goalIcons = {
  "Confidence Building": Heart,
  Communication: MessageCircle,
  "Speaking Skills": Sparkles,
  "Homework Support": BookOpen,
  "Concept Clarity": Lightbulb,
  "Habit Building": Target,
  Discipline: Award,
  "Concept-Based Learning": Lightbulb,
};

const personalityIcons = {
  patient: Heart,
  friendly: Sparkles,
  strict: Target,
  motivational: Award,
  calm: Brain,
  "concept-focused": BookOpen,
};

function calcMatchScore(mentor) {
  let score = 0;
  let matched = [];
  let missing = [];

  // Primary goals — 35 points each
  childRequirements.primaryGoals.forEach((goal) => {
    if (mentor.focusAreas.includes(goal)) {
      score += 35;
      matched.push({
        label: goal,
        type: "goal",
        reason: `Specializes in ${goal.toLowerCase()}`,
      });
    } else {
      missing.push({
        label: goal,
        type: "goal",
        reason: `Does not list ${goal.toLowerCase()} as a focus area`,
      });
    }
  });

  // Personality — 15 points each
  childRequirements.preferredPersonality.forEach((trait) => {
    const traitValue = trait.toLowerCase().replace(/\s+/g, "-");
    if (mentor.personality.includes(traitValue)) {
      score += 15;
      matched.push({
        label: trait,
        type: "personality",
        reason: `Described as ${trait.toLowerCase()}`,
      });
    } else {
      missing.push({
        label: trait,
        type: "personality",
        reason: `Not described as ${trait.toLowerCase()}`,
      });
    }
  });

  // Required skills — 25 points each
  childRequirements.requiredSkills.forEach((skill) => {
    if (mentor.focusAreas.includes(skill)) {
      score += 25;
      matched.push({
        label: skill,
        type: "skill",
        reason: `Experienced in ${skill.toLowerCase()}`,
      });
    } else {
      missing.push({
        label: skill,
        type: "skill",
        reason: `No direct experience listed in ${skill.toLowerCase()}`,
      });
    }
  });

  // Academic goals — 10 points
  childRequirements.academicGoals.forEach((goal) => {
    const goalMap = {
      "Concept Clarity": "Concept-Based Learning",
      "Homework Support": "Homework Support",
      "Exam Preparation": "Exam Preparation",
      "Subject Improvement": "Subject Improvement",
    };
    const mappedGoal = goalMap[goal] || goal;
    if (
      mentor.focusAreas.includes(mappedGoal) ||
      mentor.subjects.some((s) => s.includes(goal.split(" ")[0]))
    ) {
      score += 10;
      matched.push({
        label: goal,
        type: "academic",
        reason: `Covers ${goal.toLowerCase()}`,
      });
    } else {
      missing.push({
        label: goal,
        type: "academic",
        reason: `Limited coverage of ${goal.toLowerCase()}`,
      });
    }
  });

  // Session mode — 5 points
  if (
    mentor.sessionMode === childRequirements.sessionMode ||
    mentor.sessionMode === "both"
  ) {
    score += 5;
    matched.push({
      label: "Session mode",
      type: "mode",
      reason: "Available in your preferred session format",
    });
  } else {
    missing.push({
      label: "Session mode",
      type: "mode",
      reason: `Only offers ${mentor.sessionMode} sessions`,
    });
  }

  // Bonus: psychology training
  if (mentor.psychologyTraining) {
    score += 5;
    matched.push({
      label: "Psychology training",
      type: "bonus",
      reason: "Certified in child psychology",
    });
  }

  // Cap at 100
  score = Math.min(score, 100);

  return { score, matched, missing };
}

function getMatchLabel(score) {
  if (score >= 85)
    return {
      label: "Excellent Match",
      variant: "success",
      color: "text-success-600",
      bg: "bg-success-50",
    };
  if (score >= 70)
    return {
      label: "Strong Match",
      variant: "primary",
      color: "text-primary-600",
      bg: "bg-primary-50",
    };
  if (score >= 55)
    return {
      label: "Good Match",
      variant: "accent",
      color: "text-accent-600",
      bg: "bg-accent-50",
    };
  return {
    label: "Partial Match",
    variant: "warning",
    color: "text-warning-600",
    bg: "bg-warning-50",
  };
}

function MatchCard({ mentor, match, rank }) {
  const matchLabel = getMatchLabel(match.score);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      padding="lg"
      className="animate-fade-in-up"
      style={{ animationDelay: `${rank * 80}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Rank + score circle */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-lg font-bold font-display text-neutral-700">
              #{rank}
            </span>
          </div>
        </div>

        {/* Mentor info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-neutral-900">
                    {mentor.name}
                  </h3>
                  {mentor.verified && (
                    <Shield className="w-4 h-4 text-success-500" />
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {mentor.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Rating
                    value={mentor.rating}
                    count={mentor.reviews}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Match score */}
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="4"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke={
                        match.score >= 85
                          ? "#10b981"
                          : match.score >= 70
                            ? "#4f46e5"
                            : match.score >= 55
                              ? "#f59e0b"
                              : "#f59e0b"
                      }
                      strokeWidth="4"
                      strokeDasharray={`${(match.score / 100) * 150.8} 150.8`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold font-display text-neutral-900">
                      {match.score}%
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant={matchLabel.variant} size="sm" className="mt-1">
                {matchLabel.label}
              </Badge>
            </div>
          </div>

          {/* Why this mentor matches */}
          <div
            className={`mt-4 p-3 rounded-xl ${matchLabel.bg} border border-neutral-100`}
          >
            <p className="text-sm text-neutral-700">
              <span className={`font-semibold ${matchLabel.color}`}>
                {match.score >= 85
                  ? "Excellent match"
                  : match.score >= 70
                    ? "Strong match"
                    : "Good match"}
              </span>{" "}
              because this mentor{" "}
              {match.matched
                .slice(0, 2)
                .map((m) => m.reason)
                .join(", and ")}
              .
            </p>
          </div>

          {/* Matching strengths */}
          <div className="mt-3">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-success-500" />
              Matching Strengths
            </p>
            <div className="flex flex-wrap gap-1.5">
              {match.matched.map((item, idx) => {
                const Icon =
                  goalIcons[item.label] ||
                  personalityIcons[
                    item.label?.toLowerCase().replace(/\s+/g, "-")
                  ] ||
                  Check;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-50 text-success-700 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Missing preferences (expandable) */}
          {match.missing.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center gap-1 hover:text-neutral-700 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-warning-500" />
                Missing Preferences ({match.missing.length})
                <ChevronRight
                  className={[
                    "w-3 h-3 transition-transform",
                    expanded ? "rotate-90" : "",
                  ].join(" ")}
                />
              </button>
              {expanded && (
                <div className="mt-2 space-y-1.5 animate-fade-in">
                  {match.missing.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-neutral-500"
                    >
                      <X className="w-3.5 h-3.5 text-warning-400 flex-shrink-0 mt-0.5" />
                      <span>{item.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer: price + actions */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold font-display text-neutral-900">
                {formatCurrency(mentor.hourlyRate)}
              </span>
              <span className="text-xs text-neutral-500">/hour</span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                {mentor.experience}y exp
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/mentor/${mentor.id}`}>
                <Button variant="ghost" size="sm">
                  View Profile
                </Button>
              </Link>
              <Link to={`/mentor/${mentor.id}`}>
                <Button variant="primary" size="sm">
                  Book a Session
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function MentorMatching() {
  const [filterThreshold, setFilterThreshold] = useState(0);

  const matches = useMemo(() => {
    return mentors
      .map((mentor) => ({ mentor, match: calcMatchScore(mentor) }))
      .filter((m) => m.match.score >= filterThreshold)
      .sort((a, b) => b.match.score - a.match.score);
  }, [filterThreshold]);

  const thresholds = [
    { value: 0, label: "All matches" },
    { value: 55, label: "Good+" },
    { value: 70, label: "Strong+" },
    { value: 85, label: "Excellent only" },
  ];

  return (
    <div className="container-page py-8">
      {/* Back */}
      <Link
        to="/parent/dashboard"
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold font-display text-neutral-900">
            Mentor Matching
          </h1>
        </div>
        <p className="text-sm text-neutral-500">
          We've ranked mentors based on your child's profile. Match scores are
          calculated from your selected goals, preferred personality, and
          required skills.
        </p>
      </div>

      {/* Child requirements summary */}
      <Card
        padding="lg"
        className="mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100"
      >
        <h2 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Your Child's Requirements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary goals */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Primary Goals
            </p>
            <div className="flex flex-wrap gap-1.5">
              {childRequirements.primaryGoals.map((goal) => {
                const Icon = goalIcons[goal] || Target;
                return (
                  <span
                    key={goal}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3" />
                    {goal}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Preferred personality */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Preferred Personality
            </p>
            <div className="flex flex-wrap gap-1.5">
              {childRequirements.preferredPersonality.map((trait) => {
                const Icon =
                  personalityIcons[trait.toLowerCase().replace(/\s+/g, "-")] ||
                  Heart;
                return (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-700 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3" />
                    {trait}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Required skills */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Required Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {childRequirements.requiredSkills.map((skill) => {
                const Icon = goalIcons[skill] || BookOpen;
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3" />
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Academic goals + session mode */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
              Academic Goals
            </p>
            <div className="flex flex-wrap gap-1.5">
              {childRequirements.academicGoals.map((goal) => {
                const Icon = goalIcons[goal] || BookOpen;
                return (
                  <span
                    key={goal}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-100 text-success-700 text-xs font-medium"
                  >
                    <Icon className="w-3 h-3" />
                    {goal}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Session:{" "}
              <span className="font-medium text-neutral-700 capitalize">
                {childRequirements.sessionMode}
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* Threshold filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-sm text-neutral-500 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          Show:
        </span>
        {thresholds.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilterThreshold(t.value)}
            className={[
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              filterThreshold === t.value
                ? "bg-primary-600 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
        <span className="text-sm text-neutral-400 ml-2">
          ({matches.length} mentor{matches.length !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Match results */}
      {matches.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-neutral-500">
            No mentors meet this threshold. Try lowering the filter.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((m, idx) => (
            <MatchCard
              key={m.mentor.id}
              mentor={m.mentor}
              match={m.match}
              rank={idx + 1}
            />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-neutral-400 text-center mt-6 max-w-2xl mx-auto">
        Match scores are calculated using a weighted scoring algorithm based on
        your child's profile. They are recommendations, not guarantees of fit.
        We encourage you to review each mentor's full profile before booking.
      </p>
    </div>
  );
}
