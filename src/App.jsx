import React, { useState, useEffect, useRef } from 'react';
import { Menu, X,FileText, Github, Linkedin, Mail, MessageSquare, ExternalLink, ChevronDown, Filter, Search, Code, Smartphone, Brain, Globe, XCircle, Calendar, Briefcase , Sparkles , LayoutGrid  } from 'lucide-react';
import profile from "../public/profile_pic_new.jpg"; 
import csd from "../public/projects/CSD.png";
import marketplace from "../public/projects/marketplace.png";
import tax from "../public/projects/taxowealth.png";
import lusora from "../public/projects/lusora.png";
import syncpath from "../public/projects/syncpath.png";
import wellnessherb from "../public/projects/wellness_herb.png";
import sgb from "../public/projects/sgbindustries.png";
import avocsas from "../public/projects/avocsas.png";
import ecogrocer from "../public/projects/OrganicFoods.png";
import pet from "../public/projects/pet.png";
import pulse from "../public/projects/pulse.png";
import resume from "../public/Vaibhav_Chaudhary_Resume.pdf";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (observerRef.current && el.id) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (menuOpen || selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen, selectedProject]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  // Reset visible projects when filter or search changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [filterCategory, searchTerm]);

  const allProjects = [
  {
    id: 1,
    title: "Pulse",
    category: "web",
    description: "Cloud-based team communication & email campaign platform",
    fullDescription:
      "Cloud-based communication platform for team and email campaigns with custom templates, SSO authentication, and real-time analytics. Built using Node.js, React, and MongoDB. Integrated an AI-powered chatbot using a RAG (Retrieval-Augmented Generation) approach to deliver intelligent, context-aware responses and enhance user engagement.",
    tech: ["Node.js", "Nextjs", "MongoDB", "RAG", "Socket.io", "SSO"],
    image: pulse,
    demoLink: "https://pulse.formidium.com",
    githubLink: "",
    featured: true,
    date: "2025"
  },
  {
    id: 2,
    title: "CommonSubDoc",
    category: "web",
    description: "Investor onboarding and compliance automation platform",
    fullDescription:
      "CommonSubDoc is an advanced investor relations and compliance automation platform. It streamlines onboarding, KYC/AML verification, document workflows, and real-time reporting. Built intuitive dashboards, secure API integrations, automated compliance pipelines, and digital approvals to enhance transparency and operational efficiency.",
    tech: ["Node.js", "MongoDB", "EJS", "Tailwind CSS", "Shufti Pro", "AWS"],
    image: csd,
    demoLink: "https://commonsubdoc.com/",
    githubLink: "",
    featured: true,
    date: "2024"
  },
  {
    id: 3,
    title: "AltsMarketplace",
    category: "web",
    description: "Alternative investment marketplace for investors and fund managers",
    fullDescription:
      "A next-generation investment marketplace connecting investors, fund managers, and service providers. Includes secure document exchange, deal flow automation, analytics dashboards, user roles, and real-time insights. Developed robust APIs, scalable backend architecture, and modern UI components.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "AWS"],
    image: marketplace,
    demoLink: "https://altsmarketplace.com/",
    githubLink: "",
    featured: true,
    date: "2023"
  },
  {
    id: 4,
    title: "Tax O Wealth",
    category: "web",
    description: "Fintech wealth advisory and tax planning platform",
    fullDescription:
      "A complete fintech advisory platform providing investment guidance, tax planning, insurance, and mutual fund management. Integrated AI-powered chatbot features, portfolio tracking tools, client dashboards, custom workflows, and secure payment gateway integrations.",
    tech: ["React.js", "Node.js", "MongoDB", "Chatbot Integration", "Payment Gateway"],
    image: tax,
    demoLink: "https://taxowealth.com/",
    githubLink: "",
    featured: true,
    date: "2024"
  },
  {
    id: 5,
    title: "PetExportVet",
    category: "wix",
    description: "Veterinary & pet export website (Wix)",
    fullDescription:
      "A marketing and informational website built on Wix for pet export and veterinary services. Designed with Wix's editor to provide clear service pages, contact flows, and basic SEO for lead generation.",
    tech: ["Wix"],
    image: pet,
    demoLink: "https://www.petexportvet.com/",
    githubLink: "",
    featured: false,
    date: "2025"
  },
  {
    id: 6,
    title: "Lusora",
    category: "website",
    description: "Luxury mineral water brand website with modern UI/UX",
    fullDescription:
      "Designed a premium digital identity for Lusora, a luxury mineral water brand. Built a smooth, mobile-friendly React/Next.js interface with WhatsApp messaging automation, email workflows, Google Maps integration, and a high-end luxury UI experience.",
    tech: ["React.js", "Next.js", "Email Integration", "WhatsApp API", "Google Maps API"],
    image: lusora,
    demoLink: "https://lusora.in/",
    githubLink: "",
    featured: false,
    date: "2024"
  },
  {
    id: 7,
    title: "Wellness Herb",
    category: "website",
    description: "Herbal wellness store with payments & appointment booking",
    fullDescription:
      "An online wellness platform offering herbal products with seamless booking and payment experience. Integrated Calendly for scheduling, Razorpay/PayPal payment flows, dynamic product listings, interactive popups, and user-friendly checkout design.",
    tech: ["React.js", "Node.js", "MongoDB", "Payment Integration", "Calendly API"],
    image: wellnessherb,
    demoLink: "https://wellnessherb.in/",
    githubLink: "",
    featured: false,
    date: "2024"
  },
  {
    id: 8,
    title: "SGB Industries",
    category: "website",
    description: "Single-page product catalog for a food manufacturing company",
    fullDescription:
      "Built a clean and responsive single-page React website for SGB Industries, showcasing their product catalog including rice, wheat, pulses, oils, and besan products. Focused on SEO, mobile optimization, and smooth section-based navigation.",
    tech: ["React.js"],
    image: sgb,
    demoLink: "https://sgbindustries.netlify.app/",
    githubLink: "",
    featured: false,
    date: "2023"
  },
  {
    id: 9,
    title: "Avocsas",
    category: "website",
    description: "Salesforce security and compliance tracking platform",
    fullDescription:
      "Developed a Salesforce-powered security and compliance management platform featuring Shield integration, risk assessments, access audits, and automated compliance workflows. Improved enterprise security visibility and audit readiness.",
    tech: ["React.js", "Salesforce Integration"],
    image: avocsas,
    demoLink: "https://avocsas.in/",
    githubLink: "",
    featured: false,
    date: "2023"
  },
  {
    id: 10,
    title: "Ecogrocer",
    category: "web",
    description: "Organic grocery e-commerce demo platform",
    fullDescription:
      "A modern, mobile-first organic food e-commerce platform with dynamic product listings, cart management, payment integration, and smooth checkout flow. Built scalable APIs, reusable UI components, and optimized routing.",
    tech: ["React.js", "Node.js", "MongoDB", "Payment Integration"],
    image: ecogrocer,
    demoLink: "https://ecogrocer.netlify.app/",
    githubLink: "",
    featured: false,
    date: "2023"
  },
  {
    id: 11,
    title: "SyncPath Consulting",
    category: "website",
    description: "Salesforce consulting and automation platform",
    fullDescription:
      "Developed a digital presence for SyncPath Consulting, a Salesforce solution provider. Implemented service pages, Salesforce API integration, automation workflows, dynamic content management, and optimized UI components for enterprise consulting needs.",
    tech: ["React.js", "Node.js", "Salesforce API"],
    image: syncpath,
    demoLink: "http://syncpath.in/",
    githubLink: "",
    featured: false,
    date: "2024"
  },
  
];

  const experiences = [
    {
      role: "Senior Software Engineer",
      company: "Wipro Ltd. (Client: Meta)",
      period: "Dec 2025 - Present",
      location: "Bengaluru - Hybrid",
      description: "Currently working as a Full Stack Software Engineer at Meta through Wipro. Involved in developing and maintaining web application features, collaborating with cross-functional teams, and working with modern full-stack technologies in a large-scale production environment.",
      achievements: [
        "Assigned to Meta as a Full Stack Engineer (SE-1)",
        "Working on real-world production codebases using React and Hack",
        "Collaborating with engineers, product managers, and QA teams in an enterprise setup",
        "Following Meta engineering standards, code reviews, and best practices"
      ]
    },
    {
      role: "Software Engineer",
      company: "Formidium Technologies",
      period: "June 2022 - Nov 2025",
      location: "Jaipur - Hybrid",
      description: "Lead full-stack development projects using MERN stack, delivering scalable and high-performance web applications. I collaborate closely with teams, mentor junior developers, and ensure smooth, on-time delivery of complex technical projects.",
      achievements: [
        "Reduced infrastructure costs by 40% through optimization",
        "Led and delivered a major project using Node.js, React, and MongoDB, resulting in a 20% increase in user engagement",
        "Developed and implemented RESTful APIs with Node.js and Express, reducing server response time by 25%",
        "Designed and optimized MongoDB schemas for a high-traffic application, improving query performance by 40%",
        "Mentored junior developers, improving team productivity and code quality"
      ]
    },
    {
      role: "Jr. Software Engineer",
      company: "Formidium Technologies",
      period: "Jul 2021 - May 2022",
      location: "Jaipur - Hybrid",
      description: "I worked on full stack development, building web applications with Sails.js and Node.js, and gaining expertise in system architecture, API design, and database management.",
      achievements: [
        "Contributed to the development of scalable web applications using Node.js, Express, React.js, and MongoDB",
        "Participated in API integration and backend logic implementation, enhancing feature delivery timelines",
        "Assisted in building modular and reusable front-end components with React, improving development speed by 15%"
      ]
    },
    {
      role: "Graduate Engineering Trainee",
      company: "Formidium Technologies",
      period: "March 2021 - June 2021",
      location: "Jaipur - Remote",
      description: "Developed client websites and learned full-stack development. Gained hands-on experience in React.js, Node.js, and database management while contributing to real-world projects.",
      achievements: [
        "Gained hands-on experience in React.js for component-based development and state management. ",
        "Performed debugging and cross-browser testing to ensure application consistency",
        "Actively participated in agile ceremonies including daily stand-ups, sprint reviews, and retrospectives."
      ]
    },
    {
      role: "Android App development",
      company: "Rawattech",
      period: "Jan 2021 - March 2021",
      location: "Jaipur - On-site",
      description: "Learned Android app development and built simple applications using React Native",
      achievements: [
        "Android app development through React Native",
      ]
    },
    {
      role: "Technical Analyst",
      company: "Requin solutions Pvt. Ltd",
      period: "Sep 2020 - Dec 2020",
      location: "Jaipur - On-site",
      description: "Java development intern",
      achievements: [
        "Java Development"
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'web', label: 'Web Apps', icon: Code },
    { id: 'website', label: 'Websites', icon: Sparkles },
    { id: 'wix', label: 'Wix', icon: Brain },
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = filteredProjects.length > visibleProjects;

  useEffect(() => {
    displayedProjects.forEach((project) => {
      const elementId = `project-${project.id}`;
      setAnimatedElements((prev) => new Set([...prev, elementId]));
    });
  }, [displayedProjects]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="hidden md:block fixed w-8 h-8 border-2 border-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold tracking-wider">
            <span className="text-yellow-400">VAIBHAV</span>
            <span className="text-white ml-1 sm:ml-2">CHAUDHARY</span>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-yellow-400 hover:text-black transition-colors duration-300 rounded z-50"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-all duration-700 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button 
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-yellow-400 hover:text-black transition-colors duration-300 rounded"
        >
          <X size={24} className="sm:w-7 sm:h-7" />
        </button>

        <div className="h-full flex items-center justify-center px-4">
          <div className="text-center space-y-6 sm:space-y-8">
            {['home', 'about', 'projects', 'experience', 'connect'].map((section, idx) => (
              <div
                key={section}
                className={`transform transition-all duration-700 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <button
                  onClick={() => scrollToSection(section)}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold hover:text-yellow-400 transition-colors duration-300 uppercase tracking-wider"
                >
                  {section}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div 
          className="hidden md:block absolute inset-0 opacity-20 transition-all duration-300"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(250, 204, 21, 0.3) 0%, transparent 50%)`,
          }}
        />
        
        <div className="text-center z-10 px-4 sm:px-6">
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 tracking-wider leading-tight"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <span className="block text-gray-600">CODE</span>
            <span className="block text-yellow-400">DESIGN</span>
            <span className="block text-white">DEPLOY</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 px-4">
            SDE 2 | Full Stack Developer
          </p>
          
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce mt-8 sm:mt-12 hover:text-yellow-400 transition-colors"
          >
            <ChevronDown size={40} className="sm:w-12 sm:h-12" />
          </button>
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-yellow-400"
              style={{
                top: `${i * 6.66}%`,
                left: 0,
                right: 0,
                transform: `translateY(${scrollY * 0.1 * (i % 3)}px)`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
          <div
            id="about-image"
            data-animate
            className={`order-2 md:order-1 transition-all duration-1000 ${
              animatedElements.has('about-image') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative group">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center text-5xl sm:text-6xl font-bold group-hover:scale-105 transition-transform duration-500">
                <img src={profile} alt="Profile" className="w-full h-full object-cover rounded-lg border-4 border-yellow-400 shadow-lg" />
              </div>
            </div>
          </div>

          <div
            id="about-text"
            data-animate
            className={`order-1 md:order-2 transition-all duration-1000 delay-200 ${
              animatedElements.has('about-text') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-yellow-400">ABOUT ME</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              As a passionate Full Stack Developer, I specialize in building high-performance, scalable web applications. 
              With hands-on expertise in modern technologies like Node.js, React.js, Next.js, and MongoDB, I deliver dynamic solutions tailored to modern business needs.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              I integrate Large Language Models (LLMs) through APIs and frameworks like OpenAI to create AI-powered features. 
              I am dedicated to delivering innovative, efficient, and future-ready applications.
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {['React', 'Node.js', 'Hack', 'MongoDB', 'TypeScript', 'Next.js', 'Tailwind', 'AWS / OCI', 'Javascript', 'GraphQL', 'Rest APIs', 'Docker'].map((skill, idx) => (
                <div 
                  key={skill} 
                  className="bg-gray-900 p-3 sm:p-4 rounded border border-yellow-400/20 hover:border-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{
                    animation: animatedElements.has('about-text') ? `fadeInUp 0.5s ease-out ${idx * 0.1}s both` : 'none'
                  }}
                >
                  <span className="text-yellow-400 font-semibold text-sm sm:text-base">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 
            id="projects-title"
            data-animate
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-center text-yellow-400 transition-all duration-1000 ${
              animatedElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            PROJECTS
          </h2>
          
          {/* Filter & Search */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilterCategory(cat.id);
                      setVisibleProjects(6);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      filterCategory === cat.id
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-semibold">{cat.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 text-white transition-all"
              />
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, idx) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                data-animate
                className={`group relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 ${
                  animatedElements.has(`project-${project.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onClick={() => setSelectedProject(project)}
                style={{
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    FEATURED
                  </div>
                )}
                
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-500">{project.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded text-xs hover:bg-yellow-400/20 transition-colors">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    View Details <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-8 animate-fadeIn">
              <button
                onClick={() => setVisibleProjects(prev => prev + 6)}
                className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Load More Projects ({filteredProjects.length - visibleProjects} remaining)
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 animate-fadeIn">
              <Search className="mx-auto mb-4 text-gray-600" size={48} />
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="mt-4 px-6 py-2 bg-gray-800 text-yellow-400 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-gray-900 max-w-4xl w-full rounded-xl border border-gray-800 max-h-[90vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-yellow-400 hover:text-black rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <XCircle size={24} />
              </button>
              {selectedProject.featured && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  ⭐ FEATURED PROJECT
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">{selectedProject.title}</h2>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{selectedProject.date}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm font-semibold hover:bg-yellow-400/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {selectedProject.fullDescription}
              </p>
              
              <div className="flex gap-4">
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
                {/* <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  <Github size={20} />
                  View Code
                </a> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 
            id="experience-title"
            data-animate
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-yellow-400 transition-all duration-1000 ${
              animatedElements.has('experience-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            EXPERIENCE
          </h2>
          
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                id={`exp-${idx}`}
                data-animate
                className={`border-l-4 border-yellow-400 pl-4 sm:pl-6 md:pl-8 relative transition-all duration-1000 ${
                  animatedElements.has(`exp-${idx}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full -left-1.5 sm:-left-2.5 top-0 animate-pulse"></div>
                
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-102 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold">{exp.role}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar size={14} />
                      <span className="whitespace-nowrap">{exp.period.split(' - ')[1]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <p className="text-yellow-400 font-semibold text-sm sm:text-base flex items-center gap-2">
                      <Briefcase size={16} />
                      {exp.company}
                    </p>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{exp.location}</span>
                  </div>
                  
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">{exp.period}</p>
                  <p className="text-gray-300 text-sm sm:text-base mb-4">{exp.description}</p>
                  
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-yellow-400 mt-1">▸</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 
            id="connect-title"
            data-animate
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-yellow-400 transition-all duration-1000 ${
              animatedElements.has('connect-title') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            LET'S CONNECT
          </h2>
          <p 
            id="connect-subtitle"
            data-animate
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 md:mb-16 px-4 transition-all duration-1000 delay-200 ${
              animatedElements.has('connect-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Ready to work together? Get in touch and let's build something amazing.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Github, label: 'GitHub', link: 'https://github.com/VaibhavCse' },
              { icon: Linkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/vaibhav-chaudhary-788259181' },
              { icon: Mail, label: 'Email', link: 'vaibhav77324@gmail.com' },
              { icon: MessageSquare, label: 'Discord', link: 'https://discord.com/channels/723908317705142382/723908318543741010' },
              { icon: ExternalLink, label: 'Topmate', link: 'https://topmate.io/vaibhav_chaudhary20' },
              { 
                icon: FileText, 
                label: 'Resume', 
                link: resume,
                download: true 
              },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  id={`social-${idx}`}
                  data-animate
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-black border-2 border-gray-800 hover:border-yellow-400 rounded-lg p-6 sm:p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 ${
                    animatedElements.has(`social-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="text-yellow-400 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    <Icon size={36} className="sm:w-12 sm:h-12" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-yellow-400 transition-colors">
                    {social.label}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 sm:py-8 text-center text-gray-500 px-4">
        <p className="text-sm sm:text-base hover:text-yellow-400 transition-colors">
          &copy; 2025 Vaibhav Chaudhary. Built with passion and React.
        </p>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #facc15;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #fbbf24;
        }
      `}</style>
    </div>
  );
}

export default App;