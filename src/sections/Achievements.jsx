import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Detect touch-primary device (hover:none) ──────────────
   Uses the CSS media-feature that is true on phones/tablets.
   Runs once on mount; stable for the session.              */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

import vibeathon1 from "../assets/vibeathon1.jpg";
import vibeathon2 from "../assets/vibeathon2.jpg";
import vibeathon3 from "../assets/vibeathon3.jpg";
import inno2      from "../assets/inno2.jpg";
import inno3      from "../assets/inno3.jpg";
import inno4      from "../assets/inno4.jpg";
import inno5      from "../assets/inno5.jpg";
import dhan1      from "../assets/dhan1.jpg";
import dhan2      from "../assets/dhan2.jpg";
import vibestate1 from "../assets/vibestate1.jpg";
import ec1        from "../assets/ec1.jpg";

/* ─── CSS injected once ────────────────────────────────────── */
const STYLES = `
  @keyframes ach-close-pop {
    from { opacity:0; transform: scale(0.6); }
    to   { opacity:1; transform: scale(1);   }
  }
  .ach-close-btn {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
    animation: ach-close-pop 0.25s cubic-bezier(0.22,1,0.36,1) forwards;
    pointer-events: all;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .ach-close-btn:active {
    background: rgba(255,255,255,0.18);
    transform: scale(0.9);
  }
  /* On touch devices remove the shimmer (it won't fire on tap anyway) */
  @media (hover: none) and (pointer: coarse) {
    .ach-card-inner::after { display: none; }
  }

  @keyframes ach-pulse-dot {
    0%,100% { opacity:.35; transform:scale(1);   }
    50%      { opacity:1;   transform:scale(1.5); }
  }
  @keyframes ach-blob-float {
    0%,100% { transform: translateY(0)   scale(1);    }
    50%      { transform: translateY(-22px) scale(1.04); }
  }
  @keyframes ach-shimmer {
    0%   { left: -110%; }
    100% { left:  110%; }
  }
  @keyframes ach-card-in-up {
    from { opacity:0; transform: translateY(70px) scale(0.94); }
    to   { opacity:1; transform: translateY(0)    scale(1);    }
  }
  @keyframes ach-card-in-left {
    from { opacity:0; transform: translateX(-60px) scale(0.94); }
    to   { opacity:1; transform: translateX(0)     scale(1);    }
  }
  @keyframes ach-card-in-right {
    from { opacity:0; transform: translateX(60px) scale(0.94); }
    to   { opacity:1; transform: translateX(0)    scale(1);    }
  }
  @keyframes ach-title-in {
    from { opacity:0; transform: translateY(28px); }
    to   { opacity:1; transform: translateY(0);    }
  }
  @keyframes ach-line-grow {
    from { width: 0; }
    to   { width: 54px; }
  }

  .ach-card {
    opacity: 0;
    position: relative;
    border-radius: 1.35rem;
    padding: 1px;
    cursor: default;
    will-change: transform, box-shadow;
  }
  .ach-card.visible-up    { animation: ach-card-in-up    0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ach-card.visible-left  { animation: ach-card-in-left  0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ach-card.visible-right { animation: ach-card-in-right 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }

  .ach-card-inner {
    border-radius: calc(1.35rem - 1px);
    background: linear-gradient(160deg, rgba(18,18,30,0.94) 0%, rgba(8,8,18,0.98) 100%);
    backdrop-filter: blur(16px);
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    box-sizing: border-box;
    transition: transform 0.38s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    overflow: hidden;
  }
  .ach-card:hover .ach-card-inner {
    transform: translateY(-7px);
  }

  /* shimmer sweep */
  .ach-card-inner::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 60%;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.055) 50%, transparent 70%);
    left: -110%;
    pointer-events: none;
    z-index: 99;
  }
  .ach-card:hover .ach-card-inner::after {
    animation: ach-shimmer 0.65s ease-in-out forwards;
  }

  /* glow ring border */
  .ach-card-border {
    position: absolute;
    inset: 0;
    border-radius: 1.35rem;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }
  .ach-card:hover .ach-card-border { opacity: 1 !important; }

  /* radial top glow */
  .ach-top-glow {
    position: absolute;
    inset: 0;
    border-radius: 1.35rem;
    opacity: 0;
    transition: opacity 0.45s ease;
    pointer-events: none;
    z-index: 0;
  }
  .ach-card:hover .ach-top-glow { opacity: 1; }

  .ach-title-wrap {
    text-align: center;
    margin-bottom: 4.5rem;
    opacity: 0;
  }
  .ach-title-wrap.visible {
    animation: ach-title-in 0.85s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .ach-title-line {
    margin: 0.85rem auto 0;
    height: 3px;
    border-radius: 4px;
    background: linear-gradient(90deg, #a78bfa, #00ffd1);
    width: 0;
  }
  .ach-title-wrap.visible .ach-title-line {
    animation: ach-line-grow 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* hover-cue dot */
  .ach-pulse-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    animation: ach-pulse-dot 1.8s ease-in-out infinite;
  }
`;

/* ─── Achievement Data ─────────────────────────────────── */
const achievements = [
  {
    id: 1,
    title: "Vibeathon — Hackathon",
    event: "Vibe with Singularity · Thoughtworks, Gurugram",
    date: "2026",
    badge: "Top 27 / 750+ Teams",
    icon: "⚡",
    color: "#f59e0b",
    description:
      "Selected as Finalists at the Ultimate Vibeathon by Thoughtworks — breaking into the Top 27 out of 750+ competing teams. We built DriftGuardAI, an AI model monitoring platform that detects model drift and ensures reliable, real-world AI systems in production. An electrifying benchmark of innovation, speed, and collaboration.",
    images: [vibeathon1, vibeathon2, vibeathon3],
  },
  {
    id: 2,
    title: "InnoHack '26 — Hackathon",
    event: "VIT Hackathon · Team Slytherin",
    date: "2026",
    badge: "Top 21 Finalists",
    icon: "🚀",
    color: "#6366f1",
    description:
      "Advanced to the Finals of VIT's InnoHack '26 among 21 elite teams. We engineered EduFinAI — an AI-driven, explainable financial workflow automation system for educational institutions, built on fairness, compliance, and human-in-the-loop decision making.",
    images: [inno2, inno3, inno4, inno5],
  },
  {
    id: 3,
    title: "Lycian '26 — National Symposium",
    event: "Dhanalakshmi College of Engineering",
    date: "2026",
    badge: "2nd Place × 2 Events",
    icon: "🏆",
    color: "#10b981",
    description:
      "Secured 2nd Place in both technical events — Prompt to Produce and Quiz Rush — at a National Level Symposium, earning cash prizes and trophies. My first symposium, and a defining experience that supercharged my competitive mindset and technical confidence.",
    images: [dhan1, dhan2],
  },
  {
    id: 4,
    title: "Vibestate — Hackathon",
    event: "Vibestate Challenge · Open Category",
    date: "2026",
    badge: "Top 10 / 200+ Teams",
    icon: "🥇",
    color: "#ec4899",
    description:
      "Finished in the Top 10 out of 200+ teams as Finalists at Vibestate. Our project DriftGuardAI delivers intelligent AI governance — detecting data drift, bias, and performance risks in deployed ML models with real-time analytics and explainable deployment decisions.",
    images: [vibestate1],
  },
  {
    id: 5,
    title: "ECLearnix — Hackathon",
    event: "Product & Innovation 360° Challenge",
    date: "2025",
    badge: "Finalist",
    icon: "🎨",
    color: "#00ffd1",
    description:
      "Selected as a Finalist in the ECLearnix Hackathon. As lead designer, I crafted the full Figma prototype and product presentation for an educational app built to make accessible learning mainstream — merging design thinking with real-world impact.",
    images: [ec1],
  },
];

/* direction pattern: up / left / right / up / left */
const DIRECTIONS = ["up", "left", "right", "up", "left"];

/* ─── Image Overlay ──────────────────────────────────────── */
/* onClose is only passed on touch devices; undefined on desktop */
function ImageOverlay({ images, visible, onClose }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible && images.length > 1) {
      timerRef.current = setInterval(
        () => setIdx((i) => (i + 1) % images.length),
        1500
      );
    } else {
      clearInterval(timerRef.current);
      setIdx(0);
    }
    return () => clearInterval(timerRef.current);
  }, [visible, images.length]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "1.35rem",
        overflow: "hidden",
        zIndex: 20,
        opacity: visible ? 1 : 0,
        /* on touch: allow tapping the close btn; on desktop: no pointer events */
        pointerEvents: onClose && visible ? "all" : "none",
        transition: "opacity 0.52s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.85s ease",
          }}
        />
      ))}

      {/* gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
        }}
      />

      {/* ✕ close button — only rendered on touch devices */}
      {onClose && visible && (
        <button
          className="ach-close-btn"
          aria-label="Close photo"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          ✕
        </button>
      )}

      {/* photo counter pill */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "2rem",
            padding: "0.28rem 0.72rem",
            fontSize: "0.68rem",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.1em",
            pointerEvents: "none",
          }}
        >
          {idx + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

/* ─── Achievement Card ───────────────────────────────────── */
function AchievementCard({ achievement, index }) {
  const cardRef  = useRef(null);
  const isTouch  = useIsTouchDevice();
  const [active, setActive] = useState(false); // shared: hover on desktop, tap on mobile
  const dir   = DIRECTIONS[index % DIRECTIONS.length];
  const delay = `${index * 0.11}s`;

  /* Intersection → add animation class */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = delay;
          el.classList.add(`visible-${dir}`);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [dir, delay]);

  /* ── Desktop-only: 3-D tilt on mouse move ── */
  const onMouseMove = useCallback((e) => {
    if (isTouch) return; // never runs on touch device
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y = (e.clientY - rect.top)   / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }, [isTouch]);

  const onMouseLeave = useCallback(() => {
    if (isTouch) return;
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
    setActive(false);
  }, [isTouch]);

  /* ── Touch-only: tap to toggle overlay ── */
  const onTap = useCallback((e) => {
    if (!isTouch) return;
    e.preventDefault(); // suppress ghost mouse events
    setActive((v) => !v);
  }, [isTouch]);

  const closeOverlay = useCallback(() => setActive(false), []);

  return (
    <div
      ref={cardRef}
      className="ach-card"
      style={{
        background: active
          ? `linear-gradient(135deg, ${achievement.color}70, rgba(255,255,255,0.08))`
          : "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))",
        boxShadow: active
          ? `0 24px 70px ${achievement.color}28, 0 0 0 0.5px ${achievement.color}40`
          : "0 6px 28px rgba(0,0,0,0.45)",
        transition: "box-shadow 0.4s ease, background 0.4s ease, transform 0.22s ease",
        animationDelay: delay,
        /* tell mobile browser this is a tap target */
        touchAction: "manipulation",
      }}
      /* ── Desktop events ── */
      onMouseEnter={isTouch ? undefined : () => setActive(true)}
      onMouseMove={isTouch ? undefined : onMouseMove}
      onMouseLeave={isTouch ? undefined : onMouseLeave}
      /* ── Touch event ── */
      onTouchEnd={isTouch ? onTap : undefined}
    >
      {/* image overlay — pass onClose only for touch so the ✕ button appears */}
      <ImageOverlay
        images={achievement.images}
        visible={active}
        onClose={isTouch ? closeOverlay : undefined}
      />

      {/* top glow */}
      <div
        className="ach-top-glow"
        style={{
          background: `radial-gradient(circle at 50% -10%, ${achievement.color}35, transparent 65%)`,
        }}
      />

      {/* card body */}
      <div className="ach-card-inner" style={{ position: "relative", zIndex: 1 }}>

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: `${achievement.color}18`,
              border: `1.5px solid ${achievement.color}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              boxShadow: `0 4px 18px ${achievement.color}35`,
              flexShrink: 0,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transform: active ? "scale(1.12) rotate(-6deg)" : "scale(1) rotate(0deg)",
            }}
          >
            {achievement.icon}
          </div>

          <span
            style={{
              fontSize: "0.63rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: achievement.color,
              background: `${achievement.color}15`,
              border: `1px solid ${achievement.color}40`,
              borderRadius: "2rem",
              padding: "0.3rem 0.72rem",
              whiteSpace: "nowrap",
              boxShadow: active ? `0 0 14px ${achievement.color}30` : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {achievement.badge}
          </span>
        </div>

        {/* title block */}
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.07rem",
              fontWeight: 800,
              color: active ? "#fff" : "rgba(255,255,255,0.92)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            {achievement.title}
          </h3>
          <p
            style={{
              margin: "0.3rem 0 0",
              fontSize: "0.71rem",
              color: achievement.color,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {achievement.event}
          </p>
          <p
            style={{
              margin: "0.15rem 0 0",
              fontSize: "0.67rem",
              color: "rgba(255,255,255,0.32)",
              fontWeight: 500,
            }}
          >
            {achievement.date}
          </p>
        </div>

        {/* divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${achievement.color}50, transparent)`,
            transition: "opacity 0.3s",
            opacity: active ? 1 : 0.5,
          }}
        />

        {/* description */}
        <p
          style={{
            margin: 0,
            fontSize: "0.83rem",
            lineHeight: 1.72,
            color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.52)",
            flex: 1,
            transition: "color 0.35s ease",
          }}
        >
          {achievement.description}
        </p>

        {/* interaction cue — adapts label to device */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.66rem",
            color: achievement.color,
            fontWeight: 700,
            letterSpacing: "0.08em",
            opacity: active ? 0 : 0.55,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            className="ach-pulse-dot"
            style={{ background: achievement.color }}
          />
          {isTouch ? "TAP TO VIEW PHOTOS" : "HOVER TO VIEW PHOTOS"}
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Achievements() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      style={{
        position: "relative",
        padding: "7rem 2rem",
        background: "linear-gradient(180deg, #000 0%, #07040f 50%, #000 100%)",
        overflow: "hidden",
      }}
    >
      {/* inject keyframes + utility classes */}
      <style>{STYLES}</style>

      {/* floating ambient blobs */}
      {[
        { top:"12%",  left:"-8%",  size:380, color:"rgba(167,139,250,0.07)", dur:"8s",  dir:"normal"  },
        { bottom:"8%",right:"-6%", size:440, color:"rgba(0,255,209,0.05)",   dur:"11s", dir:"reverse" },
        { top:"52%",  left:"42%",  size:300, color:"rgba(236,72,153,0.04)",  dur:"13s", dir:"normal"  },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            filter: "blur(55px)",
            pointerEvents: "none",
            animation: `ach-blob-float ${b.dur} ease-in-out infinite ${b.dir}`,
          }}
        />
      ))}

      {/* ── Section Title ── */}
      <div ref={titleRef} className="ach-title-wrap">
        <p
          style={{
            color: "#a78bfa",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
        >
          Milestones &amp; Recognition
        </p>

        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #fff 35%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Achievements
        </h2>

        {/* animated underline bar */}
        <div className="ach-title-line" />

        <p
          style={{
            marginTop: "1.2rem",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.35)",
            maxWidth: 430,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>📸</span>
          Hover any card to reveal photos from the event
        </p>
      </div>

      {/* ── Grid ── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: "1.8rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {achievements.map((a, i) => (
          <AchievementCard key={a.id} achievement={a} index={i} />
        ))}
      </div>
    </section>
  );
}
