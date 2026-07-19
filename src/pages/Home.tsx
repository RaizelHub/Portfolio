import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2,
  Send, Code, Layers, ShieldCheck, HeartHandshake, Sparkles, Github
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { SkillCard } from '../components/ui/SkillCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { services } from '../data/services';
import { experiences } from '../data/experience';
import { certifications } from '../data/certifications';

export const Home = () => {
  // --- Typewriter State ---
  const roles = [
    'Full Stack Developer',
    'Laravel Specialist',
    'MERN Stack Developer',
    'Virtual Assistant',
    'Available for Hire'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(() => { }, 200);
          return;
        }
      }
      timer = setTimeout(handleType, isDeleting ? 40 : 80);
    };

    timer = setTimeout(handleType, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // --- Stats Counter State ---
  const statsList = [
    { label: 'Completed Projects', target: projects.length, suffix: '+' },
    { label: 'Technologies Used', target: 18, suffix: '+' },
    { label: 'Repositories', target: projects.length, suffix: '+' },
    { label: 'Certificates', target: 2, suffix: '+' }
  ];

  // --- Project Filtering State ---
  const [activeFilter, setActiveFilter] = useState('All');
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const filters = ['All', 'Web', 'SaaS', 'IoT', 'Mobile', 'AI', 'Desktop'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  // --- Contact Form State ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Set success status immediately to indicate parsing and launch
    setFormStatus('success');

    // Open email client with template pre-filled synchronously to prevent browser blocking
    const subject = encodeURIComponent(`Inquiry from ${formData.name}: ${formData.service}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService Requested: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:janmarkking@gmail.com?subject=${subject}&body=${body}`;

    // Reset form
    setFormData({ name: '', email: '', service: 'Web Development', message: '' });

    // Revert success message after 5 seconds
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  // --- Smooth Scroll helper ---
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative min-h-screen pt-28 flex items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-950/20 via-navy-900 to-navy-950 overflow-hidden">
        {/* Glow backdrop grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Availability strip */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 select-none">
                Available for Remote &amp; Onsite Work
              </span>
            </div>

            {/* Typography Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                I build digital systems <br />
                <span className="text-emerald-400">that solve real problems.</span>
              </h1>

              {/* Typewriter role */}
              <div className="h-8 flex items-center">
                <span className="text-lg sm:text-xl font-mono text-slate-300 font-semibold cursor-blink">
                  {currentText}
                </span>
              </div>
            </div>

            {/* Supporting description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              I design and develop reliable web applications, SaaS platforms, APIs, database systems, and IoT-powered solutions. I also help businesses stay organized through reliable virtual assistance, data entry, research, and email support.
            </p>

            {/* Metas */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Bukidnon, Philippines
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> 11:00 AM – 12:00 AM PHT
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Let's Work Together
              </Button>
            </div>
          </div>

          {/* Right Visual Panel (Interactive Goober/Profile Image) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-navy-800 shadow-2xl cursor-pointer ring-1 ring-white/10 hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-500"
            >
              <img
                src="/img/goober.jpg"
                alt="Janmark M. Suelto (Goober)"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isProfileHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
              />
              <img
                src="/img/Profile.jpg"
                alt="Janmark M. Suelto (Profile)"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isProfileHovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
              />
            </motion.div>

            {/* Hover Helper Reminder */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 animate-pulse select-none mt-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hover over the image to reveal my profile!</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-navy-950/40 border border-navy-800 p-8 rounded-xl shadow-lg">
          {statsList.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white block">
                {stat.target}
                <span className="text-emerald-400">{stat.suffix}</span>
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium block mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="01 / About Me"
          title="More than just writing code. I build solutions."
          subtitle="BSIT Graduate · CCNA Certified · Concentrix Intern. Ready to deliver real results."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
          {/* Left bio write-up */}
          <div className="lg:col-span-7 space-y-6 text-slate-400 text-sm sm:text-base leading-relaxed">
            <p>
              I'm <strong className="text-white">Janmark Suelto</strong>, a Full Stack Web Developer and Virtual Assistant from Bukidnon, Philippines. I enjoy building practical software that solves real-world problems. My experience includes developing web applications, multi-tenant platforms, POS systems, IoT monitoring solutions, desktop applications, APIs, and database-driven systems.
            </p>
            <p>
              What sets me apart is my <strong className="text-white">CCNA Certification</strong>, meaning I plan for secure database setups, API access locks, and clean server routes from day one. I think about networking segmentation, security, and infrastructure as fundamental components rather than afterthoughts.
            </p>
            <p>
              I also have hands-on experience in IT operations, technical support, asset inventory, workstation monitoring, enterprise system maintenance, and remote collaboration, honed during my On-the-Job Training with Concentrix.
            </p>

            {/* Quick checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm">
              {[
                'Full Stack Web Development',
                'REST API & Database Design',
                'Data Entry & Virtual Assistance',
                'Email Support & Client Comms',
                'Part-time & Project Commission',
                'CCNA-Grade Security Mindset'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right quick strengths card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-800/30 border border-navy-700/60 p-6 rounded-lg">
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">What sets me apart</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                Most developers stop at the application layer. I understand OSPF routing, VLAN segmentation, MQTT brokers, sensor fusion, and multi-tenant isolation, giving me a much wider and deeper view of the entire system architecture from physical sensors to cloud deployments.
              </p>

              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-bold">
                Core Strengths
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Problem Solver',
                  'Clean Code Writer',
                  'Fast Learner',
                  'Remote-Ready',
                  'Security-Minded',
                  'Reliable Communicator'
                ].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-navy-900 text-slate-300 border border-navy-800 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Activity */}
        <div className="mt-16">
          <div className="bg-navy-950 border border-navy-800 rounded-lg overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-emerald-500/30 hover:shadow-emerald-500/5">
            {/* Top Window bar */}
            <div className="px-4 py-3 bg-navy-900 border-b border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                <Github className="w-3.5 h-3.5 text-emerald-500" /> github-contributions.sh
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8 flex flex-col items-center">
              <div className="w-full text-center lg:text-left mb-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center lg:justify-start gap-2">
                  <Github className="w-5 h-5 text-emerald-400" /> Open Source Activity
                </h3>
                <p className="text-xs text-slate-400">
                  Tracking my recent development updates and repository activity on GitHub.
                </p>
              </div>

              {/* Scrollable container for the contribution graph */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-navy-800 scrollbar-track-transparent">
                <div className="min-w-[720px] max-w-4xl mx-auto py-2">
                  <img
                    src="https://ghchart.rshah.org/10b981/RaizelHub"
                    alt="RaizelHub GitHub Contributions"
                    className="w-full h-auto select-none contrast-[1.1] brightness-[1.05]"
                  />
                </div>
              </div>

              {/* Bottom stats link */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full border-t border-navy-800/60 pt-4 text-xs font-mono text-slate-500 gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync via GitHub Chart API
                </span>
                <a
                  href="https://github.com/RaizelHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-navy-900 border border-navy-800 rounded-md text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-navy-850 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span>Visit GitHub Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="02 / Technical Skills"
          title="My Toolkit &amp; Competencies"
          subtitle="A categorized listing of the programming languages, frameworks, protocols, and tools I use."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="03 / Services"
          title="What I can build for you"
          subtitle="End-to-end development services, business administration support, and server operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="04 / Portolio Showcase"
          title="Featured Work &amp; Case Studies"
          subtitle="Production-quality software systems ranging from multi-tenant SaaS backends to custom physical IoT solutions."
        />

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-navy-800 pb-6 mb-8 text-xs sm:text-sm">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md font-mono transition-all duration-200 select-none ${activeFilter === filter
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                : 'text-slate-400 hover:text-white border border-transparent'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= EXPERIENCE & EDUCATION ================= */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="05 / Timeline"
          title="Professional Journey"
          subtitle="A timeline detailing my college degree education and IT industry training background."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
          {/* Left: Concentrix Internship */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-navy-800 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 block shrink-0" />
              IT Operations Internship
            </h3>

            {experiences.map((exp) => (
              <div key={exp.id} className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="font-bold text-white text-base">{exp.company}</h4>
                  <span className="text-xs font-semibold text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 w-fit">
                    {exp.period}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {exp.location}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-4">{exp.role}</div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">{exp.description}</p>

                <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2.5">
                  Core Responsibilities
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">&#8211;</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Education Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-navy-800 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 block shrink-0" />
              Education
            </h3>

            <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h4 className="font-bold text-white text-base">Bukidnon State University</h4>
                <span className="text-xs font-semibold text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 w-fit">
                  Graduated
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400 mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Bukidnon, Philippines
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-2">
                Bachelor of Science in Information Technology
              </p>

              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mt-4 mb-2.5">
                Highlights
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Capstone Project: Smartpipe IoT System</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>CCNA Course Trainings Complete</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS SECTION ================= */}
      <section id="certifications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="06 / Certifications"
          title="Professional Certifications"
          subtitle="Specialized training validations and networking technology certs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-navy-800/20 border border-navy-700/50 p-6 rounded-lg flex flex-col justify-between text-left group hover:border-emerald-500/20 transition-all duration-300">
              <span className="text-2xl font-black text-emerald-400 block mb-2 select-none group-hover:text-emerald-300">
                {cert.abbreviation}
              </span>
              <div>
                <span className="text-sm font-bold text-white block mb-1">
                  {cert.name}
                </span>
                <span className="text-xs text-slate-400">
                  {cert.issuer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY HIRE ME SECTION ================= */}
      <section id="why-work-with-me" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="07 / Why Me"
          title="Why Work With Me"
          subtitle="What I bring to your projects beyond basic application code."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: 'Laravel & PHP Expertise',
              desc: 'Deep capabilities in Laravel routing models, database migrations, controllers, middleware validation, and multi-tenant separations.',
              icon: <Code className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'MERN Stack Proficiency',
              desc: 'Proficient building Javascript applications using React frontend, Node/Express server APIs, and unstructured MongoDB databases.',
              icon: <Layers className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'CCNA Security Mindset',
              desc: 'Certified enterprise networking knowledge means I secure APIs, database tables, and routes from day one, not as an afterthought.',
              icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'Problem Solving & Clean Code',
              desc: 'I write well-documented, clean, refactor-friendly code with clear variables so your team can maintain it easily.',
              icon: <Sparkles className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'Timezone-Flexible Communication',
              desc: 'Available between 11:00 AM and 12:00 PM PHT. I coordinate remotely and respond to emails or messages within 24 hours.',
              icon: <Clock className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'Full Stack + Virtual Assistance',
              desc: 'I can design databases, build APIs, code web dashboards, and manage operational emails/data organization simultaneously.',
              icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />
            }
          ].map((item) => (
            <div key={item.title} className="bg-navy-800/30 border border-navy-700/50 p-6 rounded-lg text-left">
              <div className="p-2 bg-navy-900 border border-navy-800/50 rounded-md w-fit mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-white text-base mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <SectionHeading
          tag="08 / Contact"
          title="Ready to start? Let's talk."
          subtitle="Whether you need a developer, a virtual assistant, or both — I'm available and I respond within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

          {/* Left panel: Info + WhatsApp QR */}
          <div className="lg:col-span-4 space-y-6">
            {/* Info card */}
            <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono block">Email</span>
                  <a href="mailto:janmarkking@gmail.com" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    janmarkking@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono block">Phone / WhatsApp</span>
                  <a href="tel:+639690221571" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    0969 022 1571
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono block">Location</span>
                  <span className="text-sm font-bold text-white">
                    Bukidnon, PH (Remote &amp; Onsite OK)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-mono block">Available Hours</span>
                  <span className="text-sm font-bold text-white">
                    11:00 AM – 12:00 AM PHT
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp QR scanner */}
            <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Scan to Chat
                </span>
              </div>

              <a
                href="https://wa.me/qr/YHP7U5VEMH5IP1"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-44 h-44 bg-white p-2.5 rounded-lg overflow-hidden border-2 border-emerald-500/20 group cursor-pointer"
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/qr/YHP7U5VEMH5IP1&bgcolor=ffffff&color=059669&qzone=2&format=png"
                  alt="WhatsApp Chat QR"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-emerald-600/90 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-semibold text-sm">Open WhatsApp</span>
                  <span className="text-[10px] text-emerald-200">wa.me/639690221571</span>
                </div>
              </a>
              <span className="text-[11px] text-slate-500 font-mono mt-3 select-none">
                Or tap to launch chat directly
              </span>
            </div>
          </div>

          {/* Right form submission panel */}
          <div className="lg:col-span-8 bg-navy-800/10 border border-navy-700/40 p-6 sm:p-8 rounded-lg relative">
            <h3 className="font-bold text-white text-lg mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Use the form below to outline your requirements. On submission, **your native email client will launch** with the details filled in to complete sending.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-xs font-semibold text-slate-400 font-mono block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.name ? 'border-rose-500' : 'border-navy-700'
                      }`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-rose-400 font-semibold block mt-1">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-slate-400 font-mono block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email address"
                    className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.email ? 'border-rose-500' : 'border-navy-700'
                      }`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-rose-400 font-semibold block mt-1">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Service Select */}
              <div>
                <label htmlFor="service" className="text-xs font-semibold text-slate-400 font-mono block mb-1">
                  Service Area
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  className="w-full bg-navy-950 border border-navy-700 text-slate-300 rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option>Web Development</option>
                  <option>Database Development</option>
                  <option>API Development</option>
                  <option>Multi-Tenant SaaS Solutions</option>
                  <option>Data Entry &amp; Organization</option>
                  <option>Virtual Assistance &amp; Email Support</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-xs font-semibold text-slate-400 font-mono block mb-1">
                  Project Brief / Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Outline what you are building, the estimated timeframe, or VA tasks..."
                  className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.message ? 'border-rose-500' : 'border-navy-700'
                    }`}
                />
                {formErrors.message && (
                  <span className="text-[10px] text-rose-400 font-semibold block mt-1">
                    {formErrors.message}
                  </span>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={formStatus === 'loading'}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Send Inquiry
                </Button>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Inquiry parsed! Launching email application...
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
