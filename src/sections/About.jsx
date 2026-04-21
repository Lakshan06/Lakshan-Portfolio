import { useEffect, useRef } from "react";
import profileImg from "../assets/image1.png";

export default function About() {
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const contentRef  = useRef(null);

  /* ── Scroll-driven parallax / fade for image ── */
  useEffect(() => {
    const section  = sectionRef.current;
    const imgWrap  = imgWrapRef.current;
    const content  = contentRef.current;
    if (!section || !imgWrap || !content) return;

    const onScroll = () => {
      const rect     = section.getBoundingClientRect();
      const vh       = window.innerHeight;

      // progress: 0 when section top enters viewport, 1 when section bottom leaves
      const rawProg  = 1 - rect.bottom / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, rawProg));

      /* Image: slides up 30 px and fades at top, fades in from bottom */
      const enterFade = Math.min(1, (1 - rect.top / vh) * 2.5);          // fade in bottom
      const exitFade  = Math.max(0, 1 - Math.max(0, progress - 0.65) * 6); // fade out top
      const opacity   = Math.min(enterFade, exitFade);
      const translateY = (progress - 0.25) * -38; // gentle upward drift

      imgWrap.style.opacity   = opacity.toFixed(3);
      imgWrap.style.transform = `translateY(${translateY.toFixed(2)}px)`;

      /* Content: fade/slide in from right */
      const contentEnter = Math.min(1, (1 - rect.top / vh) * 2);
      content.style.opacity   = Math.max(0, contentEnter).toFixed(3);
      content.style.transform = `translateX(${(1 - Math.min(1, contentEnter)) * 40}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position:   "relative",
        padding:    "7rem 2rem",
        overflow:   "hidden",
        background: "linear-gradient(180deg, #000 0%, #0a0010 60%, #000 100%)",
      }}
    >
      {/* ── Background ambient glow ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(138,92,255,0.12) 0%, transparent 70%), " +
          "radial-gradient(ellipse 50% 40% at 80% 40%, rgba(0,255,209,0.07) 0%, transparent 70%)",
      }} />

      {/* ── Section title ── */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ color: "#a78bfa", fontSize: "0.85rem", fontWeight: 600,
                    letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Who I am
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
          background: "linear-gradient(135deg, #fff 40%, #c084fc 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: 0,
        }}>
          About Me
        </h2>
        {/* Underline accent */}
        <div style={{
          margin: "0.75rem auto 0",
          width: 56, height: 3, borderRadius: 4,
          background: "linear-gradient(90deg, #a78bfa, #00ffd1)",
        }} />
      </div>

      {/* ── Two-column layout ── */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "4rem",
        alignItems: "center",
      }}>

        {/* ═══════ LEFT — Image column ═══════ */}
        <div
          ref={imgWrapRef}
          style={{
            position:   "relative",
            display:    "flex",
            justifyContent: "center",
            willChange: "transform, opacity",
            transition: "transform 0.05s linear", // smooth out RAF gaps
          }}
        >
          {/* Rotating ring */}
          <div className="about-ring" style={{
            position: "absolute",
            inset: -18,
            borderRadius: "50%",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            zIndex: 0,
          }}>
            <div style={{
              position: "absolute", inset: -2, borderRadius: "50%",
              background: "conic-gradient(from 0deg, #a78bfa, #00ffd1, #ff5c7a, #a78bfa)",
              zIndex: -1,
              animation: "spinRing 6s linear infinite",
              WebkitMaskImage: "radial-gradient(transparent 70%, black 71%)",
              maskImage: "radial-gradient(transparent 70%, black 71%)",
            }} />
          </div>

          {/* Glow orb behind image */}
          <div style={{
            position: "absolute",
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(138,92,255,0.35) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            animation: "pulseGlow 3s ease-in-out infinite",
            zIndex: 0,
          }} />

          {/* Frosted card frame */}
          <div
            className="about-img-card"
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "2rem 2rem 2rem 0.5rem",
              padding: 6,
              background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(0,255,209,0.15))",
              boxShadow: "0 30px 80px rgba(138,92,255,0.25), 0 8px 24px rgba(0,0,0,0.6)",
              cursor: "pointer",
              transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = "scale(1.03) rotate(-1deg)";
              e.currentTarget.style.boxShadow  =
                "0 40px 100px rgba(138,92,255,0.4), 0 12px 32px rgba(0,0,0,0.7)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow  =
                "0 30px 80px rgba(138,92,255,0.25), 0 8px 24px rgba(0,0,0,0.6)";
            }}
          >
            {/* Bottom fade mask — image fades out into nothing at the bottom */}
            <div style={{
              position: "absolute", bottom: 6, left: 6, right: 6,
              height: "35%", borderRadius: "0 0 1.6rem 0.1rem",
              background: "linear-gradient(to bottom, transparent 0%, rgba(10,0,16,0.85) 100%)",
              zIndex: 2, pointerEvents: "none",
            }} />

            <img
              src={profileImg}
              alt="Lakshan — Full Stack Developer"
              style={{
                display:      "block",
                width:        "100%",
                maxWidth:     340,
                height:       "auto",
                borderRadius: "1.6rem 1.6rem 1.6rem 0.2rem",
                objectFit:    "cover",
                filter:       "contrast(1.05) brightness(1.03)",
                animation:    "floatImg 5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Experience badge */}
          <div style={{
            position: "absolute", bottom: 24, right: -8,
            background: "rgba(10,0,24,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(167,139,250,0.35)",
            borderRadius: "1rem",
            padding: "0.6rem 1rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            zIndex: 3,
            animation: "badgeBounce 3.5s ease-in-out 1s infinite",
          }}>
            <span style={{ fontSize: "1.3rem" }}>✨</span>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600, letterSpacing: "0.05em" }}>
                PROFILE
              </div>
              <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 700 }}>
                Fresh Talent
              </div>
            </div>
          </div>

          {/* Stack badge */}
          <div style={{
            position: "absolute", top: 16, left: -8,
            background: "rgba(10,0,24,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,255,209,0.3)",
            borderRadius: "1rem",
            padding: "0.5rem 0.9rem",
            display: "flex", alignItems: "center", gap: "0.45rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            zIndex: 3,
            animation: "badgeBounce 3.5s ease-in-out infinite",
          }}>
            <span style={{ fontSize: "1.1rem" }}>⚡</span>
            <span style={{ fontSize: "0.82rem", color: "#00ffd1", fontWeight: 700 }}>
              Full Stack
            </span>
          </div>
        </div>

        {/* ═══════ RIGHT — Content column ═══════ */}
        <div
          ref={contentRef}
          style={{ willChange: "transform, opacity" }}
        >
          <p style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.7)",
            marginTop: 0,
          }}>
            I am a dedicated and growth-oriented professional with a strong passion for creating meaningful digital experiences and solving real-world problems through innovation. I value consistency, creativity, and continuous improvement, always striving to learn, adapt, and deliver high-quality results. With a forward-thinking mindset and attention to detail, I aim to contribute to impactful projects while constantly evolving both personally and professionally.
          </p>

          {/* ── Skill chips ── */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "2rem",
          }}>
            {["React", "HTML", "CSS", "JavaScript", "Java", "SQL", "Figma", "TailwindCSS"].map(s => (
              <span
                key={s}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: "1px solid rgba(167,139,250,0.3)",
                  background: "rgba(167,139,250,0.08)",
                  color: "#c4b5fd",
                  letterSpacing: "0.03em",
                  transition: "background 0.2s, border-color 0.2s, color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background    = "rgba(167,139,250,0.2)";
                  e.currentTarget.style.borderColor   = "rgba(167,139,250,0.7)";
                  e.currentTarget.style.color         = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background    = "rgba(167,139,250,0.08)";
                  e.currentTarget.style.borderColor   = "rgba(167,139,250,0.3)";
                  e.currentTarget.style.color         = "#c4b5fd";
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* ── CTA ── */}
          <a
            href="#projects"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.5rem",
              marginTop:      "2.2rem",
              padding:        "0.75rem 1.75rem",
              borderRadius:   "9999px",
              background:     "linear-gradient(135deg, #a78bfa, #00ffd1)",
              color:          "#000",
              fontWeight:     700,
              fontSize:       "0.9rem",
              textDecoration: "none",
              boxShadow:      "0 4px 24px rgba(167,139,250,0.35)",
              transition:     "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = "translateY(-2px)";
              e.currentTarget.style.boxShadow  = "0 8px 32px rgba(167,139,250,0.55)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = "translateY(0)";
              e.currentTarget.style.boxShadow  = "0 4px 24px rgba(167,139,250,0.35)";
            }}
          >
            See my projects <span style={{ fontSize: "1.1rem" }}>→</span>
          </a>
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1);    }
          50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.15); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes badgeBounce {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}