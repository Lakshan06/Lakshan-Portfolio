import { useEffect, useRef } from "react";
import ColorBends from "../components/ColorBends";
import FuzzyText from "../components/FuzzyText";

/**
 * Renders FuzzyText at a FIXED font size (max quality canvas),
 * then uses CSS transform:scale() to fit the container.
 *
 * All scaling is done via direct DOM mutation — zero React re-renders
 * on resize → buttery smooth, no canvas re-init, no letter clipping.
 */
function ResponsiveFuzzy({ sectionRef, fontSize, children, ...fuzzyProps }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section  = sectionRef.current;
    if (!wrapper || !section) return;

    let rafId;

    const applyScale = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const canvas = wrapper.querySelector("canvas");
        if (!canvas) return;

        // Natural canvas display width (no CSS stretching since we set display:block)
        const canvasW = canvas.offsetWidth || canvas.width;
        if (!canvasW) return;

        // Available width = section width minus horizontal padding (16px each side)
        const available = section.clientWidth - 32;
        const scale = canvasW > available ? available / canvasW : 1;

        wrapper.style.transform = `scale(${scale.toFixed(5)})`;
        // Pull the layout footprint inward so siblings aren't pushed apart
        const shrink = (canvasW - canvasW * scale) / 2;
        wrapper.style.marginLeft  = `-${shrink.toFixed(2)}px`;
        wrapper.style.marginRight = `-${shrink.toFixed(2)}px`;
      });
    };

    // FuzzyText init is async — wait a tick for the canvas to be drawn
    const t = setTimeout(applyScale, 80);

    const ro = new ResizeObserver(applyScale);
    ro.observe(section);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  // Re-run when font size or text changes (canvas will be new)
  }, [sectionRef, fontSize, children]);

  return (
    <div
      ref={wrapperRef}
      style={{
        display: "inline-block",
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      <FuzzyText fontSize={fontSize} {...fuzzyProps}>
        {children}
      </FuzzyText>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    >
      {/* ── Full-screen ReactBit ColorBends background ── */}
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        autoRotate={0}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.38)",
          pointerEvents: "none",
        }}
      />

      {/* ── Hero content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1rem",
          gap: "0.25rem",
          pointerEvents: "none",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* ── Main heading — fixed 88 px canvas, CSS-scaled to fit ── */}
        <div style={{ pointerEvents: "auto" }}>
          <ResponsiveFuzzy
            sectionRef={sectionRef}
            fontSize={88}
            fontWeight={800}
            color="#ffffff"
            baseIntensity={0.15}
            hoverIntensity={0.5}
            enableHover
            gradient={["#ffffff", "#d4b4fe", "#ffffff"]}
            direction="horizontal"
            fuzzRange={28}
            fps={30}
            transitionDuration={300}
            className="fuzzy-canvas"
          >
            Hi, I&apos;m Lakshan
          </ResponsiveFuzzy>
        </div>

        {/* ── Subtitle — fixed 22 px canvas, CSS-scaled to fit ── */}
        <div style={{ pointerEvents: "auto", marginTop: "0.4rem" }}>
          <ResponsiveFuzzy
            sectionRef={sectionRef}
            fontSize={22}
            fontWeight={400}
            color="rgba(255,255,255,0.78)"
            baseIntensity={0.08}
            hoverIntensity={0.35}
            enableHover
            direction="horizontal"
            fuzzRange={14}
            fps={30}
            transitionDuration={300}
            className="fuzzy-canvas"
          >
            Modern Web Developer  |  Digital Architect
          </ResponsiveFuzzy>
        </div>

        {/* ── CTA button ── */}
        <a
          href="#about"
          className="hero-cta-btn"
          style={{ pointerEvents: "auto", marginTop: "1.25rem" }}
        >
          <span className="hero-cta-text">Explore my work</span>
          <svg className="hero-cta-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>

        {/* Local styled component for extreme interactivity */}
        <style>{`
          .hero-cta-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.65rem;
            padding: 0.8rem 2.2rem;
            border-radius: 9999px;
            text-decoration: none;
            color: #fff;
            font-size: clamp(0.85rem, 3vw, 0.95rem);
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 10;
          }
          .hero-cta-btn::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(138, 92, 255, 0.35), rgba(0, 255, 209, 0.25));
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: -1;
          }
          .hero-cta-btn:hover {
            transform: translateY(-4px) scale(1.03);
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 10px 40px rgba(138, 92, 255, 0.25), 0 0 20px rgba(0, 255, 209, 0.15);
            padding-left: 2.5rem;
            padding-right: 1.9rem;
          }
          .hero-cta-btn:hover::before {
            opacity: 1;
          }
          .hero-cta-arrow {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
          }
          @keyframes bounceDown {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(3.5px); }
          }
          .hero-cta-btn .hero-cta-arrow {
            animation: bounceDown 2.2s infinite ease-in-out;
          }
          .hero-cta-btn:hover .hero-cta-arrow {
            animation: none;
            transform: translateY(4px) scale(1.15);
            color: #00ffd1;
          }
        `}</style>
      </div>
    </section>
  );
}