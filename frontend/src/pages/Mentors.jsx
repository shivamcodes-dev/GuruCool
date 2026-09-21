import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Search,
  Star,
  Shield,
  SlidersHorizontal,
  X,
  MapPin,
  Languages,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { mentors, focusAreas, subjects } from "../services/mockData";
import { formatCurrency } from "../utils/helpers";

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFocus = (area) => {
    setSelectedFocus((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const toggleSubject = (subject) => {
    setSelectedSubject((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  };

  const clearFilters = () => {
    setSelectedFocus([]);
    setSelectedSubject([]);
    setMinRating(0);
    setSearch("");
  };

  const filtered = useMemo(() => {
    let result = mentors.filter((m) => {
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.bio.toLowerCase().includes(search.toLowerCase()) ||
        m.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesFocus =
        selectedFocus.length === 0 ||
        selectedFocus.every((f) => m.focusAreas.includes(f));

      const matchesSubject =
        selectedSubject.length === 0 ||
        selectedSubject.some((s) => m.subjects.includes(s));

      const matchesRating = m.rating >= minRating;

      return matchesSearch && matchesFocus && matchesSubject && matchesRating;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      return 0;
    });

    return result;
  }, [search, selectedFocus, selectedSubject, minRating, sortBy]);

  const activeFilterCount =
    selectedFocus.length + selectedSubject.length + (minRating > 0 ? 1 : 0);

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display text-neutral-900">
          Find the right mentor
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Browse {mentors.length} verified mentors specializing in academic and
          personal development.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, subject, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 cursor-pointer"
        >
          <option value="rating">Top Rated</option>
          <option value="experience">Most Experienced</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        <Button
          variant={showFilters ? "primary" : "outline"}
          size="md"
          onClick={() => setShowFilters((s) => !s)}
          className="lg:hidden"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-primary-700 rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside
          className={[
            "lg:block w-full lg:w-64 flex-shrink-0",
            showFilters ? "block" : "hidden",
          ].join(" ")}
        >
          <Card padding="md" className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900 text-sm">
                Filters
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                  Focus Areas
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {focusAreas.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700 hover:text-neutral-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFocus.includes(area)}
                        onChange={() => toggleFocus(area)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 w-4 h-4"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                  Subjects
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {subjects.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 cursor-pointer text-sm text-neutral-700 hover:text-neutral-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubject.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 w-4 h-4"
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                  Minimum Rating
                </h4>
                <div className="flex gap-1.5">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={[
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        minRating === r
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                      ].join(" ")}
                    >
                      {r === 0 ? "Any" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Mentor grid */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-500 mb-4">
            Showing{" "}
            <span className="font-medium text-neutral-700">
              {filtered.length}
            </span>{" "}
            mentor{filtered.length !== 1 ? "s" : ""}
          </p>
          {filtered.length === 0 ? (
            <Card className="text-center py-16">
              <p className="text-neutral-500">No mentors match your filters.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((mentor) => (
                <Link key={mentor.id} to={`/mentor/${mentor.id}`}>
                  <Card hover className="h-full">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
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
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                            <span className="font-medium text-neutral-700">
                              {mentor.rating}
                            </span>
                            ({mentor.reviews})
                          </span>
                          <span>{mentor.experience}y exp</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-neutral-600 line-clamp-2">
                      {mentor.bio}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {mentor.focusAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="primary" size="sm">
                          {area}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold font-display text-neutral-900">
                          {formatCurrency(mentor.hourlyRate)}
                        </span>
                        <span className="text-xs text-neutral-500">/hour</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {mentor.location}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
