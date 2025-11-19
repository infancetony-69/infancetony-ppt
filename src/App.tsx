import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, Clock, Users, Laptop, Shield, Zap, Database, 
  Server, Brain, Video, Smartphone, Github, Linkedin, 
  QrCode, Briefcase, FileText, MessageSquare, BarChart3,
  CheckCircle, Lock, TrendingUp, Target, Coffee, Package, 
  Palette, Braces, Component
} from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { ScreenshotPlaceholder } from './components/ScreenshotPlaceholder';
import { ImageWithPreview } from './components/ImageWithPreview';
import { AnimatedCounter } from './components/AnimatedCounter';
import { DatabaseFlowDiagram } from './components/DatabaseFlowDiagram';
import { BackendFlowDiagram } from './components/BackendFlowDiagram';
import { AuthFlowDiagram } from './components/AuthFlowDiagram';
import { FrontendFlowDiagram } from './components/FrontendFlowDiagram';

gsap.registerPlugin(ScrollTrigger);

type UserRole = 'student' | 'recruiter' | 'admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const problemCardsRef = useRef<HTMLDivElement>(null);
  const architectureLeftRef = useRef<HTMLDivElement>(null);
  const architectureRightRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation - Faster
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.25,
        ease: 'power3.out'
      });

      // Floating particles - Faster
      gsap.utils.toArray<HTMLElement>('.particle').forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          x: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1
        });
      });

      // Problem Cards Animation - Faster
      const problemCards = gsap.utils.toArray<HTMLElement>('.problem-card');
      if (problemCards.length > 0) {
        gsap.set(problemCards, { opacity: 1, y: 0 }); // Ensure visible by default
        gsap.from(problemCards, {
          scrollTrigger: {
            trigger: problemCardsRef.current,
            start: 'top 90%',
          },
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }

      // Solution Section - Faster
      gsap.from('.solution-content', {
        scrollTrigger: {
          trigger: '.solution-section',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Architecture Section - Enhanced Scroll Animations
      gsap.from('.architecture-title', {
        scrollTrigger: {
          trigger: '.architecture-section',
          start: 'top 80%',
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.tech-logo', {
        scrollTrigger: {
          trigger: '.architecture-section',
          start: 'top 70%',
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.7)'
      });

      gsap.from('.spring-logo', {
        scrollTrigger: {
          trigger: '.architecture-section',
          start: 'top 60%',
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      });

      gsap.from('.tech-item', {
        scrollTrigger: {
          trigger: '.architecture-section',
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Feature Cards - Faster
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
      });

      // Technical Highlights - Faster
      gsap.from('.tech-highlight-card', {
        scrollTrigger: {
          trigger: '.tech-highlights-section',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Timeline Animation - Faster
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.roadmap-section',
          start: 'top 80%',
        },
        x: (index) => (index % 2 === 0 ? -50 : 50),
        opacity: 0,
        stagger: 0.15,
        duration: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const dashboardData = {
    student: {
      features: ['Browse 1000+ Jobs', 'One-Click Apply', 'Resume Builder', 'Application Tracking'],
      icon: Briefcase
    },
    recruiter: {
      features: ['Post Job Listings', 'Shortlist Candidates', 'Direct Messaging', 'Analytics Dashboard'],
      icon: Users
    },
    admin: {
      features: ['User Management', 'Platform Analytics', 'Content Moderation', 'System Configuration'],
      icon: Shield
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030014] text-white overflow-x-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-gradient-1" />
        <div className="aurora-gradient-2" />
        <div className="aurora-gradient-3" />
      </div>

      {/* Progress Bar */}
      <div 
        className="progress-bar" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`
          }}
        />
      ))}

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="hero-title text-7xl md:text-8xl lg:text-9xl font-bold text-gradient mb-6">
            ZidioConnect
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Job Portal Platform
          </p>
          <p className="hero-subtitle text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Connecting Students with Career Opportunities
          </p>
          <div className="hero-badge inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-6">
            <span className="text-purple-300">Spring Boot & React</span>
            <span className="text-gray-500">|</span>
            <span className="text-cyan-300">Full-Stack Platform</span>
          </div>
          <p className="text-gray-500 mt-8">
            Created by <span className="text-purple-300">Infance Tony</span>
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemCardsRef} className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Problem Statement
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Current Challenges in the Job Market
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            <div className="problem-card">
              <GlassCard
                icon={Search}
                description="Students struggle to find relevant internships and job opportunities"
              />
            </div>
            <div className="problem-card">
              <GlassCard
                icon={Users}
                description="Recruiters face difficulty in reaching qualified candidates"
              />
            </div>
            <div className="problem-card">
              <GlassCard
                icon={Clock}
                description="Manual application processes are time-consuming and inefficient"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
            <h3 className="text-2xl text-red-300 mb-4 text-center">Impact</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
                Missed Opportunities
              </span>
              <span className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
                Delayed Placements
              </span>
              <span className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
                Inefficient Hiring
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="solution-content">
            <h2 className="text-5xl md:text-6xl text-center mb-6 text-gradient-purple-cyan">
              Solution Overview
            </h2>
            <p className="text-xl text-center mb-4 text-white max-w-3xl mx-auto">
              ZidioConnect: A comprehensive web-based job portal platform
            </p>
            <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Streamlined, efficient, and user-friendly hiring process
            </p>
            
            <div className="mb-12">
              <ImageWithPreview 
                src="1.homepage.png" 
                alt="Platform Homepage/Dashboard" 
                className="max-w-4xl mx-auto" 
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Shield, title: 'Role-based Access', desc: 'Students, Recruiters, Admin' },
                { icon: TrendingUp, title: 'Real-time Job Postings', desc: 'Live applications & updates' },
                { icon: FileText, title: 'Resume Management', desc: 'Upload & builder system' },
                { icon: BarChart3, title: 'Application Tracking', desc: 'Complete workflow system' },
                { icon: MessageSquare, title: 'Messaging System', desc: 'In-app notifications' },
                { icon: CheckCircle, title: 'User-Friendly', desc: 'Intuitive interface design' }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm hover:border-purple-400/50 transition-all"
                >
                  <feature.icon className="w-10 h-10 text-cyan-400 mb-3" />
                  <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
                <h3 className="text-2xl text-red-300 mb-4 text-center">Before</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Manual job search across multiple platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Time-consuming application processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No application tracking visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Limited recruiter-candidate communication</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-green-500/30 bg-green-500/5 backdrop-blur-sm">
                <h3 className="text-2xl text-green-300 mb-4 text-center">After</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Centralized job portal with advanced filters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>One-click apply with saved resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Real-time application status tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Integrated messaging and notification system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section - Optimized */}
      <section className="architecture-section relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="architecture-title text-4xl md:text-5xl mb-16 text-gradient-purple-cyan text-center">
            System Architecture
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 w-full items-start">
            {/* Left Side - Tech Visualization */}
            <div className="flex items-center justify-center lg:sticky lg:top-32">
              <div className="relative w-full max-w-md">
                <div className="relative w-full h-96">
                  {/* Architecture Diagram Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Floating Tech Stack Logos */}
                      {[
                        { icon: Component, name: 'React', color: '#61DAFB', x: 15, y: 20, delay: 0, duration: 4 },
                        { icon: Coffee, name: 'Java', color: '#f89820', x: 75, y: 15, delay: 0.5, duration: 5 },
                        { icon: Database, name: 'MySQL', color: '#00758F', x: 80, y: 60, delay: 1, duration: 4.5 },
                        { icon: Package, name: 'Docker', color: '#2496ED', x: 60, y: 80, delay: 1.5, duration: 4 },
                        { icon: Palette, name: 'CSS3', color: '#1572B6', x: 20, y: 70, delay: 2, duration: 5 },
                        { icon: Braces, name: 'JS', color: '#F7DF1E', x: 45, y: 35, delay: 2.5, duration: 4.5 }
                      ].map((tech, i) => (
                        <div
                          key={i}
                          className="absolute tech-logo"
                          style={{
                            left: `${tech.x}%`,
                            top: `${tech.y}%`,
                            transform: 'translate(-50%, -50%)',
                            animation: `float ${tech.duration}s ease-in-out infinite`,
                            animationDelay: `${tech.delay}s`,
                            zIndex: 1,
                            willChange: 'transform'
                          }}
                        >
                          <div 
                            className="w-20 h-20 rounded-lg backdrop-blur-md bg-white/5 border flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300"
                            style={{ 
                              borderColor: `${tech.color}40`,
                              boxShadow: `0 0 20px ${tech.color}30`
                            }}
                          >
                            <tech.icon 
                              className="w-10 h-10 mb-1"
                              style={{ color: tech.color }}
                            />
                            <span 
                              className="text-xs font-semibold"
                              style={{ color: tech.color }}
                            >
                              {tech.name}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Center Spring Boot Logo */}
                      <div className="spring-logo absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 10 }}>
                        <div className="w-28 h-28 rounded-lg border-2 border-green-400 bg-green-500/20 backdrop-blur-sm flex flex-col items-center justify-center glow">
                          <Server className="w-12 h-12 text-green-300 mb-1" />
                          <span className="text-sm font-bold text-green-300">Spring</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Tech Stack Details */}
            <div ref={architectureRightRef} className="space-y-8">
              <div className="space-y-6">
                <div className="tech-item">
                  <h3 className="text-2xl text-purple-300 mb-3 flex items-center gap-3">
                    <Laptop className="w-6 h-6" />
                    Frontend
                  </h3>
                  <div className="pl-9 space-y-2 text-gray-300">
                    <p>• React 18 with TypeScript</p>
                    <p>• Tailwind CSS for styling</p>
                    <p>• Vite for build tooling</p>
                    <p>• TanStack Query for state management</p>
                  </div>
                </div>

                <div className="tech-item">
                  <h3 className="text-2xl text-cyan-300 mb-3 flex items-center gap-3">
                    <Server className="w-6 h-6" />
                    Backend
                  </h3>
                  <div className="pl-9 space-y-2 text-gray-300">
                    <p>• Spring Boot 3.3</p>
                    <p>• Java 17</p>
                    <p>• Spring Security with JWT</p>
                    <p> RESTful API Architecture</p>
                  </div>
                </div>

                <div className="tech-item">
                  <h3 className="text-2xl text-pink-300 mb-3 flex items-center gap-3">
                    <Database className="w-6 h-6" />
                    Database & Deployment
                  </h3>
                  <div className="pl-9 space-y-2 text-gray-300">
                    <p>• MySQL 8.0</p>
                    <p>• JPA/Hibernate ORM</p>
                    <p>• Docker Containerization</p>
                    <p>• Cloud-ready deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section - Interactive Tabs */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            User Roles & Dashboards
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Tailored experiences for every user role
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-4 mb-12">
            {(['student', 'recruiter', 'admin'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setActiveTab(role)}
                className={`px-8 py-4 rounded-lg border transition-all duration-300 capitalize ${
                  activeTab === role
                    ? 'border-purple-400 bg-purple-500/20 glow text-white'
                    : 'border-purple-500/30 bg-purple-500/5 text-gray-400 hover:text-white hover:border-purple-400/50'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="space-y-8">
            {activeTab === 'student' && (
              <ImageWithPreview 
                src="3.student-dashboard.png" 
                alt="Student Dashboard Screenshot" 
                className="max-w-4xl mx-auto" 
              />
            )}
            {activeTab === 'recruiter' && (
              <ImageWithPreview 
                src="7.recuriterhomepage.png" 
                alt="Recruiter Dashboard Screenshot" 
                className="max-w-4xl mx-auto" 
              />
            )}
            {activeTab === 'admin' && (
              <ImageWithPreview 
                src="4.admin-dashboard.png" 
                alt="Admin Dashboard Screenshot" 
                className="max-w-4xl mx-auto" 
              />
            )}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {dashboardData[activeTab].features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm"
                >
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Module - Detailed Features */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Student Module Features
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive tools for students to discover and apply for jobs
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <ImageWithPreview 
              src="3.student-dashboard.png" 
              alt="Student Dashboard Interface" 
              className="lg:col-span-2" 
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Job Discovery',
                desc: 'Advanced search with filters (location, type, salary range)',
                color: 'purple'
              },
              {
                icon: Target,
                title: 'One-Click Apply',
                desc: 'Quick application with saved resume and profile',
                color: 'cyan'
              },
              {
                icon: TrendingUp,
                title: 'Application Tracking',
                desc: 'Real-time status updates (Pending, Accepted, Rejected)',
                color: 'pink'
              },
              {
                icon: FileText,
                title: 'Profile Management',
                desc: 'Resume builder and document upload system',
                color: 'green'
              },
              {
                icon: Briefcase,
                title: 'Job Bookmarks',
                desc: 'Save interesting opportunities for later',
                color: 'purple'
              },
              {
                icon: MessageSquare,
                title: 'Notifications',
                desc: 'Email and in-app alerts for application updates',
                color: 'cyan'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border border-${feature.color}-500/30 bg-gradient-to-br from-${feature.color}-500/10 to-transparent backdrop-blur-sm hover:border-${feature.color}-400/50 transition-all`}
              >
                <feature.icon className={`w-10 h-10 text-${feature.color}-400 mb-4`} />
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-5xl mx-auto">
            <h3 className="text-2xl text-center text-purple-300 mb-8">Application Submission Flow</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {['Browse Jobs', 'Select Position', 'Review Details', 'Submit Application'].map((step, i) => (
                <div key={i} className="relative">
                  <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm text-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-300">{i + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-purple-500/50 transform -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Module - Detailed Features */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Recruiter Module Features
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Powerful tools for recruiters to manage hiring processes
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <ImageWithPreview 
              src="7.recuriterhomepage.png" 
              alt="Recruiter Dashboard Screenshot" 
            />
            <ImageWithPreview 
              src="5.mange-job-postings.png" 
              alt="Application Review Interface" 
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Job Posting',
                desc: 'Easy-to-use job creation form with rich details',
                color: 'purple'
              },
              {
                icon: Users,
                title: 'Applicant Management',
                desc: 'View and filter applications by status and skills',
                color: 'cyan'
              },
              {
                icon: FileText,
                title: 'Resume Viewer',
                desc: 'Integrated document viewing and download',
                color: 'pink'
              },
              {
                icon: CheckCircle,
                title: 'Status Updates',
                desc: 'Accept/Reject/Shortlist workflow management',
                color: 'green'
              },
              {
                icon: BarChart3,
                title: 'Analytics',
                desc: 'Application statistics and insights dashboard',
                color: 'purple'
              },
              {
                icon: MessageSquare,
                title: 'Company Profile',
                desc: 'Showcase organization and build employer brand',
                color: 'cyan'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border border-${feature.color}-500/30 bg-gradient-to-br from-${feature.color}-500/10 to-transparent backdrop-blur-sm hover:border-${feature.color}-400/50 transition-all`}
              >
                <feature.icon className={`w-10 h-10 text-${feature.color}-400 mb-4`} />
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Design Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Database Design
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Robust relational database schema with JPA/Hibernate
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <h3 className="text-2xl text-purple-300 mb-6">Key Entities</h3>
              <ul className="space-y-4">
                {[
                  'Users (Student, Recruiter, Admin roles)',
                  'Jobs (postings with details and requirements)',
                  'Applications (linking students and jobs)',
                  'Resumes (file management and metadata)',
                  'Messages (communication system)',
                  'Notifications (alerts and updates)'
                ].map((entity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{entity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <h3 className="text-2xl text-cyan-300 mb-6">Relationships</h3>
              <ul className="space-y-4">
                {[
                  'One-to-Many: User → Applications',
                  'Many-to-One: Application → Job',
                  'One-to-One: User → Resume',
                  'One-to-Many: User → Messages',
                  'Many-to-One: Job → Recruiter',
                  'One-to-Many: User → Notifications'
                ].map((rel, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{rel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Frontend Flow Architecture */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl text-center mb-4 text-gradient-purple-cyan">
              Frontend Flow Architecture
            </h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Request flow from frontend to database with JWT token authentication
            </p>
            <FrontendFlowDiagram />
          </div>

          {/* Backend Flow Architecture */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl text-center mb-4 text-gradient-purple-cyan">
              Backend Flow Architecture
            </h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Complete Spring Boot request lifecycle from HTTP request to MySQL database
            </p>
            <BackendFlowDiagram />
          </div>

          {/* Authentication & Data Retrieval Flows */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl text-center mb-4 text-gradient-purple-cyan">
              API Flow Examples
            </h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Authentication and data retrieval request flows
            </p>
            <AuthFlowDiagram />
          </div>
          
          {/* Database Flow Architecture */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl text-center mb-4 text-gradient-purple-cyan">
              Database Flow Architecture
            </h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Complete request lifecycle from frontend to database
            </p>
            <DatabaseFlowDiagram />
          </div>
        </div>
      </section>

      {/* Security & Performance - Enhanced */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Security & Performance
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Enterprise-grade security and optimized performance
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-3xl text-purple-300 mb-8">Security Features</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Lock,
                    title: 'JWT Authentication',
                    desc: 'Token-based stateless authentication for secure API access'
                  },
                  {
                    icon: Shield,
                    title: 'Password Encryption',
                    desc: 'BCrypt hashing for secure password storage'
                  },
                  {
                    icon: CheckCircle,
                    title: 'CORS Protection',
                    desc: 'Cross-Origin Resource Sharing configuration'
                  },
                  {
                    icon: Lock,
                    title: 'Input Validation',
                    desc: 'Server-side validation and sanitization'
                  },
                  {
                    icon: Shield,
                    title: 'Role-Based Access',
                    desc: 'RBAC with Spring Security for authorization'
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm">
                    <feature.icon className="w-8 h-8 text-purple-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl text-cyan-300 mb-8">Performance Optimizations</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: 'React Query Caching',
                    desc: 'Client-side data caching for faster load times'
                  },
                  {
                    icon: Target,
                    title: 'Lazy Loading',
                    desc: 'Code splitting for optimized bundle sizes'
                  },
                  {
                    icon: Database,
                    title: 'Database Indexing',
                    desc: 'Optimized queries with proper indexing'
                  },
                  {
                    icon: Server,
                    title: 'Docker Containers',
                    desc: 'Containerization for scalability and portability'
                  },
                  {
                    icon: Zap,
                    title: 'API Optimization',
                    desc: 'RESTful best practices with pagination'
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
                    <feature.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="features-section relative py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center feature-card">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-8 h-8 text-purple-400" />
                <h3 className="text-4xl text-gradient-purple-cyan">Job Discovery</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Advanced search filters help students find opportunities that match their skills, location preferences, and salary expectations.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Filter by location and remote options
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Salary range specification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Job type categorization
                </li>
              </ul>
            </div>
            <ImageWithPreview 
              src="1.homepage.png" 
              alt="Job Search Interface" 
            />
          </div>

          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center feature-card">
            <ImageWithPreview 
              src="3.student-dashboard.png" 
              alt="Quick Apply Feature" 
              className="lg:order-1" 
            />
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-cyan-400" />
                <h3 className="text-4xl text-gradient-purple-cyan">One-Click Apply</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Students can apply to multiple positions quickly using their saved resume and profile information.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Save and reuse application data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Track application status
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Get instant confirmation
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center feature-card">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-pink-400" />
                <h3 className="text-4xl text-gradient-purple-cyan">Recruiter Hub</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Comprehensive tools for recruiters to manage job postings, review applications, and track hiring metrics.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Accept or reject applications
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Real-time analytics dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Candidate communication tools
                </li>
              </ul>
            </div>
            <ImageWithPreview 
              src="6.manage-jobs.png" 
              alt="Recruiter Analytics" 
            />
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="tech-highlights-section relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Technical Excellence
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Built with industry best practices and cutting-edge technologies
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="tech-highlight-card p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm hover:border-purple-400/50 transition-all">
              <Lock className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl text-white mb-2">Security</h3>
              <p className="text-gray-400 text-sm">JWT Authentication, BCrypt encryption, and CORS configuration</p>
            </div>

            <div className="tech-highlight-card p-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm hover:border-cyan-400/50 transition-all">
              <Zap className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl text-white mb-2">Performance</h3>
              <p className="text-gray-400 text-sm">React Query caching, lazy loading, and optimized API calls</p>
            </div>

            <div className="tech-highlight-card p-6 rounded-xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-sm hover:border-pink-400/50 transition-all">
              <Database className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl text-white mb-2">Database</h3>
              <p className="text-gray-400 text-sm">Relational schema with One-to-Many and Many-to-One relationships</p>
            </div>

            <div className="tech-highlight-card p-6 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent backdrop-blur-sm hover:border-green-400/50 transition-all">
              <Server className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl text-white mb-2">Deployment</h3>
              <p className="text-gray-400 text-sm">Dockerized containers for scalable, portable deployment</p>
            </div>
          </div>

          {/* Additional Technical Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <h3 className="text-2xl text-purple-300 mb-6 flex items-center gap-3">
                <Component className="w-7 h-7" />
                Frontend Architecture
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Component-Based Design</strong>
                    <p className="text-sm text-gray-400 mt-1">Reusable React components with TypeScript for type safety</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">State Management</strong>
                    <p className="text-sm text-gray-400 mt-1">TanStack Query for server state and React hooks for local state</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Responsive Design</strong>
                    <p className="text-sm text-gray-400 mt-1">Mobile-first approach with Tailwind CSS utility classes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Form Handling</strong>
                    <p className="text-sm text-gray-400 mt-1">React Hook Form with Zod validation for robust form management</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <h3 className="text-2xl text-cyan-300 mb-6 flex items-center gap-3">
                <Server className="w-7 h-7" />
                Backend Architecture
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Layered Architecture</strong>
                    <p className="text-sm text-gray-400 mt-1">Controller, Service, Repository pattern for clean separation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">RESTful API Design</strong>
                    <p className="text-sm text-gray-400 mt-1">Standard HTTP methods with proper status codes and endpoints</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Exception Handling</strong>
                    <p className="text-sm text-gray-400 mt-1">Global exception handler with custom error responses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Data Persistence</strong>
                    <p className="text-sm text-gray-400 mt-1">JPA/Hibernate with entity relationships and cascading operations</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Code Quality Section */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl text-center text-gradient-purple-cyan mb-8">Code Quality & Best Practices</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm text-center">
                <Braces className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h4 className="text-white mb-2">Clean Code</h4>
                <p className="text-gray-400 text-sm">Meaningful naming conventions, DRY principles, and SOLID design patterns</p>
              </div>

              <div className="p-6 rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm text-center">
                <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-white mb-2">Error Handling</h4>
                <p className="text-gray-400 text-sm">Comprehensive try-catch blocks, custom exceptions, and user-friendly error messages</p>
              </div>

              <div className="p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm text-center">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-white mb-2">Input Validation</h4>
                <p className="text-gray-400 text-sm">Server-side validation, SQL injection prevention, and XSS protection</p>
              </div>
            </div>
          </div>

          {/* API Documentation Section */}
          <div className="mt-16 max-w-5xl mx-auto p-8 rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
            <h3 className="text-3xl text-blue-300 mb-6 text-center flex items-center justify-center gap-3">
              <FileText className="w-8 h-8" />
              API Standards & Documentation
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white mb-4">Request/Response Format</h4>
                <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20 font-mono text-sm">
                  <div className="text-green-400">// Success Response</div>
                  <div className="text-gray-300">{'{'}</div>
                  <div className="text-gray-300 pl-4">"status": "success",</div>
                  <div className="text-gray-300 pl-4">"data": {'{ ... }'}</div>
                  <div className="text-gray-300">{'}'}</div>
                </div>
              </div>
              <div>
                <h4 className="text-white mb-4">Error Response Format</h4>
                <div className="bg-black/30 p-4 rounded-lg border border-red-500/20 font-mono text-sm">
                  <div className="text-green-400">// Error Response</div>
                  <div className="text-gray-300">{'{'}</div>
                  <div className="text-gray-300 pl-4">"status": "error",</div>
                  <div className="text-gray-300 pl-4">"message": "Error details"</div>
                  <div className="text-gray-300">{'}'}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm">
                Swagger/OpenAPI Documentation
              </span>
              <span className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm">
                Postman Collection Available
              </span>
              <span className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm">
                CORS Configured
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & Demo */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Project Outcomes
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A production-ready platform delivering measurable results
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter target={50} label="API Endpoints" suffix="+" />
            <AnimatedCounter target={3} label="User Roles" suffix="" />
            <AnimatedCounter target={100} label="Responsive Design" suffix="%" />
            <AnimatedCounter target={1} label="Production Ready" suffix="" />
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="roadmap-section relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-4 text-gradient-purple-cyan">
            Future Roadmap
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Continuous innovation and feature expansion
          </p>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform -translate-x-1/2" />

            <div className="space-y-16">
              {[
                { icon: Brain, title: 'AI Job Recommendations', desc: 'Machine learning algorithms to match candidates with ideal positions', side: 'left' },
                { icon: Video, title: 'Video Interview Integration', desc: 'Built-in video conferencing for remote interviews', side: 'right' },
                { icon: Smartphone, title: 'Mobile App', desc: 'React Native applications for iOS and Android', side: 'left' },
                { icon: MessageSquare, title: 'Enhanced Messaging', desc: 'Real-time chat with file sharing and scheduling', side: 'right' }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`timeline-item flex items-center gap-8 ${
                    item.side === 'right' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-1 ${item.side === 'right' ? 'text-left' : 'text-right'}`}>
                    <div className={`inline-block p-6 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm ${
                      item.side === 'right' ? 'text-left' : 'text-right'
                    }`}>
                      <h3 className="text-2xl text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-16 h-16 rounded-full border-2 border-purple-400 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center glow">
                    <item.icon className="w-8 h-8 text-purple-300" />
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-20 px-6 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl mb-4 text-gradient-purple-cyan">
            Conclusion & Q&A
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Thank you for exploring ZidioConnect
          </p>

          {/* Summary Section */}
          <div className="mb-16 p-8 rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
            <h3 className="text-3xl text-purple-300 mb-6">Project Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white mb-1">Successfully Bridges the Gap</h4>
                    <p className="text-gray-400 text-sm">Between students and recruiters with seamless workflow</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white mb-1">Streamlined Hiring Process</h4>
                    <p className="text-gray-400 text-sm">Improved efficiency with automated workflows</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white mb-1">Modern Tech Stack</h4>
                    <p className="text-gray-400 text-sm">Full-stack development with industry-standard frameworks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white mb-1">Real-world Application</h4>
                    <p className="text-gray-400 text-sm">Production-ready development experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-3xl text-cyan-300 mb-8">Project Information</h3>
          
          <div className="flex justify-center items-center gap-8 mb-8">
            <a
              href="https://github.com/infance-tony/zidio-connect"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:border-purple-400 hover:bg-purple-500/20 transition-all"
            >
              <Github className="w-6 h-6 text-purple-300 group-hover:text-purple-200" />
              <span className="text-gray-300 group-hover:text-white">GitHub Repository</span>
            </a>
          </div>

          <div className="mt-16 text-6xl md:text-7xl text-gradient mb-6">
            Thank You!
          </div>
          <p className="text-gray-400 text-xl mb-8">Questions & Answers</p>

          <p className="mt-12 text-gray-500">
            © Presented by Infance Tony
          </p>
        </div>
      </section>
    </div>
  );
}