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
            Full Stack Developer  |  AI Enthusiast
          </ResponsiveFuzzy>
        </div>

        {/* ── CTA button ── */}
        <a
          href="#about"
          style={{
            pointerEvents: "auto",
            marginTop: "1.75rem",
            padding: "0.65rem 1.75rem",
            borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,0.4)",
            color: "#fff",
            fontSize: "clamp(0.8rem, 3vw, 0.95rem)",
            fontWeight: 600,
            textDecoration: "none",
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.08)",
            transition: "background 0.25s, border-color 0.25s",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
        >
          Explore my work ↓
        </a>
      </div>
    </section>
  );
}