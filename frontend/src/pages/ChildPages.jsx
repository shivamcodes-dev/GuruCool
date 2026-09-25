import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Edit3,
  Check,
  X,
  Heart,
  Target,
  Lightbulb,
  BookOpen,
  Award,
  MessageCircle,
  Shield,
  Clock,
  Sparkles,
  Users,
  Smile,
  Star,
  TrendingUp,
  User,
  Calendar,
  GraduationCap,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Avatar from "../components/Avatar";
import ProgressBar from "../components/ProgressBar";
import { parentDashboardData } from "../services/mockData";

const academicGoalOptions = [
  { value: "concept-clarity", label: "Concept Clarity", icon: Lightbulb },
  { value: "homework-support", label: "Homework Support", icon: BookOpen },
  { value: "exam-preparation", label: "Exam Preparation", icon: Award },
  { value: "subject-improvement", label: "Subject Improvement", icon: Target },
];

const personalGoalOptions = [
  { value: "confidence", label: "Confidence", icon: Heart },
  { value: "communication", label: "Communication", icon: MessageCircle },
  { value: "discipline", label: "Discipline", icon: Shield },
  { value: "habits", label: "Habits", icon: Clock },
  { value: "speaking", label: "Speaking Skills", icon: Sparkles },
  { value: "social-skills", label: "Social Skills", icon: Users },
];

const mentorPersonalityOptions = [
  { value: "patient", label: "Patient", icon: Heart },
  { value: "friendly", label: "Friendly", icon: Smile },
  { value: "strict", label: "Strict", icon: Shield },
  { value: "motivational", label: "Motivational", icon: Target },
  { value: "calm", label: "Calm", icon: Star },
  { value: "concept-focused", label: "Concept-Focused", icon: Lightbulb },
];

const learningStyleOptions = [
  { value: "visual", label: "Visual — learns through diagrams and charts" },
  {
    value: "auditory",
    label: "Auditory — learns through discussion and listening",
  },
  {
    value: "kinesthetic",
    label: "Kinesthetic — learns through hands-on activities",
  },
  {
    value: "reading",
    label: "Reading/Writing — learns through text and notes",
  },
];

const sessionFormatOptions = [
  { value: "online", label: "Online sessions" },
  { value: "in-person", label: "In-person sessions" },
  { value: "both", label: "Both online and in-person" },
];

const goalPriority = [
  { value: "primary", label: "Primary goal", color: "primary" },
  { value: "high", label: "High priority", color: "accent" },
  { value: "improvement", label: "Needs improvement", color: "warning" },
  { value: "maintain", label: "Maintaining well", color: "success" },
];

const priorityStyles = {
  primary: {
    badge: "primary",
    dot: "bg-primary-500",
    text: "text-primary-700",
    bar: "bg-primary-500",
  },
  high: {
    badge: "accent",
    dot: "bg-accent-500",
    text: "text-accent-700",
    bar: "bg-accent-500",
  },
  improvement: {
    badge: "warning",
    dot: "bg-warning-500",
    text: "text-warning-700",
    bar: "bg-warning-500",
  },
  maintain: {
    badge: "success",
    dot: "bg-success-500",
    text: "text-success-700",
    bar: "bg-success-500",
  },
};

const classOptions = [
  { value: "", label: "Select class" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: `class-${i + 1}`,
    label: `Class ${i + 1}`,
  })),
];

const schoolTypeOptions = [
  { value: "", label: "Select school type" },
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "ib", label: "IB" },
  { value: "state-board", label: "State Board" },
  { value: "igcse", label: "IGCSE" },
  { value: "other", label: "Other" },
];

function GoalCard({ goal, onCyclePriority }) {
  const Icon = goal.icon;
  const style = priorityStyles[goal.priority] || priorityStyles.primary;
  const priorityLabel =
    goalPriority.find((p) => p.value === goal.priority)?.label || goal.priority;

  return (
    <button
      type="button"
      onClick={onCyclePriority}
      className="w-full text-left p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
            <Icon className="w-5 h-5 text-neutral-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {goal.label}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{goal.category}</p>
          </div>
        </div>
        <Badge variant={style.badge} size="sm" dot>
          {priorityLabel}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <ProgressBar
            value={goal.progress}
            size="sm"
            color={
              goal.priority === "maintain"
                ? "success"
                : goal.priority === "improvement"
                  ? "warning"
                  : goal.priority === "high"
                    ? "accent"
                    : "primary"
            }
            animated={false}
          />
        </div>
        <span className="text-xs font-medium text-neutral-500">
          {goal.progress}%
        </span>
      </div>
      <p className="text-xs text-neutral-400 mt-2">Tap to change priority</p>
    </button>
  );
}

function PreferenceChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3.5 py-2 rounded-lg text-sm font-medium border-2 transition-all",
        selected
          ? "border-primary-500 bg-primary-50 text-primary-700"
          : "border-neutral-200 text-neutral-600 hover:border-neutral-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function ChildProfile() {
  const childData = parentDashboardData.children[0];

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: childData.name,
    age: "13",
    class: "class-8",
    schoolType: "cbse",
    learningStyle: "visual",
    sessionFormat: "online",
    academicGoals: [
      {
        label: "Concept Clarity",
        icon: Lightbulb,
        category: "Academic",
        priority: "primary",
        progress: 78,
      },
      {
        label: "Homework Support",
        icon: BookOpen,
        category: "Academic",
        priority: "high",
        progress: 65,
      },
      {
        label: "Exam Preparation",
        icon: Award,
        category: "Academic",
        priority: "high",
        progress: 72,
      },
      {
        label: "Subject Improvement",
        icon: Target,
        category: "Academic",
        priority: "improvement",
        progress: 45,
      },
    ],
    personalGoals: [
      {
        label: "Confidence",
        icon: Heart,
        category: "Personal",
        priority: "improvement",
        progress: 65,
      },
      {
        label: "Communication",
        icon: MessageCircle,
        category: "Personal",
        priority: "primary",
        progress: 70,
      },
      {
        label: "Discipline",
        icon: Shield,
        category: "Personal",
        priority: "maintain",
        progress: 82,
      },
      {
        label: "Speaking Skills",
        icon: Sparkles,
        category: "Personal",
        priority: "high",
        progress: 60,
      },
    ],
    mentorPreferences: ["patient", "friendly", "concept-focused"],
  });

  const [draft, setDraft] = useState(profile);

  const handleEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const cyclePriority = (goalType, idx) => {
    const goals = [...draft[goalType]];
    const current = goals[idx].priority;
    const order = ["primary", "high", "improvement", "maintain"];
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    goals[idx] = { ...goals[idx], priority: order[nextIdx] };
    setDraft({ ...draft, [goalType]: goals });
  };

  const toggleMentorPref = (value) => {
    const prefs = draft.mentorPreferences.includes(value)
      ? draft.mentorPreferences.filter((v) => v !== value)
      : [...draft.mentorPreferences, value];
    setDraft({ ...draft, mentorPreferences: prefs });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link
            to="/parent/dashboard"
            className="hover:text-neutral-900 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-medium">Child Profile</span>
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile header */}
      <Card padding="lg">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar src={childData.avatar} name={draft.name} size="xl" ring />
          <div className="flex-1 w-full">
            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Child's name"
                  icon={User}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
                <Input
                  label="Age"
                  type="number"
                  min="4"
                  max="18"
                  value={draft.age}
                  onChange={(e) => setDraft({ ...draft, age: e.target.value })}
                />
                <Select
                  label="Class"
                  options={classOptions}
                  value={draft.class}
                  onChange={(e) =>
                    setDraft({ ...draft, class: e.target.value })
                  }
                />
                <Select
                  label="School type"
                  options={schoolTypeOptions}
                  value={draft.schoolType}
                  onChange={(e) =>
                    setDraft({ ...draft, schoolType: e.target.value })
                  }
                />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold font-display text-neutral-900">
                    {profile.name}
                  </h2>
                  <Badge variant="primary" size="md">
                    {classOptions.find((c) => c.value === profile.class)?.label}
                  </Badge>
                  <Badge variant="neutral" size="md">
                    {
                      schoolTypeOptions.find(
                        (s) => s.value === profile.schoolType,
                      )?.label
                    }
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {profile.age} years old
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    {
                      schoolTypeOptions.find(
                        (s) => s.value === profile.schoolType,
                      )?.label
                    }{" "}
                    Board
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    Mentor: {childData.assignedMentor}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Academic goal cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              Academic Goals
            </h3>
            <p className="text-sm text-neutral-500 mt-0.5">
              Tap a card to cycle through priority levels
            </p>
          </div>
          {editing && (
            <Badge variant="primary" size="sm">
              {draft.academicGoals.length} active
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {draft.academicGoals.map((goal, idx) => (
            <GoalCard
              key={goal.label}
              goal={goal}
              onCyclePriority={() => cyclePriority("academicGoals", idx)}
            />
          ))}
        </div>
      </div>

      {/* Personal development goal cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary-600" />
              Personal Development Goals
            </h3>
            <p className="text-sm text-neutral-500 mt-0.5">
              Growth beyond academics — confidence, habits, and life skills
            </p>
          </div>
          {editing && (
            <Badge variant="secondary" size="sm">
              {draft.personalGoals.length} active
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {draft.personalGoals.map((goal, idx) => (
            <GoalCard
              key={goal.label}
              goal={goal}
              onCyclePriority={() => cyclePriority("personalGoals", idx)}
            />
          ))}
        </div>
      </div>

      {/* Learning preferences + Mentor preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning preferences */}
        <Card padding="lg">
          <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary-600" />
            Learning Preferences
          </h3>
          <div className="space-y-4">
            <Select
              label="Learning style"
              options={learningStyleOptions}
              value={draft.learningStyle}
              onChange={(e) =>
                setDraft({ ...draft, learningStyle: e.target.value })
              }
              disabled={!editing}
            />
            <Select
              label="Session format"
              options={sessionFormatOptions}
              value={draft.sessionFormat}
              onChange={(e) =>
                setDraft({ ...draft, sessionFormat: e.target.value })
              }
              disabled={!editing}
            />
          </div>
          {!editing && (
            <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-100">
              <p className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">
                  {
                    learningStyleOptions.find(
                      (l) => l.value === profile.learningStyle,
                    )?.label
                  }
                </span>
              </p>
              <p className="text-sm text-neutral-600 mt-1">
                Prefers{" "}
                <span className="font-medium text-neutral-900">
                  {sessionFormatOptions
                    .find((s) => s.value === profile.sessionFormat)
                    ?.label.toLowerCase()}
                </span>
              </p>
            </div>
          )}
        </Card>

        {/* Mentor preferences */}
        <Card padding="lg">
          <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary-600" />
            Mentor Preferences
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            {editing
              ? "Select the traits you want in your child's mentor."
              : "Traits you prefer in your child's mentor."}
          </p>
          <div className="flex flex-wrap gap-2">
            {mentorPersonalityOptions.map((trait) => (
              <PreferenceChip
                key={trait.value}
                label={trait.label}
                selected={draft.mentorPreferences.includes(trait.value)}
                onClick={
                  editing ? () => toggleMentorPref(trait.value) : undefined
                }
              />
            ))}
          </div>
          {!editing && profile.mentorPreferences.length > 0 && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-secondary-50 border border-secondary-100">
              <Smile className="w-4 h-4 text-secondary-600" />
              <p className="text-sm text-secondary-700">
                Your child's mentor matches {profile.mentorPreferences.length}{" "}
                of your preferred traits
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Overall progress summary */}
      <Card padding="lg">
        <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-success-600" />
          Overall Progress Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary-50">
            <p className="text-3xl font-bold font-display text-primary-700">
              {Math.round(
                [...profile.academicGoals, ...profile.personalGoals].reduce(
                  (a, g) => a + g.progress,
                  0,
                ) /
                  (profile.academicGoals.length + profile.personalGoals.length),
              )}
              %
            </p>
            <p className="text-sm text-neutral-500 mt-1">Overall average</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-success-50">
            <p className="text-3xl font-bold font-display text-success-700">
              {profile.personalGoals.filter((g) => g.priority === "maintain")
                .length +
                profile.academicGoals.filter((g) => g.priority === "maintain")
                  .length}
            </p>
            <p className="text-sm text-neutral-500 mt-1">Maintaining well</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-warning-50">
            <p className="text-3xl font-bold font-display text-warning-700">
              {profile.personalGoals.filter((g) => g.priority === "improvement")
                .length +
                profile.academicGoals.filter(
                  (g) => g.priority === "improvement",
                ).length}
            </p>
            <p className="text-sm text-neutral-500 mt-1">Need improvement</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
