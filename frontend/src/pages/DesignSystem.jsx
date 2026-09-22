import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Search,
  Users,
  Calendar,
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Plus,
  ArrowRight,
  Download,
} from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Avatar from "../components/Avatar";
import Rating from "../components/Rating";
import ProgressBar from "../components/ProgressBar";
import Alert from "../components/Alert";
import Dropdown from "../components/Dropdown";
import Tabs from "../components/Tabs";
import EmptyState from "../components/EmptyState";
import { Spinner, SkeletonCard } from "../components/Loading";

const avatarSrc =
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=200";

const selectOptions = [
  { value: "academic", label: "Academic Tutoring" },
  { value: "confidence", label: "Confidence Building" },
  { value: "communication", label: "Communication" },
  { value: "discipline", label: "Discipline" },
];

const dropdownOptions = [
  { value: "newest", label: "Newest first" },
  { value: "rating", label: "Highest rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const tabContent = (label) => (
  <p className="text-sm text-neutral-600">
    This is the content area for the{" "}
    <span className="font-medium text-neutral-900">{label}</span> tab. Any
    component or content can go here.
  </p>
);

function Section({ title, description, children }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold font-display text-neutral-900">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-neutral-500 mt-1">{description}</p>
        )}
      </div>
      <Card padding="lg">{children}</Card>
    </div>
  );
}

export default function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(4);
  const [dropdownValue, setDropdownValue] = useState("rating");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold font-display text-neutral-900">
                GuruCool
              </span>
              <span className="ml-2 text-sm text-neutral-400">
                Design System
              </span>
            </div>
          </div>
          <a
            href="/"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to app
          </a>
        </div>
      </header>

      <div className="container-page py-10 space-y-10 max-w-5xl">
        {/* Intro */}
        <div>
          <h1 className="text-3xl font-bold font-display text-neutral-900">
            Design System
          </h1>
          <p className="text-neutral-500 mt-2 max-w-2xl">
            The complete component library for GuruCool — premium, trustworthy,
            warm, and built for an education technology product.
          </p>
        </div>

        {/* Color palette */}
        <Section
          title="Color Palette"
          description="Six color ramps plus neutral tones, each with multiple shades."
        >
          <div className="space-y-4">
            {[
              { name: "Primary", prefix: "primary" },
              { name: "Secondary", prefix: "secondary" },
              { name: "Accent", prefix: "accent" },
              { name: "Success", prefix: "success" },
              { name: "Warning", prefix: "warning" },
              { name: "Error", prefix: "error" },
            ].map((ramp) => (
              <div key={ramp.prefix}>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                  {ramp.name}
                </p>
                <div className="flex rounded-lg overflow-hidden h-10">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                    (shade) => (
                      <div
                        key={shade}
                        className={`flex-1 bg-${ramp.prefix}-${shade} flex items-center justify-center`}
                        title={`${ramp.prefix}-${shade}`}
                      />
                    ),
                  )}
                </div>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                Neutral
              </p>
              <div className="flex rounded-lg overflow-hidden h-10">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div
                      key={shade}
                      className={`flex-1 bg-neutral-${shade}`}
                      title={`neutral-${shade}`}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section
          title="Typography"
          description="Inter for body, Plus Jakarta Sans for headings. Responsive scale."
        >
          <div className="space-y-3">
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Display / 3xl
              </span>
              <h1 className="text-4xl font-bold font-display text-neutral-900">
                A brighter future for every child
              </h1>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Display / 2xl
              </span>
              <h2 className="text-3xl font-bold font-display text-neutral-900">
                Find the right mentor
              </h2>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Display / xl
              </span>
              <h3 className="text-2xl font-semibold font-display text-neutral-900">
                Featured mentors
              </h3>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Body / lg
              </span>
              <p className="text-lg text-neutral-600">
                GuruCool connects parents with verified mentors.
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Body / base
              </span>
              <p className="text-base text-neutral-600">
                Track progress across nine development areas.
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Body / sm
              </span>
              <p className="text-sm text-neutral-500">
                Helper text and metadata appear at this size.
              </p>
            </div>
            <div>
              <span className="text-xs text-neutral-400 font-mono">
                Body / xs
              </span>
              <p className="text-xs text-neutral-400">
                Captions, timestamps, and fine print.
              </p>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section
          title="Buttons"
          description="Seven variants, four sizes, loading and disabled states."
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                Variants
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                Sizes
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                With icons
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">
                  <Plus className="w-4 h-4" />
                  Add Child
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="ghost">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                States
              </p>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section
          title="Badges"
          description="Seven color variants with optional dot indicator."
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>
                Verified
              </Badge>
              <Badge variant="warning" dot>
                Pending
              </Badge>
              <Badge variant="primary" dot>
                Online
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" size="sm">
                Small
              </Badge>
              <Badge variant="primary" size="md">
                Medium
              </Badge>
              <Badge variant="primary" size="lg">
                Large
              </Badge>
            </div>
          </div>
        </Section>

        {/* Avatars */}
        <Section
          title="Avatars"
          description="Image or initials, six sizes, optional status indicator and ring."
        >
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <Avatar src={avatarSrc} name="Ananya Sharma" size="xs" />
              <Avatar src={avatarSrc} name="Ananya Sharma" size="sm" />
              <Avatar src={avatarSrc} name="Ananya Sharma" size="md" />
              <Avatar src={avatarSrc} name="Ananya Sharma" size="lg" />
              <Avatar src={avatarSrc} name="Ananya Sharma" size="xl" />
            </div>
            <div className="flex items-end gap-3">
              <Avatar name="Rajesh Kumar" size="md" />
              <Avatar name="Priya Nair" size="lg" />
              <Avatar name="Vikram Mehta" size="md" ring />
            </div>
            <div className="flex items-end gap-3">
              <Avatar src={avatarSrc} name="Ananya" size="lg" status="online" />
              <Avatar name="Rajesh" size="lg" status="busy" />
              <Avatar name="Priya" size="lg" status="away" />
              <Avatar name="Vikram" size="lg" status="offline" />
            </div>
          </div>
        </Section>

        {/* Ratings */}
        <Section
          title="Ratings"
          description="Star display with optional count, interactive mode for reviews."
        >
          <div className="space-y-3">
            <Rating value={5} size="sm" />
            <Rating value={4.5} count={128} size="md" />
            <Rating value={3.2} count={45} size="lg" />
            <div className="pt-2">
              <p className="text-sm text-neutral-500 mb-2">
                Interactive (click to rate):
              </p>
              <Rating
                value={ratingValue}
                interactive
                onChange={setRatingValue}
                size="lg"
                showValue={false}
              />
            </div>
          </div>
        </Section>

        {/* Progress bars */}
        <Section
          title="Progress Bars"
          description="Four sizes, six colors, optional label and value display."
        >
          <div className="space-y-4">
            <ProgressBar value={72} label="Academic Performance" showValue />
            <ProgressBar
              value={85}
              label="Confidence"
              color="success"
              showValue
            />
            <ProgressBar
              value={45}
              label="Speaking Skills"
              color="warning"
              showValue
            />
            <ProgressBar
              value={30}
              label="Needs Attention"
              color="error"
              showValue
              size="sm"
            />
            <ProgressBar value={60} color="secondary" size="lg" />
          </div>
        </Section>

        {/* Alerts */}
        <Section
          title="Alerts"
          description="Four variants with optional close button."
        >
          <div className="space-y-3">
            <Alert variant="success" title="Session booked">
              Your session with Dr. Ananya Sharma has been confirmed for
              tomorrow at 4:00 PM.
            </Alert>
            <Alert variant="info" title="New mentor available">
              A new mentor matching your child's focus areas has joined the
              platform.
            </Alert>
            <Alert variant="warning" title="Subscription expiring">
              Your plan expires in 3 days. Renew to keep your sessions active.
            </Alert>
            <Alert variant="error" title="Payment failed">
              We couldn't process your last payment. Please update your billing
              details.
            </Alert>
          </div>
        </Section>

        {/* Forms */}
        <Section
          title="Form Controls"
          description="Input, Textarea, Select, and Dropdown with error and hint states."
        >
          <div className="space-y-5 max-w-md">
            <Input
              label="Email address"
              placeholder="you@example.com"
              icon={Mail}
              hint="We'll never share your email."
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              icon={Lock}
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              icon={Mail}
              error="This email is already registered."
            />
            <Select
              label="Focus area"
              placeholder="Select a focus area"
              options={selectOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            />
            <Textarea
              label="Tell us about your child"
              placeholder="What are your child's strengths and areas for growth?"
              rows={4}
              hint="This helps mentors personalize their approach."
            />
            <div>
              <p className="block text-sm font-medium text-neutral-700 mb-1.5">
                Sort by
              </p>
              <Dropdown
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
              />
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section
          title="Cards"
          description="Base card, hover card, and header/footer pattern."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card hover>
              <div className="flex items-center gap-3">
                <Avatar src={avatarSrc} name="Ananya" size="md" />
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">
                    Dr. Ananya Sharma
                  </p>
                  <p className="text-xs text-neutral-500">PhD, IIT Delhi</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                Hover over this card to see the interaction.
              </p>
            </Card>
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 text-sm">
                    Monthly Report
                  </h3>
                  <Badge variant="success" size="sm">
                    +12%
                  </Badge>
                </div>
              }
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                  <Button variant="primary" size="sm">
                    Download
                  </Button>
                </div>
              }
            >
              <p className="text-sm text-neutral-600">
                Your child completed 12 sessions this month with an average
                score of 85%.
              </p>
            </Card>
          </div>
        </Section>

        {/* Tabs */}
        <Section
          title="Tabs"
          description="Horizontal tabs with optional icons and count badges."
        >
          <Tabs
            tabs={[
              {
                label: "Overview",
                icon: Users,
                content: tabContent("Overview"),
              },
              {
                label: "Sessions",
                icon: Calendar,
                count: 8,
                content: tabContent("Sessions"),
              },
              {
                label: "Reviews",
                icon: Star,
                count: 128,
                content: tabContent("Reviews"),
              },
              { label: "Settings", content: tabContent("Settings") },
            ]}
          />
        </Section>

        {/* Modal */}
        <Section
          title="Modal"
          description="Overlay dialog with ESC and click-outside dismissal."
        >
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Book a session"
            description="Confirm your booking details below."
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p className="text-sm text-neutral-600">
              This modal locks body scroll, closes on ESC, and closes when you
              click the overlay. It supports a title, description, body content,
              and a footer with actions.
            </p>
          </Modal>
        </Section>

        {/* Empty states */}
        <Section
          title="Empty States"
          description="Friendly placeholders when there's no data to show."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-neutral-200 rounded-xl">
              <EmptyState
                icon="search"
                title="No mentors found"
                description="Try adjusting your filters or search keywords."
                actionLabel="Clear filters"
              />
            </div>
            <div className="border border-dashed border-neutral-200 rounded-xl">
              <EmptyState
                icon="folder"
                title="No sessions yet"
                description="Book your first session to get started."
                actionLabel="Find a mentor"
              />
            </div>
          </div>
        </Section>

        {/* Loading states */}
        <Section
          title="Loading States"
          description="Spinner, full-page loader, and skeleton cards."
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                Spinners
              </p>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                Skeleton Cards
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing reference */}
        <Section
          title="Spacing"
          description="8px base unit, consistent across the system."
        >
          <div className="space-y-2">
            {[
              { name: "2", px: "8px", cls: "w-2" },
              { name: "3", px: "12px", cls: "w-3" },
              { name: "4", px: "16px", cls: "w-4" },
              { name: "6", px: "24px", cls: "w-6" },
              { name: "8", px: "32px", cls: "w-8" },
              { name: "12", px: "48px", cls: "w-12" },
              { name: "16", px: "64px", cls: "w-16" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className={`h-4 ${s.cls} bg-primary-500 rounded`} />
                <span className="text-sm text-neutral-600 font-mono">
                  space-{s.name}
                </span>
                <span className="text-xs text-neutral-400">{s.px}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
