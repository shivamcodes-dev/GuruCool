import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Plus,
  Star,
  BookOpen,
  Target,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { parentDashboardData } from "../services/MockData";
import { formatCurrency } from "../utils/helpers";

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(0);
  const { children, upcomingSessions, monthlyReport } = parentDashboardData;
  const child = children[selectedChild];

  const statCards = [
    {
      label: "Total Sessions",
      value: monthlyReport.totalSessions,
      icon: Calendar,
      color: "primary",
    },
    {
      label: "Hours Spent",
      value: monthlyReport.hoursSpent,
      icon: Clock,
      color: "secondary",
    },
    {
      label: "Average Score",
      value: monthlyReport.averageScore,
      icon: Award,
      color: "accent",
    },
    {
      label: "Improvement",
      value: monthlyReport.improvement,
      icon: TrendingUp,
      color: "success",
    },
  ];

  const colorMap = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    accent: "bg-accent-50 text-accent-600",
    success: "bg-success-50 text-success-600",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} padding="md">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[stat.color]}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-neutral-900">
                  {stat.value}
                </p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Child selector */}
      <div className="flex items-center gap-2 flex-wrap">
        {children.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedChild(idx)}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all",
              selectedChild === idx
                ? "border-primary-500 bg-primary-50"
                : "border-neutral-200 hover:border-neutral-300 bg-white",
            ].join(" ")}
          >
            <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full" />
            <span className="text-sm font-medium text-neutral-900">
              {c.name}
            </span>
          </button>
        ))}
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4" />
          Add Child
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Child card */}
          <Card padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold font-display text-neutral-900">
                    {child.name}
                  </h2>
                  <p className="text-sm text-neutral-500">{child.grade}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="success" size="sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                      Next: {child.upcomingSession}
                    </Badge>
                  </div>
                </div>
              </div>
              <Link to={`/mentor/${child.mentorId}`}>
                <Button variant="outline" size="sm">
                  View Mentor
                </Button>
              </Link>
            </div>

            {/* Overall progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-primary-600">
                  {child.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${child.progress}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Skills progress */}
          <Card padding="lg">
            <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              Development Areas Progress
            </h3>
            <div className="space-y-4">
              {child.skillsProgress.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-neutral-600">
                      {skill.skill}
                    </span>
                    <span className="text-sm font-medium text-neutral-900">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={[
                        "h-full rounded-full transition-all duration-500",
                        skill.value >= 80
                          ? "bg-success-500"
                          : skill.value >= 65
                            ? "bg-primary-500"
                            : "bg-accent-500",
                      ].join(" ")}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent activity */}
          <Card padding="lg">
            <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {child.recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {activity.topic}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {activity.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        parseInt(activity.score) >= 85 ? "success" : "warning"
                      }
                      size="sm"
                    >
                      {activity.score}
                    </Badge>
                    <p className="text-xs text-neutral-400 mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming sessions */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display text-neutral-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Upcoming Sessions
              </h3>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {session.subject}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {session.childName} with {session.mentorName}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="primary" size="sm">
                      {session.date}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {session.time}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth size="sm" className="mt-4">
              View all sessions
            </Button>
          </Card>

          {/* Mentor info */}
          <Card padding="lg">
            <h3 className="font-semibold font-display text-neutral-900 mb-3">
              Assigned Mentor
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-700">
                  {child.assignedMentor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {child.assignedMentor}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                  <span className="text-xs text-neutral-500">4.9 rating</span>
                </div>
              </div>
            </div>
            <Link to={`/mentor/${child.mentorId}`}>
              <Button variant="ghost" fullWidth size="sm" className="mt-3">
                View profile
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
