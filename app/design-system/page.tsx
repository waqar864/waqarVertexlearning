'use client';

import { useState } from 'react';
import {
  Bell, Search, Play, FileText, Bookmark, BarChart,
  Clock, User, ExternalLink, Target, Eye, Grid,
  Accessibility
} from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/ui/search-input';
import { Select } from '@/components/ui/select';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { ProgressBar } from '@/components/ui/progress-bar';
import { CourseCard } from '@/components/cards/course-card';
import { LessonVideoCard } from '@/components/cards/lesson-video-card';
import { LessonCard } from '@/components/cards/lesson-card';
import { ResourceCard } from '@/components/cards/resource-card';
import { Navbar } from '@/components/nav/navbar';
import { Breadcrumbs } from '@/components/nav/breadcrumbs';
import { Pagination } from '@/components/nav/pagination';

export default function DesignSystemPage() {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <Logo size={48} showWordmark />
          <h1 className="text-display-1 mt-6">Design System</h1>
          <p className="text-body-large text-neutral-500 mt-4 max-w-2xl">
            A unified design language for Vertex learning platform. Clean, modern and
            focused on clarity, consistency and intuitive learning experiences.
          </p>
          <p className="text-small text-neutral-400 mt-4">VERSION 1.0 • MAY 2025</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 space-y-24">
        {/* 01. COLORS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">01</p>
            <h2 className="text-display-2">COLORS</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-heading-2 mb-4">Primary</h3>
              <div className="flex gap-4">
                {[
                  { name: 'Primary 500', class: 'bg-primary-500', hex: '#F97316' },
                  { name: 'Primary 400', class: 'bg-primary-400', hex: '#FB923C' },
                  { name: 'Primary 300', class: 'bg-primary-300', hex: '#FDBA74' },
                  { name: 'Primary 200', class: 'bg-primary-200', hex: '#FED7AA' },
                  { name: 'Primary 100', class: 'bg-primary-100', hex: '#FFEEE5' },
                ].map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div className={`w-24 h-24 rounded-lg ${color.class} shadow-md`} />
                    <div className="text-small">
                      <p className="font-medium text-neutral-900">{color.name}</p>
                      <p className="text-neutral-500">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-heading-2 mb-4">Neutral</h3>
              <div className="flex gap-4 flex-wrap">
                {[
                  { name: 'Neutral 900', class: 'bg-neutral-900', hex: '#0F172A' },
                  { name: 'Neutral 700', class: 'bg-neutral-700', hex: '#334155' },
                  { name: 'Neutral 500', class: 'bg-neutral-500', hex: '#64748B' },
                  { name: 'Neutral 300', class: 'bg-neutral-300', hex: '#CBD5E1' },
                  { name: 'Neutral 200', class: 'bg-neutral-200', hex: '#E2E8F0' },
                  { name: 'Neutral 100', class: 'bg-neutral-100', hex: '#F1F5F9' },
                  { name: 'Neutral 50', class: 'bg-neutral-50', hex: '#FAFAFC' },
                  { name: 'White', class: 'bg-white border border-neutral-200', hex: '#FFFFFF' },
                ].map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div className={`w-24 h-24 rounded-lg ${color.class} shadow-md`} />
                    <div className="text-small">
                      <p className="font-medium text-neutral-900">{color.name}</p>
                      <p className="text-neutral-500">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02. TYPOGRAPHY */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">02</p>
            <h2 className="text-display-2">TYPOGRAPHY</h2>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-8 space-y-6">
            <div className="pb-4 border-b border-neutral-100">
              <p className="text-display-1">Display 1</p>
              <p className="text-small text-neutral-500 mt-2">Playfair Display • 48px / 56px • Bold • Page titles</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-display-2">Display 2</p>
              <p className="text-small text-neutral-500 mt-2">Playfair Display • 36px / 44px • Bold • Section titles</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-heading-1">Heading 1</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 28px / 36px • Semi Bold • Card titles</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-heading-2">Heading 2</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 22px / 30px • Semi Bold • Sub section</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-heading-3">Heading 3</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 18px / 26px • Medium • Small titles</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-body-large">Body Large</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 16px / 24px • Regular • Body copy</p>
            </div>

            <div className="pb-4 border-b border-neutral-100">
              <p className="text-body">Body</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 14px / 20px • Regular • Supporting text</p>
            </div>

            <div>
              <p className="text-small">Small</p>
              <p className="text-small text-neutral-500 mt-2">Inter • 12px / 16px • Regular • Captions, meta</p>
            </div>
          </div>
        </section>

        {/* 03. TYPE SCALE */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">03</p>
            <h2 className="text-display-2">TYPE SCALE</h2>
          </div>

          <p className="text-body text-neutral-500">
            Reference section 02 Typography for the complete type scale specification.
          </p>
        </section>

        {/* 04. SPACING SYSTEM */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">04</p>
            <h2 className="text-display-2">SPACING SYSTEM</h2>
          </div>

          <div>
            <p className="text-body text-neutral-500 mb-6">Base unit: 4px</p>
            <div className="flex gap-4 flex-wrap items-end">
              {[
                { size: 4, px: '4px', rem: '0.25rem' },
                { size: 8, px: '8px', rem: '0.5rem' },
                { size: 12, px: '12px', rem: '0.75rem' },
                { size: 16, px: '16px', rem: '1rem' },
                { size: 24, px: '24px', rem: '1.5rem' },
                { size: 32, px: '32px', rem: '2rem' },
                { size: 40, px: '40px', rem: '2.5rem' },
                { size: 48, px: '48px', rem: '3rem' },
                { size: 64, px: '64px', rem: '4rem' },
              ].map((space) => (
                <div key={space.size} className="space-y-2">
                  <div
                    className="bg-primary-100 border-2 border-primary-500 rounded"
                    style={{ width: space.size, height: space.size }}
                  />
                  <div className="text-small text-neutral-900">
                    <p className="font-medium">{space.size}</p>
                    <p className="text-neutral-500">{space.px}</p>
                    <p className="text-neutral-500">{space.rem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05. RADIUS & SHADOWS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">05</p>
            <h2 className="text-display-2">RADIUS & SHADOWS</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-heading-3 mb-4">Radius</h3>
              <div className="flex gap-4 items-end">
                {[
                  { name: '4px', value: 4, label: 'xs' },
                  { name: '8px', value: 8, label: 'sm' },
                  { name: '12px', value: 12, label: 'md' },
                  { name: '16px', value: 16, label: 'lg' },
                  { name: '24px', value: 24, label: 'xl' },
                  { name: 'Full', value: 9999, label: 'circle' },
                ].map((radius) => (
                  <div key={radius.name} className="space-y-2">
                    <div
                      className="w-16 h-16 bg-primary-100 border-2 border-primary-500"
                      style={{ borderRadius: radius.value }}
                    />
                    <div className="text-small text-center">
                      <p className="font-medium text-neutral-900">{radius.name}</p>
                      <p className="text-neutral-500">({radius.label})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-heading-3 mb-4">Shadows</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Sm', class: 'shadow-sm' },
                  { name: 'Md', class: 'shadow-md' },
                  { name: 'Lg', class: 'shadow-lg' },
                  { name: 'Xl', class: 'shadow-xl' },
                ].map((shadow) => (
                  <div key={shadow.name} className={`bg-white p-6 rounded-lg ${shadow.class}`}>
                    <p className="text-heading-3 text-neutral-900">{shadow.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06. ICONS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">06</p>
            <h2 className="text-display-2">ICONS</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-heading-3 mb-4">Outline Style</h3>
              <div className="flex gap-4 flex-wrap">
                <Bell size={24} />
                <Search size={24} />
                <Play size={24} />
                <FileText size={24} />
                <Bookmark size={24} />
                <BarChart size={24} />
                <Clock size={24} />
                <User size={24} />
              </div>
            </div>

            <div>
              <h3 className="text-heading-3 mb-4">Filled Style</h3>
              <div className="flex gap-4 flex-wrap">
                <Bell size={24} fill="currentColor" />
                <Search size={24} fill="currentColor" />
                <Play size={24} fill="currentColor" />
                <FileText size={24} fill="currentColor" />
                <Bookmark size={24} fill="currentColor" />
                <BarChart size={24} fill="currentColor" />
                <Clock size={24} fill="currentColor" />
                <User size={24} fill="currentColor" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h4 className="text-heading-3 mb-3">Icon Specs</h4>
              <ul className="space-y-1 text-body text-neutral-700">
                <li>• 24px×24px grid</li>
                <li>• 2px stroke width (outline)</li>
                <li>• Rounded line caps</li>
                <li>• Consistent optical balance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 07. BUTTONS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">07</p>
            <h2 className="text-display-2">BUTTONS</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-heading-3">Primary</h3>
              <div className="flex gap-4 flex-wrap items-center">
                <Button variant="primary">Get Started</Button>
                <Button variant="primary" disabled>Get Started</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Secondary</h3>
              <div className="flex gap-4 flex-wrap items-center">
                <Button variant="secondary">Explore Courses</Button>
                <Button variant="secondary" disabled>Explore Courses</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Tertiary</h3>
              <div className="flex gap-4 flex-wrap items-center">
                <Button variant="tertiary">
                  View Lesson
                  <ExternalLink size={16} />
                </Button>
                <Button variant="tertiary" disabled>
                  View Lesson
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Text</h3>
              <div className="flex gap-4 flex-wrap items-center">
                <Button variant="text">
                  <Play size={20} fill="currentColor" />
                  Watch Video
                </Button>
                <Button variant="text" disabled>
                  <Play size={20} fill="currentColor" />
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 08. INPUTS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">08</p>
            <h2 className="text-display-2">INPUTS</h2>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="text-small font-medium text-neutral-700">Search / Text Input</label>
              <SearchInput placeholder="Search anything..." />
            </div>

            <div className="space-y-2">
              <label className="text-small font-medium text-neutral-700">Select</label>
              <Select
                options={[
                  { value: 'relevant', label: 'Most Relevant' },
                  { value: 'recent', label: 'Most Recent' },
                  { value: 'popular', label: 'Most Popular' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* 09. BADGES / TAGS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">09</p>
            <h2 className="text-display-2">BADGES / TAGS</h2>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Badge variant="video">VIDEO</Badge>
            <Badge variant="lesson">LESSON</Badge>
            <Badge variant="popular">POPULAR</Badge>
          </div>
        </section>

        {/* 10. STATUS / INDICATORS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">10</p>
            <h2 className="text-display-2">STATUS / INDICATORS</h2>
          </div>

          <div className="flex gap-8 flex-wrap">
            <StatusIndicator status="in-progress" label="In Progress" />
            <StatusIndicator status="completed" label="Completed" />
            <StatusIndicator status="now-playing" label="Now Playing" />
            <StatusIndicator status="locked" label="Locked" />
          </div>
        </section>

        {/* 11. PROGRESS BAR */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">11</p>
            <h2 className="text-display-2">PROGRESS BAR</h2>
          </div>

          <div className="space-y-4 max-w-md">
            <ProgressBar value={35} />
            <ProgressBar value={65} showLabel={false} />
            <ProgressBar value={100} />
          </div>
        </section>

        {/* 12. CARDS */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">12</p>
            <h2 className="text-display-2">CARDS</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-heading-3">Course Card</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <CourseCard
                  title="Next.js for Production"
                  description="Build scalable, high-performance web applications with Next.js"
                  level="Intermediate"
                  duration="18h 34m"
                  modules={12}
                  href="#"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Lesson Card (Video)</h3>
              <LessonVideoCard
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lesson="Lesson 5.1"
                timestamp="12:45"
                href="#"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Lesson Card (Lesson)</h3>
              <LessonCard
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data."
                module="Module 5"
                href="#"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Resource Card</h3>
              <div className="max-w-2xl">
                <ResourceCard
                  title="Caching and Revalidation Guide"
                  description="Deep dive into Next.js caching strategies."
                  type="PDF"
                  size="1.2 MB"
                  href="#"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 13. NAVIGATION */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">13</p>
            <h2 className="text-display-2">NAVIGATION</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-heading-3">Navbar</h3>
              <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <Navbar activeItem="Courses" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Breadcrumbs</h3>
              <Breadcrumbs
                items={[
                  { label: 'All Courses', href: '#' },
                  { label: 'Next.js for Production', href: '#' },
                  { label: 'Data Fetching & Caching' },
                ]}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-heading-3">Pagination</h3>
              <Pagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </section>

        {/* 14. PRINCIPLES */}
        <section className="space-y-8">
          <div>
            <p className="text-small text-primary-500 font-semibold mb-2">14</p>
            <h2 className="text-display-2">PRINCIPLES</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-3">
              <Eye size={32} className="text-primary-500" />
              <h3 className="text-heading-3">Clarity First</h3>
              <p className="text-body text-neutral-500">
                Visual hierarchy should communicate clearly
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-3">
              <Grid size={32} className="text-primary-500" />
              <h3 className="text-heading-3">Consistency</h3>
              <p className="text-body text-neutral-500">
                Use unified patterns consistently across platform
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-3">
              <Target size={32} className="text-primary-500" />
              <h3 className="text-heading-3">Focus & Calm</h3>
              <p className="text-body text-neutral-500">
                Help users focus on what matters
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-3">
              <Accessibility size={32} className="text-primary-500" />
              <h3 className="text-heading-3">Accessible</h3>
              <p className="text-body text-neutral-500">
                Design with accessibility and inclusivity in mind
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
