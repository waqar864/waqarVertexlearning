import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Navbar } from '@/components/nav/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';

export default function Home() {
  const courses = [
    {
      id: 1,
      title: 'Next.js for Production',
      description: 'Build scalable, high-performance web applications with Next.js.',
      level: 'Intermediate',
      duration: '18h 24m',
      modules: 12,
      icon: (
        <div className="w-16 h-16 bg-neutral-900 rounded-lg flex items-center justify-center">
          <span className="text-white text-3xl font-bold">N</span>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Docker Essentials',
      description: 'Containerize applications and streamline your development workflow.',
      level: 'Beginner',
      duration: '10h 12m',
      modules: 8,
      icon: (
        <div className="w-16 h-16 bg-[#2496ED] rounded-lg flex items-center justify-center">
          <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="18" width="6" height="6" fill="white" />
            <rect x="10" y="18" width="6" height="6" fill="white" />
            <rect x="18" y="18" width="6" height="6" fill="white" />
            <rect x="26" y="18" width="6" height="6" fill="white" />
            <rect x="10" y="10" width="6" height="6" fill="white" />
            <rect x="18" y="10" width="6" height="6" fill="white" />
            <rect x="26" y="10" width="6" height="6" fill="white" />
            <rect x="18" y="2" width="6" height="6" fill="white" />
            <path d="M34 18C34 18 36 16 40 16C44 16 46 18 46 22C46 26 44 28 40 28H2" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: 'TypeScript Deep Dive',
      description: 'Go beyond the basics and write safer, more expressive code.',
      level: 'Intermediate',
      duration: '14h 36m',
      modules: 10,
      icon: (
        <div className="w-16 h-16 bg-[#3178C6] rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">TS</span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="hero" className="mb-6">
              Intelligent Learning
            </Badge>

            <h1 className="text-display-2 md:text-display-1 text-neutral-900 mb-6">
              Search your learning
              <br />
              in plain English.
            </h1>

            <p className="text-body-large text-neutral-500 mb-8 max-w-2xl mx-auto">
              Vertex understands what you want to learn and finds the exact lessons across all your courses.
            </p>

            <Link href="/courses">
              <Button variant="primary" size="lg" className="mb-12 px-6">
                Explore Courses
                <ArrowRight size={16} />
              </Button>
            </Link>

            {/* Search Input */}
            <div className="max-w-3xl mx-auto">
              <SearchInput placeholder="Ask anything about your learning..." />
            </div>
          </div>
        </section>

        {/* All Courses Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-heading-1 text-neutral-900">All Courses</h2>
              <Link
                href="/courses"
                className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                View all courses
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group">
                  <Link href={`/courses/${course.id}`}>
                    <div className="bg-white border border-neutral-200 rounded-[12px] p-6 hover:shadow-md transition-shadow">
                      {/* Course Icon */}
                      <div className="mb-4">{course.icon}</div>

                      {/* Course Content */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h3 className="text-heading-3 text-neutral-900 group-hover:text-primary-500 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-body text-neutral-500">{course.description}</p>
                        </div>

                        {/* Course Meta */}
                        <div className="flex items-center gap-3 text-small text-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
                              <path
                                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 4v4l2.5 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {course.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
                              <circle
                                cx="8"
                                cy="8"
                                r="6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 4v4l2 2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
                              <rect
                                x="2"
                                y="3"
                                width="12"
                                height="10"
                                rx="1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path d="M5 6h6M5 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {course.modules} modules
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="px-6 py-8 bg-neutral-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-neutral-700">
            <Star size={20} className="text-primary-500 fill-primary-500" />
            <p className="text-body">New courses and lessons added every week.</p>
          </div>
        </section>

        {/* Decorative Gradient */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-primary-100/80 via-primary-200/40 to-transparent">
            <svg
              className="absolute bottom-0 left-0 w-full h-full opacity-60"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient1)"
                d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,165.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
              <path
                fill="url(#gradient1)"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                opacity="0.7"
              />
              <path
                fill="url(#gradient1)"
                d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,213.3C960,213,1056,235,1152,240C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
