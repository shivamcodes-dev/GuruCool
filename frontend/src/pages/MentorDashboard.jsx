import {
  Calendar,
  Users,
  IndianRupee,
  Star,
  TrendingUp,
  ChevronRight,
  Clock,
  BookOpen,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { mentorDashboardData } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

export default function MentorDashboard() {
  const { stats, upcomingSessions, students, earnings } = mentorDashboardData;

  const statCards = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "primary",
    },
    {
      label: "Upcoming Sessions",
      value: stats.upcomingSessions,
      icon: Calendar,
      color: "secondary",
    },
    {
      label: "Monthly Earnings",
      value: formatCurrency(stats.monthlyEarnings),
      icon: IndianRupee,
      color: "accent",
    },
    { label: "Rating", value: stats.rating, icon: Star, color: "success" },
  ];

  const colorMap = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    accent: "bg-accent-50 text-accent-600",
    success: "bg-success-50 text-success-600",
  };

  const maxEarning = Math.max(...earnings.map((e) => e.amount));

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
                <p className="text-xl font-bold font-display text-neutral-900">
                  {stat.value}
                </p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming sessions */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display text-neutral-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Upcoming Sessions
              </h3>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {session.subject}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {session.studentName} &middot; Parent:{" "}
                        {session.parentName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="primary" size="sm">
                      {session.date}
                    </Badge>
                    <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {session.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* My students */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display text-neutral-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                My Students
              </h3>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {student.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {student.grade} &middot; Parent: {student.parentName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-neutral-400">
                          Progress
                        </span>
                        <span className="text-xs font-medium text-neutral-700">
                          {student.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Earnings chart */}
          <Card padding="lg">
            <h3 className="font-semibold font-display text-neutral-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Earnings Overview
            </h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {earnings.map((entry) => (
                <div
                  key={entry.month}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-700 hover:to-primary-500"
                      style={{
                        height: `${(entry.amount / maxEarning) * 100}%`,
                      }}
                      title={formatCurrency(entry.amount)}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">
                    {entry.month}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-sm text-neutral-500">This month</span>
              <span className="text-lg font-bold font-display text-neutral-900">
                {formatCurrency(earnings[earnings.length - 1].amount)}
              </span>
            </div>
          </Card>

          {/* Quick actions */}
          <Card padding="lg">
            <h3 className="font-semibold font-display text-neutral-900 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                fullWidth
                size="md"
                className="justify-start"
              >
                <Calendar className="w-4 h-4" />
                Set Availability
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="md"
                className="justify-start"
              >
                <BookOpen className="w-4 h-4" />
                Create Lesson Plan
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="md"
                className="justify-start"
              >
                <Users className="w-4 h-4" />
                Invite Student
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
