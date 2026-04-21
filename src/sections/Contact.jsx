import { useEffect, useRef } from "react";

const contactLinks = [
  {
    id: "phone",
    label: "Give me a call",
    type: "text",
    value: "934750010",
    href: "tel:+94934750010",
    color: "#00ffd1", // Cyan
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Send me an email",
    type: "text",
    value: "s.lakshan2006@gmail.com",
    href: "mailto:s.lakshan2006@gmail.com",
    color: "#ff5c7a", // Pinkish Red
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <path d="m2 4 10 8 10-8" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Professional Profile",
    type: "button",
    btnText: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/lakshan-s-a673b8379",
    color: "#3b82f6", // Blue
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "Code & Projects",
    type: "button",
    btnText: "View my GitHub",
    href: "https://github.com/Lakshan06",
    color: "#a78bfa", // Purple
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

/* ─── Individual Contact Card ───────────────────────────────── */
function ContactCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0) scale(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <a
      href={item.href}
      target={item.type === "button" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: 0,
        transform: "translateY(40px) scale(0.95)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
        textDecoration: "none",
        position: "relative",
        borderRadius: "1.5rem",
        padding: "2px",
        background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))`,
        cursor: "pointer",
        willChange: "transform",
        display: "block",
      }}
      className="contact-card-wrapper"
    >
      {/* Glow on hover */}
      <div
        className="contact-glow"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${item.color}35, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
          zIndex: 0,
          borderRadius: "1.5rem",
        }}
      />

      {/* Card Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "calc(1.5rem - 2px)",
          background: "linear-gradient(145deg, rgba(12,8,20,0.95) 0%, rgba(5,2,10,0.98) 100%)",
          backdropFilter: "blur(20px)",
          padding: "2.2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          height: "100%",
          textAlign: "center",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(145deg, rgba(20,12,35,0.95) 0%, rgba(10,5,18,0.98) 100%)";
          e.currentTarget.previousSibling.style.opacity = "1"; // Show glow
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(145deg, rgba(12,8,20,0.95) 0%, rgba(5,2,10,0.98) 100%)";
          e.currentTarget.previousSibling.style.opacity = "0"; // Hide glow
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `rgba(255,255,255,0.03)`,
            border: `1px solid rgba(255,255,255,0.08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            boxShadow: `0 8px 32px ${item.color}15`,
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease",
          }}
          className="contact-icon-wrap"
        >
          {item.icon}
        </div>

        <div style={{ width: "100%" }}>
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </p>

          {item.type === "text" ? (
            <h3
              style={{
                margin: 0,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.value}
            </h3>
          ) : (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                background: `rgba(255,255,255,0.05)`,
                border: `1px solid rgba(255,255,255,0.1)`,
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginTop: "0.2rem",
                boxShadow: `0 4px 14px ${item.color}10`,
                transition: "background 0.3s, border-color 0.3s, transform 0.3s",
              }}
              className="contact-btn"
            >
              {item.btnText}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

/* ─── Contact Section ──────────────────────────────────────── */
export default function Contact() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
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
      id="contact"
      style={{
        position: "relative",
        padding: "8rem 2rem 6rem",
        background: "linear-gradient(180deg, #000 0%, #030008 100%)",
        overflow: "hidden",
      }}
    >
      {/* Deep atmospheric glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 800,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(167,139,250,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "4.5rem",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <p
            style={{
              color: "#a78bfa",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            What's Next
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 30%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Let's Collaborate
          </h2>
          <div
            style={{
              margin: "1rem auto 0",
              width: 64,
              height: 3,
              borderRadius: 4,
              background: "linear-gradient(90deg, #a78bfa, #00ffd1)",
            }}
          />
          <p
            style={{
              maxWidth: 500,
              margin: "1.5rem auto 0",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
            }}
          >
            Whether you have a project in mind, a question, or just want to say hi,
            my inbox is always open. Let's build something amazing together.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {contactLinks.map((item, index) => (
            <ContactCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>

      {/* Footer minimal text */}
      <div
        style={{
          textAlign: "center",
          marginTop: "6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", width: "100%", maxWidth: 800, margin: "0 auto 2rem" }} />
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} Lakshan. Designed & Built with precision.
        </p>
      </div>

      {/* Global styles for this section */}
      <style>{`
        .contact-card-wrapper:hover .contact-icon-wrap {
          transform: translateY(-4px) scale(1.08) !important;
          box-shadow: 0 10px 30px rgba(255,255,255,0.08) !important;
        }
        .contact-card-wrapper:hover .contact-btn {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}