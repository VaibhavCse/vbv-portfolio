/* eslint-disable react/prop-types, react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, FileText, Github, Linkedin, Mail, MessageSquare,
  ExternalLink, Search, Code, Brain, Globe, XCircle,
  Calendar, Briefcase, Sparkles, ChevronDown, Cloud, Cpu, ShieldCheck
} from 'lucide-react';
import profile from "../public/profile_pic_new.jpg";
import csd from "../public/projects/CSD.png";
import marketplace from "../public/projects/marketplace.png";
import tax from "../public/projects/taxowealth.png";
import lusora from "../public/projects/lusorafnb.png";
import syncpath from "../public/projects/syncpath.png";
import wellnessherb from "../public/projects/wellness_herb.png";
import sgb from "../public/projects/sgbindustries.png";
import avocsas from "../public/projects/avocsas.png";
import ecogrocer from "../public/projects/OrganicFoods.png";
import pet from "../public/projects/pet.png";
import pulse from "../public/projects/pulse.png";
import resume from "../public/VaibhavChaudhary.pdf";
import introVoice from "../public/intro_voice.mp3";

/* ═══════════════════════════════
   INTRO SPLASH
═══════════════════════════════ */
function IntroSplash({ onDone }) {
  const name1 = "VAIBHAV", name2 = "CHAUDHARY";
  const [shown, setShown] = useState([]);
  const [lineGrow, setLineGrow] = useState(false);
  const [subShow, setSubShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const total = name1.length + name2.length;
    [...name1, ...name2].forEach((_, i) => setTimeout(() => setShown(p => [...p, i]), i * 65));
    setTimeout(() => setLineGrow(true), total * 65 + 80);
    setTimeout(() => setSubShow(true), total * 65 + 380);
    setTimeout(() => setFadeOut(true), total * 65 + 1600);
    setTimeout(() => onDone(), total * 65 + 2250);
  }, []);

  const mkL = (word, off) => [...word].map((ch, i) => {
    const idx = off + i;
    return (
      <span key={idx} style={{
        display: 'inline-block',
        transform: shown.includes(idx) ? 'translateY(0)' : 'translateY(110%)',
        opacity: shown.includes(idx) ? 1 : 0,
        transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
        color: (off === 0 && i === 0) ? '#FACC15' : '#fff',
      }}>{ch}</span>
    );
  });

  return (
    <div style={{ position:'fixed', inset:0, background:'#000', zIndex:1000, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:fadeOut?0:1, pointerEvents:fadeOut?'none':'all', transition:'opacity 0.65s ease' }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(38px,11vw,140px)', letterSpacing:'0.07em', lineHeight:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.05em' }}>
        <div style={{ overflow:'hidden', display:'flex', gap:'0.04em' }}>{mkL(name1, 0)}</div>
        <div style={{ overflow:'hidden', display:'flex', gap:'0.04em' }}>{mkL(name2, name1.length)}</div>
      </div>
      <div style={{ width:lineGrow?'220px':'0px', height:'2px', background:'#FACC15', marginTop:'18px', transition:'width 0.9s ease 0.3s' }} />
      <div style={{ fontSize:'clamp(10px,2vw,13px)', letterSpacing:'0.35em', color:'#666', marginTop:'14px', textTransform:'uppercase', opacity:subShow?1:0, transition:'opacity 0.6s ease', fontFamily:"'Outfit',sans-serif" }}>
        Full Stack Developer · 5+ Years MERN
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   TALKING PHOTO MODAL
   — real audio + typewriter + animated wave bars
   — NO SVG mouth (removed)
═══════════════════════════════ */
function TalkingModal({ onClose }) {
  const lines = [
    "Hey! I'm Vaibhav Chaudhary 👋",
    "Full Stack Developer with 5+ years of MERN stack.",
    "I've built fintech platforms, investment marketplaces,",
    "AI-powered chatbots & real-time communication tools.",
    "Currently SDE 2 at Wipro — enterprise-scale systems.",
    "I turn complex problems into clean, scalable code.",
    "Let's build something amazing together! 🚀"
  ];
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [speaking, setSpeaking] = useState(true);
  const audioRef = useRef(null);

  /* Play audio — modal opens from a click (user gesture), so autoplay is allowed */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tryPlay = () => {
      audio.volume = 1;
      audio.currentTime = 0;
      audio.play().catch(err => console.warn('Audio play failed:', err));
    };
    // If already loadable, play immediately; otherwise wait for canplay
    if (audio.readyState >= 2) {
      tryPlay();
    } else {
      audio.addEventListener('canplay', tryPlay, { once: true });
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  /* Sync speaking state with audio */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setSpeaking(false);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  /* Typewriter — slowed to roughly match audio pacing
     ~110ms per char + 1800ms pause between lines */
  useEffect(() => {
    const cur = lines[lineIdx] || '';
    if (charIdx < cur.length) {
      const t = setTimeout(() => { setTyped(p => p + cur[charIdx]); setCharIdx(c => c + 1); }, 60);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); setTyped(''); }, 900);
      return () => clearTimeout(t);
    }
    // don't setSpeaking(false) here — audio ended event handles that
  }, [charIdx, lineIdx]);

  const waveH = [8,14,22,32,40,32,22,14,8,12,20,30,38,30,20,12,8];

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', overflowY:'auto' }}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={introVoice} preload="auto" />

      <div onClick={e => e.stopPropagation()} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', maxWidth:'560px', width:'100%' }}>

        <button onClick={onClose} style={{ alignSelf:'flex-end', background:'none', border:'none', color:'#555', fontSize:'24px', cursor:'pointer', lineHeight:1, transition:'color 0.2s' }}
          onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#555'}>✕</button>

        {/* Photo — NO SVG mouth overlay */}
        <div style={{ position:'relative', width:'min(260px,72vw)', flexShrink:0 }}>
          <div style={{ position:'relative', width:'100%', paddingBottom:'110%', border:'2px solid #FACC15', overflow:'hidden' }}>
            <img src={profile} alt="Vaibhav" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top 5% center', display:'block' }} />

            {/* SPEAKING / DONE badge */}
            <div style={{ position:'absolute', top:'10px', left:'10px', background:'#FACC15', color:'#000', fontSize:'9px', fontWeight:700, padding:'3px 9px', letterSpacing:'0.12em', display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#000', animation: speaking ? 'statusPulse 0.8s ease infinite' : 'none', opacity: speaking ? 1 : 0.4 }} />
              {speaking ? 'SPEAKING' : 'DONE'}
            </div>

          </div>
        </div>

        {/* Audio waveform row */}
        <div style={{ display:'flex', gap:'3px', alignItems:'center', height:'38px' }}>
          {waveH.map((h, i) => (
            <div key={i} style={{
              width:'3px', borderRadius:'2px', background:'#FACC15',
              height: speaking ? `${h}px` : '3px',
              transition:'height 0.2s ease',
              animation: speaking ? `waveBounce ${0.45+i*0.04}s ease infinite` : 'none',
              animationDelay:`${i*0.05}s`,
            }} />
          ))}
        </div>

        {/* Typewriter speech bubble */}
        <div style={{ background:'#0d0d0d', border:'1px solid #222', borderLeft:'3px solid #FACC15', padding:'20px 22px', width:'100%', minHeight:'90px' }}>
          {lines.slice(0, lineIdx).map((l, i) => (
            <p key={i} style={{ fontSize:'13px', color:'#444', lineHeight:1.7, margin:0 }}>{l}</p>
          ))}
          <p style={{ fontSize:'clamp(14px,2vw,15px)', lineHeight:1.8, color:'#eee', fontFamily:"'Outfit',sans-serif", margin:0 }}>
            {typed}
            {speaking && <span style={{ borderRight:'2px solid #FACC15', animation:'blink 0.6s step-end infinite', marginLeft:'1px' }}>&nbsp;</span>}
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex', gap:'6px' }}>
          {lines.map((_, i) => (
            <div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background: i <= lineIdx ? '#FACC15':'#222', transition:'background 0.3s' }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes waveBounce{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:0.2}}
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════
   EXPERIENCE SECTION
   — timeline style + click-expand
═══════════════════════════════ */
function ExperienceSection({ experiences }) {
  const [expanded, setExpanded] = useState(null);
  const [visible, setVisible] = useState(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => new Set([...v, e.target.dataset.idx])); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.exp-item').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggle = idx => setExpanded(expanded === idx ? null : idx);

  return (
    <section id="experience" style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,40px)', background:'#000', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(100px,20vw,260px)', color:'rgba(250,204,21,0.025)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>EXP</div>

      <div style={{ maxWidth:'860px', margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ marginBottom:'clamp(36px,6vw,64px)' }}>
          <div style={{ fontSize:'11px', letterSpacing:'0.4em', textTransform:'uppercase', color:'#FACC15', marginBottom:'14px' }}>Work History</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,7vw,80px)', lineHeight:1 }}>EXPERIENCE.</div>
        </div>

        <div style={{ position:'relative', paddingLeft:'clamp(28px,5vw,48px)' }}>
          <div style={{ position:'absolute', left:'clamp(10px,2vw,16px)', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom,transparent,#2a2a2a 8%,#2a2a2a 92%,transparent)' }} />

          {experiences.map((exp, idx) => {
            const isOpen = expanded === idx;
            const isVis = visible.has(String(idx));
            const isFirst = idx === 0;
            return (
              <div key={idx} data-idx={idx} className="exp-item" style={{ position:'relative', marginBottom: isOpen ? 'clamp(20px,4vw,36px)' : 'clamp(14px,3vw,24px)', opacity: isVis?1:0, transform: isVis?'translateX(0)':'translateX(-24px)', transition:`opacity 0.6s ease ${idx*0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${idx*0.08}s` }}>
                {/* Dot */}
                <div style={{ position:'absolute', left:'clamp(-22px,-3.5vw,-30px)', top:'22px', width:isFirst?'14px':'10px', height:isFirst?'14px':'10px', borderRadius:'50%', background:isFirst?'#FACC15':(isOpen?'#FACC15':'#333'), boxShadow:isFirst?'0 0 0 4px rgba(250,204,21,0.2)':(isOpen?'0 0 0 3px rgba(250,204,21,0.15)':'none'), transition:'all 0.3s ease', zIndex:2, transform:'translateX(-50%)' }} />
                {/* Card */}
                <div
                  onClick={() => toggle(idx)}
                  style={{ background:isOpen?'#0d0d0d':'#070707', border:`1px solid ${isOpen?'rgba(250,204,21,0.3)':'#141414'}`, borderLeft:`3px solid ${isFirst?'#FACC15':(isOpen?'#FACC15':'#222')}`, padding:'clamp(14px,2.5vw,22px)', cursor:'pointer', transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)', transform:isOpen?'translateX(6px) scale(1.005)':'translateX(0) scale(1)', boxShadow:isOpen?'0 8px 40px rgba(250,204,21,0.07)':'none' }}
                  onMouseEnter={e => { if(!isOpen){e.currentTarget.style.borderLeftColor='rgba(250,204,21,0.5)';e.currentTarget.style.background='#0a0a0a';e.currentTarget.style.transform='translateX(4px)';}}}
                  onMouseLeave={e => { if(!isOpen){e.currentTarget.style.borderLeftColor=isFirst?'#FACC15':'#222';e.currentTarget.style.background='#070707';e.currentTarget.style.transform='translateX(0)';}}}
                >
                  {/* Header */}
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'10px' }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px', flexWrap:'wrap' }}>
                        <h3 style={{ fontSize:'clamp(14px,2vw,17px)', fontWeight:700, margin:0, lineHeight:1.3 }}>{exp.role}</h3>
                        {isFirst && <span style={{ fontSize:'9px', background:'#FACC15', color:'#000', fontWeight:700, padding:'2px 8px', letterSpacing:'0.1em' }}>CURRENT</span>}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                        <span style={{ display:'flex', alignItems:'center', gap:'5px', color:'#FACC15', fontSize:'clamp(11px,1.5vw,13px)', fontWeight:600 }}><Briefcase size={11}/>{exp.company}</span>
                        <span style={{ color:'#333', fontSize:'11px' }}>·</span>
                        <span style={{ color:'#555', fontSize:'11px' }}>{exp.location}</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#555', fontSize:'11px' }}><Calendar size={11}/><span style={{ whiteSpace:'nowrap' }}>{exp.period}</span></div>
                      <div style={{ transition:'transform 0.35s ease, color 0.2s', transform:isOpen?'rotate(180deg)':'rotate(0deg)', color:isOpen?'#FACC15':'#444' }}><ChevronDown size={16}/></div>
                    </div>
                  </div>
                  {/* Expand */}
                  <div style={{ overflow:'hidden', maxHeight:isOpen?'600px':'0px', opacity:isOpen?1:0, transition:'max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease', marginTop:isOpen?'14px':'0' }}>
                    <div style={{ paddingTop:'12px', borderTop:'1px solid #1a1a1a' }}>
                      <p style={{ fontSize:'clamp(12px,1.5vw,13px)', color:'#666', lineHeight:1.75, marginBottom:'12px' }}>{exp.description}</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
                        {exp.achievements.map((a, i) => (
                          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'8px', fontSize:'clamp(11px,1.4vw,12px)', color:'#777', opacity:isOpen?1:0, transform:isOpen?'translateX(0)':'translateX(-10px)', transition:`opacity 0.4s ease ${0.1+i*0.06}s, transform 0.4s ease ${0.1+i*0.06}s` }}>
                            <span style={{ color:'#FACC15', flexShrink:0, marginTop:'2px' }}>▸</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   MAIN APP
═══════════════════════════════ */
function CertificationsSection({ certifications, vis }) {
  return (
    <section
      id="certifications"
      style={{
        padding: "clamp(60px,10vw,120px) clamp(20px,5vw,40px)",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-4%",
          top: "8%",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(92px,18vw,230px)",
          color: "rgba(250,204,21,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        CERT
      </div>

      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          id="cert-hdr"
          data-animate
          className={`vc-reveal${vis("cert-hdr") ? " vis" : ""}`}
          style={{ marginBottom: "clamp(34px,6vw,56px)" }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#FACC15",
              marginBottom: "14px",
            }}
          >
            Verified Learning
          </div>

          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(38px,7vw,78px)",
              lineHeight: 1,
            }}
          >
            CERTIFICATIONS.
          </div>
        </div>

        <div className="cert-list">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;

            const Card = (
              <article
                className={`cert-card vc-reveal${
                  vis(`cert-${idx}`) ? " vis" : ""
                }`}
                id={`cert-${idx}`}
                data-animate
                style={{
                  transitionDelay: `${idx * 0.1}s`,
                  cursor: cert.credentialUrl ? "pointer" : "default",
                }}
              >
                <div
                  className="cert-logo"
                  style={{
                    background: cert.logoBg,
                    color: cert.logoColor,
                  }}
                >
                  {cert.logoText ? (
                    <span>{cert.logoText}</span>
                  ) : (
                    <Icon size={28} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "16px",
                      marginBottom: "6px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "clamp(16px,2vw,20px)",
                          lineHeight: 1.28,
                          margin: 0,
                          fontWeight: 700,
                        }}
                      >
                        {cert.title}
                      </h3>

                      <p
                        style={{
                          color: "#bdbdbd",
                          fontSize: "14px",
                          marginTop: "3px",
                        }}
                      >
                        {cert.issuer}
                      </p>
                    </div>

                    <div className="cert-badge">
                      <Icon size={16} />
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#6f6f6f",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      marginBottom: "7px",
                    }}
                  >
                    {cert.period}
                  </p>

                  {cert.credentialId && (
                    <p
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        lineHeight: 1.6,
                        marginBottom: "13px",
                        wordBreak: "break-word",
                      }}
                    >
                      Credential ID {cert.credentialId}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      alignItems: "center",
                      marginTop: "14px",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      Skills:
                    </span>

                    {cert.skills.map((skill) => (
                      <span key={skill} className="cert-skill">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {cert.credentialUrl && (
                    <div
                      style={{
                        marginTop: "18px",
                        color: "#FACC15",
                        fontSize: "13px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      View Credential ↗
                    </div>
                  )}
                </div>
              </article>
            );

            return cert.credentialUrl ? (
              <a
                key={cert.title}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {Card}
              </a>
            ) : (
              <div key={cert.title}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x:0, y:0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [talkingOpen, setTalkingOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [animated, setAnimated] = useState(new Set());
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const ringX = useRef(0), ringY = useRef(0), mouseX = useRef(0), mouseY = useRef(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (ringRef.current) { ringRef.current.style.left=ringX.current+'px'; ringRef.current.style.top=ringY.current+'px'; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = e => {
      mouseX.current=e.clientX; mouseY.current=e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left=e.clientX+'px'; cursorRef.current.style.top=e.clientY+'px'; }
      setMousePos({ x:e.clientX, y:e.clientY });
    };
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id) {
          setAnimated(prev => new Set([...prev, e.target.id]));
          e.target.querySelectorAll('.stat-fill').forEach(b => { b.style.width=b.dataset.width+'%'; });
        }
      });
    }, { threshold:0.12 });
    document.querySelectorAll('[data-animate]').forEach(el => { if (el.id) obs.observe(el); });
    return () => obs.disconnect();
  }, [heroVisible]);

  useEffect(() => {
    document.body.style.overflow=(menuOpen||selectedProject||talkingOpen)?'hidden':'unset';
  }, [menuOpen,selectedProject,talkingOpen]);

  useEffect(() => { setVisibleCount(6); }, [filterCategory,searchTerm]);

  const vis = id => animated.has(id);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); };

  const allProjects = [
    { id:1, title:"Pulse", category:"web", description:"Cloud-based team communication & email campaign platform", fullDescription:"Cloud-based communication platform for team and email campaigns with custom templates, SSO authentication, and real-time analytics. Built using Node.js, React, and MongoDB. Integrated an AI-powered chatbot using a RAG (Retrieval-Augmented Generation) approach to deliver intelligent, context-aware responses and enhance user engagement.", tech:["Node.js","Nextjs","MongoDB","RAG","Socket.io","SSO"], image:pulse, demoLink:"https://pulse.formidium.com", featured:true, date:"2025" },
    { id:2, title:"CommonSubDoc", category:"web", description:"Investor onboarding and compliance automation platform", fullDescription:"CommonSubDoc is an advanced investor relations and compliance automation platform. It streamlines onboarding, KYC/AML verification, document workflows, and real-time reporting. Built intuitive dashboards, secure API integrations, automated compliance pipelines, and digital approvals to enhance transparency and operational efficiency.", tech:["Node.js","MongoDB","EJS","Tailwind CSS","Shufti Pro","AWS"], image:csd, demoLink:"https://commonsubdoc.com/", featured:true, date:"2024" },
    { id:3, title:"AltsMarketplace", category:"web", description:"Alternative investment marketplace for investors and fund managers", fullDescription:"A next-generation investment marketplace connecting investors, fund managers, and service providers. Includes secure document exchange, deal flow automation, analytics dashboards, user roles, and real-time insights. Developed robust APIs, scalable backend architecture, and modern UI components.", tech:["React.js","Node.js","MongoDB","Express.js","AWS"], image:marketplace, demoLink:"https://altsmarketplace.com/", featured:true, date:"2023" },
    { id:4, title:"Tax O Wealth", category:"web", description:"Fintech wealth advisory and tax planning platform", fullDescription:"A complete fintech advisory platform providing investment guidance, tax planning, insurance, and mutual fund management. Integrated AI-powered chatbot features, portfolio tracking tools, client dashboards, custom workflows, and secure payment gateway integrations.", tech:["React.js","Node.js","MongoDB","Chatbot Integration","Payment Gateway"], image:tax, demoLink:"https://taxowealth.com/", featured:true, date:"2024" },
    { id:5, title:"PetExportVet", category:"wix", description:"Veterinary & pet export website (Wix)", fullDescription:"A marketing and informational website built on Wix for pet export and veterinary services. Designed with Wix's editor to provide clear service pages, contact flows, and basic SEO for lead generation.", tech:["Wix"], image:pet, demoLink:"https://www.petexportvet.com/", featured:false, date:"2025" },
    { id:6, title:"Lusora", category:"website", description:"Luxury CSD & mineral water brand website with modern UI/UX", fullDescription:"Designed a premium digital identity for Lusora, a luxury mineral water and carbonated soft drinks brand. Built a smooth, mobile-friendly React/Next.js interface with WhatsApp messaging automation, email workflows, Google Maps integration, and a high-end luxury UI experience.", tech:["React.js","Next.js","Email Integration","WhatsApp API","Google Maps API"], image:lusora, demoLink:"https://www.lusorafnb.com/", featured:false, date:"2025" },
    { id:7, title:"Wellness Herb", category:"website", description:"Herbal wellness store with payments & appointment booking", fullDescription:"An online wellness platform offering herbal products with seamless booking and payment experience. Integrated Calendly for scheduling, Razorpay/PayPal payment flows, dynamic product listings, interactive popups, and user-friendly checkout design.", tech:["React.js","Node.js","MongoDB","Payment Integration","Calendly API"], image:wellnessherb, demoLink:"https://wellnessherb.in/", featured:false, date:"2024" },
    { id:8, title:"SGB Industries", category:"website", description:"Single-page product catalog for a food manufacturing company", fullDescription:"Built a clean and responsive single-page React website for SGB Industries, showcasing their product catalog including rice, wheat, pulses, oils, and besan products. Focused on SEO, mobile optimization, and smooth section-based navigation.", tech:["React.js"], image:sgb, demoLink:"https://sgbindustries.netlify.app/", featured:false, date:"2023" },
    { id:9, title:"Avocsas", category:"website", description:"Salesforce security and compliance tracking platform", fullDescription:"Developed a Salesforce-powered security and compliance management platform featuring Shield integration, risk assessments, access audits, and automated compliance workflows. Improved enterprise security visibility and audit readiness.", tech:["React.js","Salesforce Integration"], image:avocsas, demoLink:"https://avocsas.in/", featured:false, date:"2023" },
    { id:10, title:"Ecogrocer", category:"web", description:"Organic grocery e-commerce demo platform", fullDescription:"A modern, mobile-first organic food e-commerce platform with dynamic product listings, cart management, payment integration, and smooth checkout flow. Built scalable APIs, reusable UI components, and optimized routing.", tech:["React.js","Node.js","MongoDB","Payment Integration"], image:ecogrocer, demoLink:"https://ecogrocer.netlify.app/", featured:false, date:"2023" },
    { id:11, title:"SyncPath Consulting", category:"website", description:"Salesforce consulting and automation platform", fullDescription:"Developed a digital presence for SyncPath Consulting, a Salesforce solution provider. Implemented service pages, Salesforce API integration, automation workflows, dynamic content management, and optimized UI components for enterprise consulting needs.", tech:["React.js","Node.js","Salesforce API"], image:syncpath, demoLink:"http://syncpath.in/", featured:false, date:"2024" },
  ];

  const experiences = [
    { role:"Senior Software Engineer (SDE 2)", company:"Wipro Ltd.", period:"Dec 2025 - Present", location:"Bengaluru · Hybrid", description:"Working as SDE 2 at Wipro on enterprise-grade full-stack systems. Involved in feature development, cross-functional collaboration, and maintaining production-scale codebases with modern tech stacks.", achievements:["SDE 2 — working on enterprise-grade production systems at scale","Building and maintaining full-stack web features in a large codebase","Collaborating with engineers, product managers, and QA teams","Following industry-standard code reviews, architecture patterns, and best practices"] },
    { role:"Software Engineer", company:"Formidium Technologies", period:"June 2022 - Nov 2025", location:"Jaipur · Hybrid", description:"Led full-stack MERN development, delivering scalable web applications. Mentored junior devs and drove on-time delivery of complex technical projects.", achievements:["Reduced infrastructure costs by 40% through strategic optimization","Delivered major MERN project resulting in 20% user engagement growth","Built RESTful APIs with Node.js & Express, cutting server response time by 25%","Optimized MongoDB schemas for high-traffic apps, boosting query performance by 40%","Mentored junior developers, improving team productivity and code quality"] },
    { role:"Jr. Software Engineer", company:"Formidium Technologies", period:"Jul 2021 - May 2022", location:"Jaipur · Hybrid", description:"Built full-stack web apps with Sails.js and Node.js, gaining expertise in system architecture, API design, and database management.", achievements:["Developed scalable apps using Node.js, Express, React.js, and MongoDB","Participated in API integration and backend logic, enhancing delivery timelines","Built modular, reusable React components improving dev speed by 15%"] },
    { role:"Graduate Engineering Trainee", company:"Formidium Technologies", period:"March 2021 - June 2021", location:"Jaipur · Remote", description:"Kickstarted full-stack career developing client websites and learning the MERN stack end-to-end.", achievements:["React.js component development and state management","Debugging and cross-browser testing for consistency","Participated in agile ceremonies — stand-ups, sprint reviews, retrospectives"] },
    { role:"Android App Developer", company:"Rawattech", period:"Jan 2021 - March 2021", location:"Jaipur · On-site", description:"Learned mobile app development using React Native.", achievements:["Android app development through React Native"] },
    { role:"Technical Analyst Intern", company:"Requin Solutions Pvt. Ltd", period:"Sep 2020 - Dec 2020", location:"Jaipur · On-site", description:"Java development internship — foundation of software engineering principles.", achievements:["Core Java development and OOP principles"] },
  ];

  const certifications = [
    {
      title: "Claude Certified Architect - Foundations",
      issuer: "Anthropic",
      period: "Issued Jul 2026 · Expires Jul 2027",
      skills: [
        "Claude",
        "AI Agents",
        "Prompt Engineering",
        "System Design",
        "LLM Applications"
      ],
      icon: Brain,
      logoText: "AI",
      logoBg: "#1f2937",
      logoColor: "#ffffff",
      credentialUrl: "https://www.credly.com/badges/a4680adc-00cd-47bc-93a7-8007903ec05e/public_url"
    },
    {
      title:"AWS Certified Cloud Practitioner",
      issuer:"Amazon Web Services (AWS)",
      period:"Issued May 2026 · Expires May 2029",
      credentialId:"12fed24e-4e6d-4bc7-9ba1-0044207c5348",
      skills:["AWS Cloud Computing"],
      icon:Cloud,
      logoText:"AWS",
      logoBg:"#f3f4f6",
      logoColor:"#111827",
      credentialUrl: "https://www.credly.com/badges/12fed24e-4e6d-4bc7-9ba1-0044207c5348/public_url"
    },
    {
      title:"AWS Partner: Generative AI Technical",
      issuer:"Amazon Web Services (AWS)",
      period:"Issued Mar 2026",
      skills:["Amazon Web Services (AWS)","GenAI Virtual Assistants","Prompt Engineering","LLM Integration"],
      icon:Cpu,
      logoText:"aws",
      logoBg:"#111827",
      logoColor:"#fff",
      credentialUrl: "https://www.credly.com/badges/11befcb7-5612-4620-855b-3ad1075c4e09/public_url"
    },
    {
      title:"Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer:"Oracle",
      period:"Issued Oct 2025 · Expires Nov 2027",
      skills:["Oracle Cloud Infrastructure","AI Foundations","Cloud Computing"],
      icon:ShieldCheck,
      logoText:"O",
      logoBg:"#d64535",
      logoColor:"#fff",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BD1F600E7F3202CCF8E3B3AA77F423E6234C951C7F21B633F49208421F151D11"
    },
  ];

  const categories = [
    { id:'all', label:'All Projects', icon:Globe },
    { id:'web', label:'Web Apps', icon:Code },
    { id:'website', label:'Websites', icon:Sparkles },
    { id:'wix', label:'Wix', icon:Brain },
  ];

  const connectLinks = [
    { icon:Github, label:'GitHub', href:'https://github.com/VaibhavCse', target:'_blank' },
    { icon:Linkedin, label:'LinkedIn', href:'https://www.linkedin.com/in/vaibhav-chaudhary-788259181', target:'_blank' },
    { icon:Mail, label:'Email', href:'mailto:vaibhav77324@gmail.com' },
    { icon:MessageSquare, label:'Discord', href:'https://discord.com/channels/723908317705142382/723908318543741010', target:'_blank' },
    { icon:ExternalLink, label:'Topmate', href:'https://topmate.io/vaibhav_chaudhary20', target:'_blank' },
    { icon:FileText, label:'Resume', href:resume, download:true },
  ];

  const marqueeItems = ['React.js','Node.js','MongoDB','Next.js','TypeScript','AWS','GraphQL','Docker','Tailwind CSS','Socket.io','Express.js','MERN Stack'];
  const skills = ['React','Node.js','Hack','MongoDB','TypeScript','Next.js','Tailwind','AWS / OCI','Javascript','GraphQL','Rest APIs','Docker'];

  const filtered = allProjects.filter(p => {
    const catOk = filterCategory==='all' || p.category===filterCategory;
    const searchOk = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });
  const displayed = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const scrollProgress = typeof document === 'undefined'
    ? 0
    : Math.min(100, Math.max(0, (scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100));

  return (
    <div style={{ background:'#000', color:'#fff', overflowX:'hidden', fontFamily:"'Outfit',sans-serif", cursor:'none' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;cursor:none}
        body{cursor:none;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:#FACC15;border-radius:3px}

        #vc-cursor{position:fixed;width:10px;height:10px;background:#FACC15;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .18s,height .18s}
        #vc-ring{position:fixed;width:34px;height:34px;border:1.5px solid rgba(250,204,21,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%)}

        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes waveBounce{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
        @keyframes statusPulse{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes playPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}
        @keyframes scrollHint{to{opacity:.4}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

        .vc-reveal{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
        .vc-reveal.vis{opacity:1;transform:translateY(0)}

        .vc-pathway{position:fixed;left:24px;top:86px;bottom:30px;width:34px;z-index:80;pointer-events:none;display:flex;justify-content:center}
        .vc-pathway-track{position:relative;width:1px;height:100%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.14) 8%,rgba(255,255,255,.14) 92%,transparent)}
        .vc-pathway-fill{position:absolute;left:0;top:0;width:1px;background:linear-gradient(to bottom,#FACC15,rgba(250,204,21,.3));box-shadow:0 0 18px rgba(250,204,21,.35);transition:height .16s ease-out}
        .vc-pathway-node{position:absolute;left:50%;width:11px;height:11px;border-radius:50%;background:#FACC15;box-shadow:0 0 0 5px rgba(250,204,21,.12),0 0 22px rgba(250,204,21,.55);transform:translate(-50%,-50%);transition:top .16s ease-out}
        .vc-pathway-label{position:absolute;left:18px;top:0;writing-mode:vertical-rl;text-transform:uppercase;letter-spacing:.22em;font-size:9px;color:rgba(250,204,21,.45)}

        .proj-grid-wrap{display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
        .proj-card{background:#0d0d0d;border:1px solid #1a1a1a;position:relative;overflow:hidden;cursor:pointer;transition:border-color .3s,transform .3s,box-shadow .3s;border-radius:2px;animation:fadeUp .5s ease both;min-width:0}
        .proj-card:hover{border-color:rgba(250,204,21,.5);transform:translateY(-4px);box-shadow:0 12px 40px rgba(250,204,21,.1)}
        .proj-card:hover .proj-img{transform:scale(1.06)}
        .proj-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}

        .cert-list{position:relative;display:flex;flex-direction:column;gap:18px;padding-left:34px}
        .cert-list::before{content:'';position:absolute;left:7px;top:22px;bottom:22px;width:1px;background:linear-gradient(to bottom,#FACC15,rgba(250,204,21,.18))}
        .cert-card{position:relative;display:flex;gap:18px;background:#080808;border:1px solid #1a1a1a;border-left:3px solid rgba(250,204,21,.72);padding:clamp(18px,3vw,26px);border-radius:2px;transition:border-color .3s,transform .3s,box-shadow .3s,opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
        .cert-card::before{content:'';position:absolute;left:-41px;top:31px;width:14px;height:14px;border-radius:50%;background:#FACC15;box-shadow:0 0 0 5px rgba(250,204,21,.12)}
        .cert-card:hover{border-color:rgba(250,204,21,.42);transform:translateX(6px);box-shadow:0 12px 44px rgba(250,204,21,.08)}
        .cert-logo{width:60px;height:60px;flex:0 0 60px;display:flex;align-items:center;justify-content:center;border-radius:4px;font-weight:800;letter-spacing:.02em;font-size:17px;text-transform:uppercase}
        .cert-badge{width:34px;height:34px;border:1px solid rgba(250,204,21,.22);color:#FACC15;background:rgba(250,204,21,.04);display:flex;align-items:center;justify-content:center;flex:0 0 34px}
        .cert-skill{padding:5px 10px;background:rgba(250,204,21,.07);border:1px solid rgba(250,204,21,.14);color:#FACC15;font-size:12px;border-radius:2px}

        .vc-skill{padding:7px 14px;border:1px solid rgba(250,204,21,.2);font-size:12px;color:#FACC15;letter-spacing:.04em;transition:background .2s,border-color .2s;cursor:default;border-radius:2px}
        .vc-skill:hover{background:rgba(250,204,21,.08);border-color:#FACC15}

        .vc-navlink{background:none;border:none;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#888;cursor:none;font-family:'Outfit',sans-serif;position:relative;padding:0;transition:color .2s}
        .vc-navlink::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#FACC15;transition:width .3s}
        .vc-navlink:hover{color:#fff}
        .vc-navlink:hover::after{width:100%}

        .connect-card{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(22px,4vw,42px) 16px;background:#000;border:2px solid #1a1a1a;color:#fff;text-decoration:none;gap:13px;transition:border-color .3s,color .3s,transform .3s,background .3s;border-radius:2px}
        .connect-card:hover{border-color:#FACC15;color:#FACC15;transform:translateY(-4px);background:rgba(250,204,21,.02)}

        .vc-btn-y{padding:12px 28px;background:#FACC15;color:#000;font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:none;font-family:'Outfit',sans-serif;transition:transform .2s,box-shadow .2s;border-radius:1px;display:inline-flex;align-items:center;gap:7px}
        .vc-btn-y:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(250,204,21,.28)}
        .vc-btn-o{padding:12px 28px;background:transparent;color:#fff;font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.2);cursor:none;font-family:'Outfit',sans-serif;transition:border-color .2s,color .2s;border-radius:1px}
        .vc-btn-o:hover{border-color:#FACC15;color:#FACC15}

        .play-btn{width:72px;height:72px;border-radius:50%;background:#FACC15;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(250,204,21,.28);transition:transform .3s,box-shadow .3s}
        .play-btn:hover{transform:scale(1.08);box-shadow:0 8px 36px rgba(250,204,21,.5)}

        .stat-fill{width:0%;transition:width 1.3s cubic-bezier(.22,1,.36,1)}

        @media(max-width:680px){
          #vc-cursor,#vc-ring{display:none!important}
          .vc-pathway{display:none!important}
          .vc-hero-grid{grid-template-columns:1fr!important}
          .vc-about-grid{grid-template-columns:1fr!important}
          .proj-grid-wrap{grid-template-columns:1fr!important}
          .cert-list{padding-left:22px}
          .cert-list::before{left:5px}
          .cert-card{flex-direction:column;gap:14px}
          .cert-card::before{left:-28px;top:30px}
          .cert-logo{width:54px;height:54px;flex-basis:54px}
          .vc-connect-grid{grid-template-columns:1fr 1fr!important}
          .vc-nav-links-d{display:none!important}
          .photo-frame{width:min(280px,80vw)!important;height:min(340px,90vw)!important}
        }
        @media(max-width:1024px){
          .vc-pathway{display:none!important}
        }
        @media(min-width:681px) and (max-width:1024px){
          .proj-grid-wrap{grid-template-columns:repeat(2,1fr)!important}
          .vc-hero-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      <div id="vc-cursor" ref={cursorRef}/>
      <div id="vc-ring" ref={ringRef}/>
      <div className="vc-pathway" aria-hidden="true">
        <div className="vc-pathway-track">
          <div className="vc-pathway-fill" style={{ height:`${scrollProgress}%` }} />
          <div className="vc-pathway-node" style={{ top:`${scrollProgress}%` }} />
          <div className="vc-pathway-label">Pathway</div>
        </div>
      </div>

      {introVisible && <IntroSplash onDone={() => { setIntroVisible(false); setHeroVisible(true); }}/>}
      {talkingOpen && <TalkingModal onClose={() => setTalkingOpen(false)}/>}

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'clamp(13px,2vw,18px) clamp(16px,4vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(0,0,0,0.93)', backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(17px,3vw,22px)', letterSpacing:'0.1em' }}>
          <span style={{ color:'#FACC15' }}>V</span>AIBHAV <span style={{ color:'#2a2a2a' }}>·</span> <span style={{ color:'#555' }}>VC</span>
        </div>
        <div className="vc-nav-links-d" style={{ display:'flex', gap:'28px' }}>
          {['home','about','projects','experience','certifications','connect'].map(s => (
            <button key={s} className="vc-navlink" onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#fff', cursor:'none', padding:'2px', display:'flex' }}>
          {menuOpen ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </nav>

      {/* FULLSCREEN MENU */}
      <div style={{ position:'fixed', inset:0, background:'#000', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', opacity:menuOpen?1:0, visibility:menuOpen?'visible':'hidden', transition:'opacity .5s, visibility .5s' }}>
        <button onClick={() => setMenuOpen(false)} style={{ position:'absolute', top:'20px', right:'24px', background:'none', border:'none', color:'#fff', cursor:'pointer' }}><X size={24}/></button>
        <div style={{ display:'flex', flexDirection:'column', gap:'8px', textAlign:'center' }}>
          {['home','about','projects','experience','certifications','connect'].map((s,i) => (
            <div key={s} style={{ opacity:menuOpen?1:0, transform:menuOpen?'translateY(0)':'translateY(14px)', transition:`all .45s ease ${i*70}ms` }}>
              <button onClick={() => scrollTo(s)} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(34px, 5vw, 58px)", letterSpacing:'0.08em', color:'#fff', textTransform:'uppercase', transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='#FACC15'} onMouseLeave={e => e.target.style.color='#fff'}>{s}</button>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', paddingTop:'clamp(70px,10vw,90px)' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.04, backgroundImage:'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize:'55px 55px', transform:`translateY(${scrollY*.22}px)` }}/>
        <div style={{ position:'absolute', inset:0, opacity:0.13, pointerEvents:'none', backgroundImage:`radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(250,204,21,.3) 0%, transparent 52%)` }}/>

        <div className="vc-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(28px,5vw,60px)', alignItems:'center', maxWidth:'1200px', width:'100%', padding:'clamp(20px,4vw,40px)' }}>
          <div>
            <div style={{ fontSize:'12px', letterSpacing:'0.4em', color:'#FACC15', textTransform:'uppercase', marginBottom:'16px', opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(16px)', transition:'all .7s ease .2s' }}>Based in Bengaluru, India</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(54px,9vw,122px)', lineHeight:0.92, letterSpacing:'0.02em', opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(26px)', transition:'all .85s cubic-bezier(.22,1,.36,1) .4s' }}>
              FULL<br/><span style={{ color:'#FACC15' }}>STACK</span><br/>DEV.
            </div>
            <div style={{ fontSize:'clamp(13px,1.8vw,15px)', color:'#666', marginTop:'16px', lineHeight:1.65, opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(16px)', transition:'all .7s ease .7s' }}>
              <span style={{ color:'#fff', fontWeight:600 }}>Vaibhav Chaudhary</span> — SDE 2 at Wipro.<br/>5+ Years MERN Stack · Building the web one commit at a time.
            </div>
            <div style={{ display:'flex', gap:'13px', marginTop:'clamp(22px,4vw,34px)', flexWrap:'wrap', opacity:heroVisible?1:0, transform:heroVisible?'translateY(0)':'translateY(16px)', transition:'all .7s ease .9s' }}>
              <button className="vc-btn-y" onClick={() => scrollTo('projects')}>View Work</button>
              <button className="vc-btn-o" onClick={() => scrollTo('connect')}>Get In Touch</button>
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'center', opacity:heroVisible?1:0, transform:heroVisible?'translateX(0)':'translateX(34px)', transition:'all .9s cubic-bezier(.22,1,.36,1) .6s' }}>
            <div className="photo-frame" style={{ position:'relative', width:'330px', height:'420px' }}>
              <div style={{ position:'absolute', top:'14px', right:'-14px', width:'100%', height:'100%', background:'#FACC15', zIndex:0 }}/>
              <div style={{ position:'absolute', inset:0, zIndex:1, overflow:'hidden', background:'#111' }}>
                <img src={profile} alt="Vaibhav" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }}/>
              </div>
              <div style={{ position:'absolute', top:'-14px', left:'16px', zIndex:3, background:'#000', border:'1px solid #FACC15', padding:'6px 13px', display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'#FACC15' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', animation:'statusPulse 1.5s ease infinite' }}/>
                Available for work
              </div>
              <div onClick={() => setTalkingOpen(true)} style={{ position:'absolute', inset:0, zIndex:2, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0)', transition:'background .3s', cursor:'none' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,.18)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0)'}
              >
                <div style={{ position:'absolute', width:'72px', height:'72px', borderRadius:'50%', border:'2px solid #FACC15', animation:'playPulse 2s ease-out infinite' }}/>
                <div className="play-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'7px', opacity:0, animation:'scrollHint .8s ease 2s forwards' }}>
          <span style={{ fontSize:'10px', letterSpacing:'0.28em', textTransform:'uppercase', color:'#3a3a3a' }}>Scroll</span>
          <div style={{ width:'1px', height:'34px', background:'linear-gradient(to bottom,#FACC15,transparent)' }}/>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop:'1px solid #111', borderBottom:'1px solid #111', padding:'15px 0', overflow:'hidden', background:'#000' }}>
        <div style={{ display:'flex', gap:'50px', animation:'marquee 22s linear infinite', whiteSpace:'nowrap' }}>
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'20px', letterSpacing:'0.1em', color:'#1e1e1e', display:'inline-flex', alignItems:'center', gap:'16px' }}>
              {item} <span style={{ color:'#FACC15', fontSize:'8px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,40px)' }}>
        <div className="vc-about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(36px,6vw,80px)', alignItems:'center', maxWidth:'1200px', margin:'0 auto' }}>
          <div id="about-text" data-animate className={`vc-reveal${vis('about-text')?' vis':''}`}>
            <div style={{ fontSize:'11px', letterSpacing:'0.4em', textTransform:'uppercase', color:'#FACC15', marginBottom:'13px' }}>Who I Am</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(38px,6vw,76px)', lineHeight:1, marginBottom:'20px' }}>CODE THAT<br/><span style={{ color:'#FACC15' }}>SHIPS.</span></div>
            <p style={{ fontSize:'clamp(14px,1.6vw,16px)', lineHeight:1.8, color:'#666', marginBottom:'13px' }}>Full Stack Developer with 5+ years of hands-on MERN stack experience, building scalable, high-performance web applications from the ground up.</p>
            <p style={{ fontSize:'clamp(14px,1.6vw,16px)', lineHeight:1.8, color:'#666', marginBottom:'26px' }}>I integrate LLMs via OpenAI and RAG pipelines, ship AI-powered features, and love turning complex business problems into clean, elegant code.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {skills.map(s => <span key={s} className="vc-skill">{s}</span>)}
            </div>
          </div>
          <div id="about-stats" data-animate className={`vc-reveal${vis('about-stats')?' vis':''}`} style={{ transitionDelay:'0.14s' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {[['5+','Years Experience'],['11+','Projects Shipped'],['40%','Infra Cost Saved'],['25%','API Speed Boost']].map(([n,l]) => (
                  <div key={l} style={{ padding:'clamp(14px,2.5vw,22px)', background:'#0a0a0a', border:'1px solid #1a1a1a' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(34px,5vw,46px)', color:'#FACC15', lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:'11px', color:'#444', letterSpacing:'0.05em', marginTop:'3px' }}>{l}</div>
                  </div>
                ))}
              </div>
              {[['MERN Stack',98],['React / Next.js',95],['System Design',85],['AI / LLM Integration',78]].map(([l,p]) => (
                <div key={l}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#666', marginBottom:'6px' }}>
                    <span>{l}</span><span style={{ color:'#FACC15' }}>{p}%</span>
                  </div>
                  <div style={{ height:'2px', background:'#1a1a1a' }}><div className="stat-fill" data-width={p} style={{ height:'100%', background:'#FACC15' }}/></div>
                </div>
              ))}
              <div style={{ padding:'16px 18px', border:'1px solid rgba(250,204,21,.18)', background:'rgba(250,204,21,.02)' }}>
                <div style={{ fontSize:'10px', color:'#444', marginBottom:'5px', letterSpacing:'0.06em', textTransform:'uppercase' }}>Current Role</div>
                <div style={{ fontWeight:700, fontSize:'clamp(14px,2vw,16px)' }}>SDE 2 @ Wipro</div>
                <div style={{ fontSize:'12px', color:'#555', marginTop:'3px' }}>Bengaluru · Hybrid · Dec 2025–Present</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,40px)', background:'#080808' }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto' }}>
          <div id="proj-hdr" data-animate className={`vc-reveal${vis('proj-hdr')?' vis':''}`} style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'36px', flexWrap:'wrap', gap:'18px' }}>
            <div>
              <div style={{ fontSize:'11px', letterSpacing:'0.4em', textTransform:'uppercase', color:'#FACC15', marginBottom:'11px' }}>Selected Work</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(38px,7vw,78px)', lineHeight:1 }}>PROJECTS.</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'9px', alignItems:'flex-end' }}>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {categories.map(cat => {
                  const Icon=cat.icon; const active=filterCategory===cat.id;
                  return (
                    <button key={cat.id} onClick={() => { setFilterCategory(cat.id); setVisibleCount(6); }} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 13px', background:active?'#FACC15':'#111', color:active?'#000':'#666', border:`1px solid ${active?'#FACC15':'#222'}`, fontSize:'12px', fontWeight:600, cursor:'none', fontFamily:"'Outfit',sans-serif", transition:'all .2s' }}>
                      <Icon size={12}/>{cat.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ position:'relative' }}>
                <Search size={13} style={{ position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#444' }}/>
                <input type="text" placeholder="Search projects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft:'32px', paddingRight:'13px', paddingTop:'8px', paddingBottom:'8px', background:'#111', border:'1px solid #222', color:'#fff', fontSize:'12px', outline:'none', width:'clamp(170px,22vw,210px)', fontFamily:"'Outfit',sans-serif", cursor:'text' }}/>
              </div>
            </div>
          </div>

          {displayed.length > 0 ? (
            <div className="proj-grid-wrap">
              {displayed.map((p,idx) => (
                <div key={p.id} className="proj-card" onClick={() => setSelectedProject(p)} style={{ animationDelay:`${idx*50}ms` }}>
                  {p.featured && <div style={{ position:'absolute', top:'12px', right:'12px', zIndex:2, background:'#FACC15', color:'#000', fontSize:'9px', fontWeight:700, padding:'3px 8px', letterSpacing:'0.08em' }}>FEATURED</div>}
                  <div style={{ height:'170px', overflow:'hidden', position:'relative' }}>
                    <img className="proj-img" src={p.image} alt={p.title}/>
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'50px', background:'linear-gradient(to top,rgba(13,13,13,1),transparent)', pointerEvents:'none' }}/>
                  </div>
                  <div style={{ padding:'clamp(14px,2.5vw,20px)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
                      <h3 style={{ fontSize:'clamp(14px,2vw,17px)', fontWeight:700 }}>{p.title}</h3>
                      <span style={{ fontSize:'11px', color:'#3a3a3a' }}>{p.date}</span>
                    </div>
                    <p style={{ fontSize:'12px', color:'#555', lineHeight:1.6, marginBottom:'11px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.description}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'11px' }}>
                      {p.tech.slice(0,3).map(t => <span key={t} style={{ padding:'3px 8px', background:'rgba(250,204,21,.07)', color:'#FACC15', fontSize:'11px', letterSpacing:'0.03em' }}>{t}</span>)}
                      {p.tech.length>3 && <span style={{ padding:'3px 8px', background:'#111', color:'#444', fontSize:'11px' }}>+{p.tech.length-3}</span>}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#FACC15', fontSize:'12px', fontWeight:600 }}>
                      View Details <ExternalLink size={11}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'56px 0' }}>
              <Search size={40} style={{ color:'#222', display:'block', margin:'0 auto 13px' }}/>
              <p style={{ color:'#444', fontSize:'14px', marginBottom:'16px' }}>No projects match your criteria.</p>
              <button onClick={() => { setSearchTerm(''); setFilterCategory('all'); }} style={{ padding:'9px 20px', background:'#111', color:'#FACC15', border:'1px solid #2a2a2a', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontSize:'12px' }}>Clear Filters</button>
            </div>
          )}

          {hasMore && (
            <div style={{ textAlign:'center', marginTop:'32px' }}>
              <button className="vc-btn-y" onClick={() => setVisibleCount(v => v+6)}>
                Load More ({filtered.length-visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div onClick={() => setSelectedProject(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(12px,3vw,24px)', overflowY:'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#080808', maxWidth:'800px', width:'100%', border:'1px solid #1e1e1e', maxHeight:'92vh', overflowY:'auto' }}>
            <div style={{ position:'relative' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width:'100%', height:'clamp(180px,28vw,290px)', objectFit:'cover', display:'block' }}/>
              <button onClick={() => setSelectedProject(null)} style={{ position:'absolute', top:'12px', right:'12px', background:'rgba(0,0,0,.72)', border:'none', color:'#fff', cursor:'pointer', padding:'6px', display:'flex', transition:'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background='#FACC15'} onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,.72)'}><XCircle size={20}/></button>
              {selectedProject.featured && <div style={{ position:'absolute', top:'12px', left:'12px', background:'#FACC15', color:'#000', padding:'4px 12px', fontSize:'10px', fontWeight:700 }}>⭐ FEATURED</div>}
            </div>
            <div style={{ padding:'clamp(18px,4vw,30px)' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'12px' }}>
                <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(26px,5vw,38px)', color:'#FACC15', letterSpacing:'0.04em' }}>{selectedProject.title}</h2>
                <span style={{ fontSize:'11px', color:'#444' }}>{selectedProject.date}</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'18px' }}>
                {selectedProject.tech.map(t => <span key={t} style={{ padding:'4px 11px', background:'rgba(250,204,21,.07)', color:'#FACC15', fontSize:'12px' }}>{t}</span>)}
              </div>
              <p style={{ fontSize:'clamp(13px,1.5vw,15px)', color:'#888', lineHeight:1.8, marginBottom:'26px' }}>{selectedProject.fullDescription}</p>
              <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="vc-btn-y" style={{ textDecoration:'none' }}>
                <ExternalLink size={14}/> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      <ExperienceSection experiences={experiences}/>

      {/* CERTIFICATIONS */}
      <CertificationsSection certifications={certifications} vis={vis}/>

      {/* CONNECT */}
      <section id="connect" style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,40px)', background:'#080808' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', textAlign:'center' }}>
          <div id="conn-hdr" data-animate className={`vc-reveal${vis('conn-hdr')?' vis':''}`}>
            <div style={{ fontSize:'11px', letterSpacing:'0.4em', textTransform:'uppercase', color:'#FACC15', marginBottom:'16px' }}>Get In Touch</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(50px,10vw,126px)', lineHeight:1, color:'#FACC15', marginBottom:'16px' }}>LET'S<br/>CONNECT.</div>
            <p style={{ fontSize:'clamp(13px,2vw,17px)', color:'#555', maxWidth:'420px', margin:'0 auto clamp(36px,6vw,56px)', lineHeight:1.75 }}>Ready to work together? Get in touch and let's build something amazing.</p>
          </div>
          <div id="conn-cards" data-animate className={`vc-connect-grid vc-reveal${vis('conn-cards')?' vis':''}`} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'13px', transitionDelay:'0.13s' }}>
            {connectLinks.map((item,i) => {
              const Icon=item.icon;
              return (
                <a key={i} href={item.href} target={item.target} rel={item.target==='_blank'?'noopener noreferrer':undefined} download={item.download||undefined} className="connect-card">
                  <Icon size={36} style={{ color:'#FACC15' }}/>
                  <span style={{ fontSize:'clamp(13px,2vw,15px)', fontWeight:600 }}>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid #111', padding:'clamp(18px,3vw,26px) clamp(20px,5vw,40px)', display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap', gap:'10px' }}>
        <p style={{ fontSize:'12px', color:'#2a2a2a', transition:'color .2s', cursor:'default' }}
          onMouseEnter={e => e.target.style.color='#FACC15'} onMouseLeave={e => e.target.style.color='#2a2a2a'}>
          © 2026 Vaibhav Chaudhary. Built with passion and React.
        </p>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'17px', letterSpacing:'0.15em', color:'#141414' }}>VC</div>
      </footer>
    </div>
  );
}
