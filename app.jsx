import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Menu, 
  X, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Terminal, 
  Server, 
  ShieldCheck, 
  Users,
  ExternalLink,
  Github,
  ArrowLeft,
  Globe
} from 'lucide-react';

// Resume Data Moved Outside Component
const personalInfo = {
  name: "Lucas Venturina",
  title: "Instructional Technologist & IT Support Specialist",
  location: "Navajo, NM",
  email: "lushventurina@gmail.com",
  phone: "(505) 582-8229",
  linkedin: "linkedin.com/in/lmventurinajr26",
  summary: "Experienced professional with over 10 years in instructional technology, IT support, and compliance-driven environments. Skilled in troubleshooting, training, systems integration, and workflow optimization. Adept at translating technical concepts for diverse audiences and delivering scalable solutions in academic and enterprise settings. Strong foundation in cybersecurity, cloud platforms, and full-stack development."
};

const experience = [
  {
    id: 1,
    role: "High School Teacher | Technologist | Team Leader",
    company: "Navajo Pine High School",
    location: "Navajo, NM",
    period: "Aug 2016 - Present",
    type: "Full-Time",
    description: [
      "Designed and delivered tech-integrated instruction in STEM and cybersecurity.",
      "Led training for 20+ staff on EdTech tools (Canva, Adobe Express, AI Educational Tools).",
      "Created interactive web-based modules for hybrid learning.",
      "Provided Tier 1 technical support and managed classroom network devices.",
      "Developed secure workflows for instructional software access and reporting.",
      "Ensured compliance with FERPA, ADA, and district privacy protocols.",
      "Collaborated with faculty to improve operational efficiency via instructional design."
    ]
  },
  {
    id: 2,
    role: "Graduate Assistant - Instructional Technology",
    company: "University of Akron",
    location: "Akron, OH",
    period: "Aug 2014 - Aug 2016",
    type: "Part-Time",
    description: [
      "Supported academic events with AV and IT setup, troubleshooting live tech issues.",
      "Deployed and maintained instructional software and digital tools across departments."
    ]
  }
];

const education = [
  {
    id: 1,
    degree: "Master of Education in Instructional Technology",
    school: "University of Akron",
    year: "2016"
  },
  {
    id: 2,
    degree: "Bachelor of Science in Mathematics for Teachers & Certificate in Teaching Physics",
    school: "Philippine Normal University",
    year: "2011"
  }
];

const skills = {
  certifications: [
    "Microsoft IT Support Certificate",
    "NM Level 2 Teaching License",
    "FreeCodeCamp: Responsive Web Design"
  ],
  systems: [
    "Google Admin Console",
    "PowerSchool",
    "Synergy SIS",
    "ClassLink",
    "Clever"
  ],
  tools: [
    "Zoom",
    "Google Workspace",
    "Microsoft Office Suite",
    "Canva",
    "Adobe Express"
  ],
  compliance: [
    "FERPA",
    "ADA",
    "Section 508",
    "Food Safety Protocols"
  ]
};

// Refactored projects to use Icon components instead of Elements
const projects = [
  {
    id: 1,
    title: "EdTech Staff Training Program",
    Icon: Users,
    iconColor: "text-blue-600",
    description: "Led comprehensive training for over 20 staff members on modern educational technology tools including Canva, Adobe Express, and AI Educational Tools, enhancing digital literacy across the institution.",
    tags: ["Training", "EdTech", "Canva", "AI"],
    link: "#",
    type: "Program"
  },
  {
    id: 2,
    title: "Hybrid Learning Modules",
    Icon: Code,
    iconColor: "text-green-600",
    description: "Developed interactive web-based math modules designed for both in-person and remote learning environments, improving student engagement and accessibility.",
    tags: ["Web Dev", "Mathematics", "Hybrid Learning"],
    link: "#",
    type: "Web App"
  },
  {
    id: 3,
    title: "Secure Instructional Workflows",
    Icon: ShieldCheck,
    iconColor: "text-purple-600",
    description: "Designed and maintained secure workflows for instructional technology access and reporting, ensuring data privacy and operational efficiency.",
    tags: ["Cybersecurity", "Workflow", "Data Privacy"],
    link: "#",
    type: "Infrastructure"
  },
  {
    id: 4,
    title: "ePortfolio Application",
    Icon: Globe,
    iconColor: "text-indigo-600",
    description: "A responsive single-page application built with React and Tailwind CSS to showcase professional experience and projects.",
    tags: ["React", "Tailwind CSS", "SPA"],
    link: "#",
    type: "Web App"
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'projects'

  // Scroll Animation Observer - Consolidates logic to fix ReferenceError
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Timeout allows DOM to update when switching pages
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentPage]); // Re-run when page changes

  // Scroll handler for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'home') return;
      
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToSection = (id) => {
    // Handle Navigation to Projects Page
    if (id === 'all-projects') {
      setCurrentPage('projects');
      setActiveSection('projects-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    // Handle Navigation back to Home Sections
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Small delay to allow DOM to update
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, label }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`text-sm font-medium transition-colors hover:text-blue-600 ${
        (activeSection === to && currentPage === 'home') || (to === 'all-projects' && currentPage === 'projects') 
          ? 'text-blue-600 font-bold' 
          : 'text-slate-600'
      }`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ to, label }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`block w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-colors ${
         (activeSection === to && currentPage === 'home') || (to === 'all-projects' && currentPage === 'projects')
          ? 'border-blue-600 text-blue-600 bg-blue-50' 
          : 'border-transparent text-slate-600 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );

  const ProjectsPage = () => (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 animate-on-scroll">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Project Archive</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            A comprehensive collection of my work in instructional technology, web development, and secure workflow systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col h-full animate-on-scroll delay-${(index % 3 + 1) * 100}`}>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-slate-50 rounded-lg ${project.iconColor}`}>
                      <project.Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{project.title}</h3>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded whitespace-nowrap ml-2 shrink-0">
                    {project.type}
                  </span>
                </div>
                
                <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
                  <a href={project.link} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                    <ExternalLink size={16} /> View Project
                  </a>
                  {/* Optional GitHub Link if applicable */}
                  {project.type === 'Web App' && (
                    <button className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                      <Github size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Animation Styles */}
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Stagger delays for better effect */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
              <span className="font-bold text-lg tracking-tight">Lucas Venturina</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <NavLink to="home" label="Home" />
              <NavLink to="about" label="About" />
              <NavLink to="experience" label="Experience" />
              {/* Note: Projects links to the new dedicated page via logic in scrollToSection */}
              <NavLink to="all-projects" label="Projects" />
              <NavLink to="skills" label="Skills" />
              <NavLink to="education" label="Education" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white shadow-lg absolute w-full">
            <div className="py-2 space-y-1">
              <MobileNavLink to="home" label="Home" />
              <MobileNavLink to="about" label="About" />
              <MobileNavLink to="experience" label="Experience" />
              <MobileNavLink to="all-projects" label="Projects" />
              <MobileNavLink to="skills" label="Skills" />
              <MobileNavLink to="education" label="Education" />
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <section id="home" className="relative bg-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
                <div className="text-center max-w-3xl mx-auto animate-on-scroll">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                    Hi, I'm <span className="text-blue-600">{personalInfo.name}</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light">
                    {personalInfo.title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-10">
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <Mail size={16} /> {personalInfo.email}
                    </a>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="flex items-center gap-2">
                      <Phone size={16} /> {personalInfo.phone}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} /> {personalInfo.location}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                      Contact Me
                    </button>
                    <button 
                      onClick={() => scrollToSection('experience')}
                      className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      View Experience
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 animate-on-scroll">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                      <Users size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Professional Summary</h2>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-12 animate-on-scroll">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Professional Experience</h2>
                </div>
                
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {experience.map((job, index) => (
                    <div key={job.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-on-scroll">
                      
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Briefcase size={16} className="text-white" />
                      </div>

                      {/* Content Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <h3 className="font-bold text-xl text-slate-900">{job.role}</h3>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            {job.period}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-slate-500 mb-4 gap-2 sm:gap-4">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <Terminal size={14} /> {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {job.location}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {job.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-slate-600">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section Highlight (Summary) */}
            <section id="projects" className="py-20 bg-slate-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12 animate-on-scroll">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                      <Award size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Key Projects</h2>
                  </div>
                  <button 
                    onClick={() => scrollToSection('all-projects')}
                    className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    View Project Archive <ExternalLink size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {projects.slice(0, 3).map((project, index) => (
                    <div key={project.id} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col animate-on-scroll delay-${(index + 1) * 100}`}>
                      <div className="p-8 flex-grow">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-slate-50 rounded-full flex items-center justify-center">
                            <project.Icon className={`w-8 h-8 ${project.iconColor}`} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
                        <span className="text-sm font-semibold text-blue-600">Achievement Highlight</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center md:hidden animate-on-scroll">
                  <button 
                    onClick={() => scrollToSection('all-projects')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    View All Projects <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-12 animate-on-scroll">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Code size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Technical Skills & Certifications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Systems */}
                  <div className="space-y-4 animate-on-scroll delay-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Server size={18} className="text-emerald-500" />
                      Systems
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.systems.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="space-y-4 animate-on-scroll delay-200">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Terminal size={18} className="text-blue-500" />
                      Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Compliance */}
                  <div className="space-y-4 animate-on-scroll delay-300">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-purple-500" />
                      Compliance
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.compliance.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-4 animate-on-scroll delay-300">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Award size={18} className="text-amber-500" />
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {skills.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-20 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-12 animate-on-scroll">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Education</h2>
                </div>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={edu.id} className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-on-scroll delay-${(index + 1) * 100}`}>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-slate-600">{edu.school}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-semibold bg-rose-50 text-rose-700">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-900 text-white py-12">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Mail size={20} />
                    {personalInfo.email}
                  </a>
                  <a href={`tel:${personalInfo.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Phone size={20} />
                    {personalInfo.phone}
                  </a>
                  <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                    LinkedIn Profile
                  </a>
                </div>
                <div className="pt-8 border-t border-slate-800 text-slate-500 text-sm">
                  <p>&copy; {new Date().getFullYear()} Lucas Venturina. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <ProjectsPage />
        )}

      </main>
    </div>
  );
};

export default App;
