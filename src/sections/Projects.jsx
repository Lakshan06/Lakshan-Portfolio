import { useEffect, useRef, useState } from "react";

/* ─── Project data ─────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: "DriftGuardAI",
    subtitle: "AI Governance & Model Monitoring",
    description:
      "DriftGuardAI is an intelligent AI governance and model monitoring platform that detects data drift, bias, and performance risks in deployed machine learning models. It provides real-time analytics, fairness monitoring, policy-based approvals, and explainable deployment decisions to ensure secure, compliant, and reliable AI systems.",
    tags: ["AI", "ML Monitoring", "Data Drift", "Fairness", "Python", "React"],
    icon: "🛡️",
    accent: "linear-gradient(135deg, #a78bfa, #6d28d9)",
    glowColor: "rgba(139,92,246,0.4)",
    link: null,
  },
  {
    id: 2,
    title: "MergeMind",
    subtitle: "AI-Powered GitHub Merge Conflict Resolver",
    description:
      "MergeMind is an intelligent developer tool that helps teams resolve GitHub pull request merge conflicts automatically using AI. It analyzes multiple PR changes, suggests the safest merge solution, creates auto pull requests, predicts merge risks, and provides a smart assistant for repository insights — saving developer time and reducing deployment errors.",
    tags: ["AI", "GitHub API", "Node.js", "React", "OpenAI", "DevTools"],
    icon: "🧠",
    accent: "linear-gradient(135deg, #00ffd1, #0891b2)",
    glowColor: "rgba(0,255,209,0.3)",
    link: null,
  },
  {
    id: 3,
    title: "Personal Portfolio",
    subtitle: "Interactive Developer Showcase",
    description:
      "A handcrafted personal portfolio website built from scratch with pure HTML, CSS, and JavaScript. Features fluid animations, smooth scroll navigation, a dynamic hero section, and a fully responsive layout — designed to leave a lasting impression and showcase projects with elegance.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive", "Animations"],
    icon: "🌐",
    accent: "linear-gradient(135deg, #f472b6, #a78bfa)",
    glowColor: "rgba(244,114,182,0.3)",
    link: "https://lakshan06.github.io/My-Portfolio/",
  },
  {
    id: 4,
    title: "BookSky",
    subtitle: "Smart Personal Library Manager",
    description:
      "BookSky is a beautifully designed personal library management app that lets you build and curate your own digital bookshelf. Add books with their title, author, and a personal description, then remove them whenever you're done. Whether you're an avid reader tracking favourites or a student managing references, BookSky turns your collection into a clean, searchable, always-accessible library in the cloud.",
    tags: ["Library App", "JavaScript", "Vercel", "HTML", "CSS"],
    icon: "📚",
    accent: "linear-gradient(135deg, #fbbf24, #f97316)",
    glowColor: "rgba(251,191,36,0.3)",
    link: "https://booksky-bcfd8dtsb-slakshan2006-9419s-projects.vercel.app",
  },
  {
    id: 5,
    title: "To-Do List",
    subtitle: "Minimalist Productivity App",
    description:
      "A sleek and responsive To-Do List web application built with HTML, CSS, and JavaScript. Manage your daily tasks effortlessly — add new tasks, mark them complete with satisfying animations, and delete them with a click. With a clean UI and local-state persistence, it's the perfect companion for staying productive and organized every single day.",
    tags: ["HTML", "CSS", "JavaScript", "Productivity", "GitHub Pages"],
    icon: "✅",
    accent: "linear-gradient(135deg, #34d399, #059669)",
    glowColor: "rgba(52,211,153,0.3)",
    link: "https://lakshan06.github.io/To-Do-list/",
  },
];

/* Duplicate for seamless infinite loop */
const ITEMS = [...projects, ...projects];

const CARD_GAP = 20; // px

function getCardWidth() {
  if (typeof window === 'undefined') return 380;
  const vw = window.innerWidth;
  if (vw < 480)  return vw - 40;           // mobile: full-width minus 40px margins
  if (vw < 768)  return Math.min(vw - 48, 360); // large mobile / small tablet
  return 380;                               // desktop
}

const SPEED = 0.45; // px per animation frame (slightly slower = smoother on mobile)

/* ─── Card component ────────────────────────────────────────────── */
function ProjectCard({ project, cardWidth }) {
  const isNarrow = cardWidth < 360;
  return (
    <div
      style={{
        width:      cardWidth,
        flexShrink: 0,
        borderRadius: "1.5rem",
        padding:    "2px",
        background: project.accent,
        boxShadow:  `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px ${project.glowColor}`,
        transition: "box-shadow 0.3s ease, transform 0.3s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.1), 0 32px 80px ${project.glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px ${project.glowColor}`;
      }}
    >
      {/* Inner card body */}
      <div
        style={{
          borderRadius:   "calc(1.5rem - 2px)",
          background:     "linear-gradient(145deg, rgba(10,0,20,0.96) 0%, rgba(15,5,30,0.99) 100%)",
          backdropFilter: isNarrow ? "none" : "blur(20px)",
          padding:        isNarrow ? "1.1rem 0.9rem" : "2rem",
          height:         "100%",
          display:        "flex",
          flexDirection:  "column",
          gap:            isNarrow ? "0.7rem" : "1rem",
          boxSizing:      "border-box",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div
            style={{
              width:        50,
              height:       50,
              borderRadius: "0.8rem",
              background:   project.accent,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontSize:     "1.45rem",
              flexShrink:   0,
              boxShadow:    `0 6px 20px ${project.glowColor}`,
            }}
          >
            {project.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>
              {project.title}
            </h3>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.76rem", color: "rgba(255,255,255,0.42)", fontWeight: 500, letterSpacing: "0.04em" }}>
              {project.subtitle}
            </p>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "0.3rem",
                padding:        "0.38rem 0.8rem",
                borderRadius:   "9999px",
                background:     project.accent,
                color:          "#000",
                fontSize:       "0.73rem",
                fontWeight:     700,
                textDecoration: "none",
                flexShrink:     0,
                boxShadow:      `0 4px 14px ${project.glowColor}`,
                transition:     "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${project.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 14px ${project.glowColor}`;
              }}
            >
              View ↗
            </a>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, borderRadius: 4, background: project.accent, opacity: 0.22 }} />

        {/* Description */}
        <p style={{ margin: 0, fontSize: isNarrow ? "0.78rem" : "0.868rem", lineHeight: isNarrow ? 1.6 : 1.78, color: "rgba(255,255,255,0.58)", flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.42rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding:      "0.27rem 0.68rem",
                borderRadius: "9999px",
                fontSize:     "0.7rem",
                fontWeight:   600,
                background:   "rgba(255,255,255,0.06)",
                border:       "1px solid rgba(255,255,255,0.1)",
                color:        "rgba(255,255,255,0.52)",
                letterSpacing:"0.04em",
                transition:   "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background   = "rgba(167,139,250,0.15)";
                e.currentTarget.style.borderColor  = "rgba(167,139,250,0.5)";
                e.currentTarget.style.color        = "#c4b5fd";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background   = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor  = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color        = "rgba(255,255,255,0.52)";
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel ──────────────────────────────────────────────────── */
function Carousel() {
  const trackRef   = useRef(null);
  const posRef     = useRef(0);
  const rafRef     = useRef(null);
  const pausedRef  = useRef(false);

  // Reactive card width — recalculates on resize
  const [cardWidth, setCardWidth] = useState(getCardWidth);

  useEffect(() => {
    const onResize = () => setCardWidth(getCardWidth());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobileView = cardWidth < 380;
  const step     = cardWidth + CARD_GAP;
  const halfList = projects.length * step;
  const halfListRef = useRef(halfList);
  useEffect(() => { halfListRef.current = halfList; }, [halfList]);

  /* drag state */
  const dragging   = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  /* ── Animation loop ── */
  useEffect(() => {
    const animate = () => {
      // Skip frames when tab is not visible to avoid stale accumulation
      if (document.visibilityState !== 'hidden' && !pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= halfListRef.current) {
          posRef.current -= halfListRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Mouse drag handlers ── */
  const onMouseDown = (e) => {
    dragging.current   = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    pausedRef.current  = true;
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.clientX;
    let next    = dragStartPos.current + delta;
    next = ((next % halfListRef.current) + halfListRef.current) % halfListRef.current;
    posRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next}px)`;
    }
  };

  const onMouseUp = () => {
    if (!dragging.current) return;
    dragging.current  = false;
    setIsDragging(false);
    pausedRef.current = false;
  };

  /* touch support */
  const onTouchStart = (e) => {
    dragStartX.current   = e.touches[0].clientX;
    dragStartPos.current = posRef.current;
    pausedRef.current    = true;
  };

  const onTouchMove = (e) => {
    const delta = dragStartX.current - e.touches[0].clientX;
    let next    = dragStartPos.current + delta;
    next = ((next % halfListRef.current) + halfListRef.current) % halfListRef.current;
    posRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next}px)`;
    }
  };

  const onTouchEnd = () => {
    pausedRef.current = false;
  };

  /* pause auto-scroll when mouse is anywhere on the carousel */
  const onMouseEnterCarousel = () => {
    if (!dragging.current) pausedRef.current = true;
  };
  const onMouseLeaveCarousel = () => {
    dragging.current  = false;
    setIsDragging(false);
    pausedRef.current = false;
  };

  return (
    <div
      style={{
        overflow:    "hidden",
        width:       "100%",
        padding:     "2rem 0",
        cursor:      isDragging ? "grabbing" : "grab",
        userSelect:  "none",
        touchAction: "pan-y",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeaveCarousel}
      onMouseEnter={onMouseEnterCarousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          gap:        CARD_GAP,
          willChange: "transform",
          /* On mobile: indent first card so it has breathing room from screen edge */
          paddingLeft: isMobileView ? 16 : 0,
        }}
      >
        {ITEMS.map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} cardWidth={cardWidth} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function Projects() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      style={{
        position:   "relative",
        padding:    "7rem 0",
        overflow:   "hidden",
        background: "linear-gradient(180deg, #000 0%, #05000f 50%, #000 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 55% 45% at 15% 30%, rgba(138,92,255,0.10) 0%, transparent 70%), " +
            "radial-gradient(ellipse 50% 40% at 85% 70%, rgba(0,255,209,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating blobs */}
      <div style={{
        position:"absolute", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(109,40,217,0.11) 0%, transparent 70%)",
        top:"5%", right:"-12%", animation:"blobFloat 14s ease-in-out infinite",
        pointerEvents:"none",
      }} />
      <div style={{
        position:"absolute", width:360, height:360, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(0,200,160,0.08) 0%, transparent 70%)",
        bottom:"8%", left:"-10%", animation:"blobFloat 18s ease-in-out 4s infinite reverse",
        pointerEvents:"none",
      }} />

      {/* Section heading */}
      <div
        ref={titleRef}
        style={{
          textAlign:  "center",
          marginBottom:"3.5rem",
          padding:    "0 2rem",
          opacity:    0,
          transform:  "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <p style={{
          color:"#a78bfa", fontSize:"0.8rem", fontWeight:600,
          letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:"0.5rem",
        }}>
          What I've Built
        </p>
        <h2 style={{
          fontSize:"clamp(2rem, 5vw, 3rem)", fontWeight:800, margin:0,
          background:"linear-gradient(135deg, #fff 40%, #c084fc 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>
          Featured Projects
        </h2>
        <div style={{
          margin:"0.8rem auto 0", width:56, height:3, borderRadius:4,
          background:"linear-gradient(90deg, #a78bfa, #00ffd1)",
        }} />

        {/* Hint */}
        <p style={{
          marginTop:"1.2rem", fontSize:"0.78rem",
          color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em",
          display:"flex", alignItems:"center", justifyContent:"center", gap:"0.4rem",
        }}>
          <span style={{ fontSize:"0.9rem" }}>←</span>
          drag to explore
          <span style={{ fontSize:"0.9rem" }}>→</span>
        </p>
      </div>

      {/* Edge fade masks — narrower on mobile so the card isn't hidden */}
      <div style={{
        position:"absolute", top:0, left:0, width:"min(80px, 6vw)", height:"100%",
        background:"linear-gradient(to right, #000, transparent)",
        pointerEvents:"none", zIndex:10,
      }} />
      <div style={{
        position:"absolute", top:0, right:0, width:"min(80px, 6vw)", height:"100%",
        background:"linear-gradient(to left, #000, transparent)",
        pointerEvents:"none", zIndex:10,
      }} />

      {/* Carousel — no extra left padding so first card is fully visible */}
      <div style={{ paddingLeft: 0 }}>
        <Carousel />
      </div>

      <style>{`
        @keyframes blobFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(28px,-28px) scale(1.05); }
          66%      { transform: translate(-18px,18px) scale(0.97); }
        }
      `}</style>
    </section>
  );
}