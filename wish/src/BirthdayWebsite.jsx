import { useState, useEffect, useRef } from "react";

const PHOTOS = [
  { id: 1, src: "https://picsum.photos/seed/love1/400/500", caption: "Our first adventure 💫" },
  { id: 2, src: "https://picsum.photos/seed/love2/400/500", caption: "Always laughing with you 😂" },
  { id: 3, src: "https://picsum.photos/seed/love3/400/500", caption: "My favourite person 🌹" },
  { id: 4, src: "https://picsum.photos/seed/love4/400/500", caption: "Every moment with you ✨" },
  { id: 5, src: "https://picsum.photos/seed/love5/400/500", caption: "You make life beautiful 🌸" },
  { id: 6, src: "https://picsum.photos/seed/love6/400/500", caption: "Forever and always 💕" },
];

// Replace your girlfriend's name here
const GIRLFRIEND_NAME = "My Love";
const BIRTHDAY_MESSAGE = "You are the most beautiful, amazing, and wonderful person in my world. Every single day with you feels like a dream I never want to wake up from. Happy Birthday, my love. 🌹";

function FloatingHeart({ style }) {
  return (
    <div className="floating-heart" style={style}>
      ♥
    </div>
  );
}

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function HeroSection({ name }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="hero">
      <div
        className="hero-3d-layer"
        style={{
          transform: `rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
        }}
      >
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-orb orb3" />
        <div className="crown-emoji">👑</div>
        <h1 className="hero-title">
          <span className="title-line1">Happy</span>
          <span className="title-line2">Birthday</span>
          <span className="title-name">{name}</span>
        </h1>
        <p className="hero-sub">Today the universe celebrates you 🌌</p>
        <div className="hero-hearts">
          {["💖", "💗", "💓", "💞", "💕"].map((h, i) => (
            <span key={i} className="hero-heart-icon" style={{ animationDelay: `${i * 0.3}s` }}>
              {h}
            </span>
          ))}
        </div>
      </div>
      <div className="scroll-hint">scroll down ↓</div>
    </section>
  );
}

function MessageSection({ message }) {
  return (
    <section className="message-section">
      <div className="message-card">
        <div className="card-glow" />
        <div className="message-icon">💌</div>
        <h2 className="message-title">A Note From My Heart</h2>
        <p className="message-text">{message}</p>
        <div className="message-signature">— Forever Yours ♾️</div>
      </div>
    </section>
  );
}

function PhotoCard({ photo, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="photo-card"
      style={{
        animationDelay: `${index * 0.15}s`,
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.05) translateZ(20px)`
          : "perspective(800px) rotateX(0) rotateY(0) scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
    
      <div className="photo-shine" style={{ opacity: hovered ? 1 : 0 }} />
      <img src={photo.src} alt={photo.caption} className="photo-img" loading="lazy" />
      <div className="photo-overlay" style={{ opacity: hovered ? 1 : 0 }}>
        <p className="photo-caption">{photo.caption}</p>
      </div>
      <div className="photo-frame-glow" />
    </div>
  );
}

function GallerySection({ photos }) {
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <span className="gallery-icon">📸</span>
        <h2 className="gallery-title">Our Beautiful Moments</h2>
        <p className="gallery-sub">Every photo, a memory I treasure forever</p>
      </div>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}

function CakeSection() {
  const [blown, setBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandles = () => {
    setBlown(true);
    setTimeout(() => setShowWish(true), 800);
  };

  return (
    <section className="cake-section">
      <h2 className="cake-title">Make a Wish! 🎂</h2>
      <div className="cake-3d" onClick={!blown ? blowCandles : undefined} style={{ cursor: blown ? "default" : "pointer" }}>
        <div className="cake-top">
          {!blown && (
            <div className="candles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="candle" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flame" />
                </div>
              ))}
            </div>
          )}
          {blown && <div className="smoke-puffs">🌫️✨🌫️</div>}
        </div>
        <div className="cake-layer layer1">
          <span className="cake-deco">🌸 Happy Birthday 🌸</span>
        </div>
        <div className="cake-layer layer2" />
        <div className="cake-layer layer3" />
      </div>
      {!blown && <p className="cake-hint">👆 Click the cake to blow the candles!</p>}
      {showWish && (
        <div className="wish-burst">
          <div className="wish-text">🎉 May all your wishes come true! 🎉</div>
          <div className="confetti-row">
            {["🎊", "🎉", "✨", "💖", "🌟", "🎈", "💫", "🦋"].map((e, i) => (
              <span key={i} className="confetti-emoji" style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="footer-heart">♥</div>
      <p className="footer-text">Made with infinite love for {name}</p>
      <p className="footer-sub">Today. Tomorrow. Always. 💕</p>
    </footer>
  );
}

export default function BirthdayWebsite({ name }) {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      animationDuration: `${4 + Math.random() * 6}s`,
      animationDelay: `${Math.random() * 6}s`,
      fontSize: `${14 + Math.random() * 22}px`,
      opacity: 0.15 + Math.random() * 0.4,
    },
  }));

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${3 + Math.random() * 5}px`,
      height: `${3 + Math.random() * 5}px`,
      background: ["#ff6eb4", "#ffd6e8", "#ff9ecb", "#fff", "#ffb3d4"][Math.floor(Math.random() * 5)],
    },
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@700&display=swap');

        :root {
          --rose: #ff2d6e;
          --rose-light: #ff6eb4;
          --rose-pale: #ffd6e8;
          --blush: #fff0f6;
          --deep: #1a0010;
          --wine: #5c0027;
          --gold: #ffd700;
          --gold-light: #fff3a3;
          --white: #fff;
          --glass: rgba(255,255,255,0.08);
          --glass-border: rgba(255,255,255,0.18);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: linear-gradient(135deg, #0d0008 0%, #1a0010 40%, #2d0020 70%, #1a000d 100%);
          color: var(--white);
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* FLOATING HEARTS */
        .floating-heart {
          position: fixed;
          bottom: -60px;
          color: var(--rose-light);
          animation: floatUp linear infinite;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-105vh) rotate(720deg) scale(0.5); opacity: 0; }
        }

        .particle {
          position: fixed;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes twinkle {
          from { transform: scale(0.5); opacity: 0.2; }
          to { transform: scale(1.5); opacity: 0.9; }
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .hero-3d-layer {
          transition: transform 0.1s ease;
          text-align: center;
          position: relative;
          z-index: 2;
          perspective: 1200px;
          padding: 40px;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .orb1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,45,110,0.35) 0%, transparent 70%);
          top: -150px; left: -150px;
          animation: orbPulse 4s ease-in-out infinite;
        }
        .orb2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: orbPulse 5s ease-in-out infinite reverse;
        }
        .orb3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(255,110,180,0.3) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: orbPulse 3s ease-in-out infinite;
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .crown-emoji {
          font-size: 64px;
          display: block;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px var(--gold));
          margin-bottom: 10px;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          line-height: 1;
        }
        .title-line1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 6vw, 72px);
          font-weight: 300;
          font-style: italic;
          color: var(--rose-pale);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .title-line2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(56px, 13vw, 160px);
          font-weight: 900;
          background: linear-gradient(135deg, var(--rose) 0%, var(--gold) 50%, var(--rose-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          filter: drop-shadow(0 0 40px rgba(255,45,110,0.5));
          letter-spacing: -0.02em;
          animation: shimmer 3s linear infinite;
          background-size: 200%;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .title-name {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(36px, 8vw, 96px);
          font-weight: 700;
          color: var(--gold-light);
          filter: drop-shadow(0 0 20px rgba(255,215,0,0.6));
          margin-top: -10px;
        }
        .hero-sub {
          font-size: clamp(14px, 2.5vw, 22px);
          color: rgba(255,214,232,0.8);
          margin-top: 20px;
          letter-spacing: 0.1em;
          font-style: italic;
        }
        .hero-hearts {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-top: 30px;
        }
        .hero-heart-icon {
          font-size: 28px;
          animation: heartBeat 1.2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .scroll-hint {
          position: absolute;
          bottom: 30px;
          color: rgba(255,200,220,0.5);
          font-size: 14px;
          letter-spacing: 0.2em;
          animation: fadeUpDown 2s ease-in-out infinite;
        }
        @keyframes fadeUpDown {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-6px); }
        }

        /* MESSAGE */
        .message-section {
          padding: 80px 20px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .message-card {
          background: var(--glass);
          backdrop-filter: blur(24px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 56px 60px;
          max-width: 760px;
          width: 100%;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(255,45,110,0.15), 0 30px 60px rgba(0,0,0,0.4);
          animation: cardFloat 5s ease-in-out infinite;
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,45,110,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .message-icon { font-size: 48px; margin-bottom: 16px; }
        .message-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 700;
          font-style: italic;
          background: linear-gradient(135deg, var(--rose-light), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 28px;
        }
        .message-text {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.9;
          color: rgba(255,230,240,0.9);
          font-style: italic;
          font-weight: 300;
        }
        .message-signature {
          margin-top: 32px;
          font-family: 'Dancing Script', cursive;
          font-size: 28px;
          color: var(--gold-light);
        }

        /* GALLERY */
        .gallery-section {
          padding: 80px 20px;
          position: relative;
          z-index: 1;
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .gallery-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 56px);
          font-weight: 700;
          background: linear-gradient(135deg, var(--rose-light), var(--gold), var(--rose));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }
        .gallery-sub {
          color: rgba(255,200,220,0.7);
          font-style: italic;
          font-size: 18px;
        }
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 12px;
        }
        .photo-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.7s ease both;
          box-shadow: 0 8px 32px rgba(255,45,110,0.15), 0 2px 8px rgba(0,0,0,0.4);
          background: var(--wine);
          aspect-ratio: 4/5;
        }
        .photo-card:hover {
          box-shadow: 0 24px 60px rgba(255,45,110,0.4), 0 0 40px rgba(255,215,0,0.15);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .photo-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .photo-card:hover .photo-img { transform: scale(1.08); }
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(92,0,39,0.9) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 24px;
          transition: opacity 0.3s;
          z-index: 3;
        }
        .photo-caption {
          font-family: 'Dancing Script', cursive;
          font-size: 20px;
          color: var(--white);
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .photo-frame-glow {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255,110,180,0.3);
          border-radius: 20px;
          pointer-events: none;
          z-index: 4;
        }

        /* CAKE */
        .cake-section {
          padding: 80px 20px;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .cake-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          font-style: italic;
          background: linear-gradient(135deg, var(--gold), var(--rose-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 50px;
        }
        .cake-3d {
          display: inline-block;
          cursor: pointer;
          filter: drop-shadow(0 20px 40px rgba(255,45,110,0.4));
          transition: transform 0.2s;
          animation: cakeWobble 3s ease-in-out infinite;
        }
        .cake-3d:hover { transform: scale(1.04); }
        @keyframes cakeWobble {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .cake-top {
          display: flex;
          justify-content: center;
          margin-bottom: -4px;
          min-height: 60px;
          align-items: flex-end;
        }
        .candles {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .candle {
          width: 12px;
          height: 50px;
          background: linear-gradient(to bottom, var(--rose-light), var(--wine));
          border-radius: 6px 6px 2px 2px;
          position: relative;
          animation: candleSway 2s ease-in-out infinite;
        }
        @keyframes candleSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .flame {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 18px;
          background: radial-gradient(ellipse, var(--gold) 0%, var(--rose) 60%, transparent 100%);
          border-radius: 50% 50% 30% 30%;
          animation: flameDance 0.5s ease-in-out infinite alternate;
          filter: blur(1px);
        }
        @keyframes flameDance {
          from { transform: translateX(-50%) scaleX(1) scaleY(1); }
          to { transform: translateX(-50%) scaleX(0.8) scaleY(1.1); }
        }
        .smoke-puffs {
          font-size: 32px;
          animation: smokeRise 1s ease-out both;
        }
        @keyframes smokeRise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(-10px); }
        }
        .cake-layer {
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .layer1 {
          width: 260px;
          height: 90px;
          background: linear-gradient(135deg, #ff6eb4 0%, #d4006e 50%, #ff2d6e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
          border-top: 4px solid rgba(255,255,255,0.3);
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.2);
        }
        .layer2 {
          width: 300px;
          height: 70px;
          background: linear-gradient(135deg, #fff0f6, #ffd6e8, #ffb3d4);
          border-top: 4px solid rgba(255,255,255,0.6);
          box-shadow: inset 0 -8px 20px rgba(255,45,110,0.1);
          margin-left: -20px;
        }
        .layer3 {
          width: 340px;
          height: 60px;
          background: linear-gradient(135deg, #ff2d6e, #9c0040, #ff6eb4);
          border-top: 4px solid rgba(255,255,255,0.2);
          box-shadow: inset 0 -8px 20px rgba(0,0,0,0.2), 0 10px 30px rgba(255,45,110,0.4);
          margin-left: -40px;
        }
        .cake-hint {
          margin-top: 24px;
          color: rgba(255,200,220,0.6);
          font-style: italic;
          font-size: 16px;
        }
        .wish-burst {
          margin-top: 40px;
          animation: burstIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes burstIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .wish-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 4vw, 36px);
          font-style: italic;
          background: linear-gradient(135deg, var(--gold), var(--rose-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }
        .confetti-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .confetti-emoji {
          font-size: 32px;
          display: inline-block;
          animation: confettiFly 1s ease both;
        }
        @keyframes confettiFly {
          from { opacity: 0; transform: translateY(20px) rotate(-30deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 60px 20px 40px;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,110,180,0.15);
        }
        .footer-heart {
          font-size: 48px;
          color: var(--rose);
          animation: heartBeat 1.5s ease-in-out infinite;
          display: block;
          margin-bottom: 16px;
        }
        .footer-text {
          font-family: 'Dancing Script', cursive;
          font-size: 28px;
          color: var(--rose-pale);
          margin-bottom: 8px;
        }
        .footer-sub {
          color: rgba(255,200,220,0.5);
          font-style: italic;
          font-size: 16px;
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        @media (max-width: 900px) {
          .hero-orb { display: none; }
          .title-line2 { font-size: clamp(40px, 12vw, 120px); }
          .hero-3d-layer { padding: 24px; }
        }

        @media (max-width: 600px) {
          .message-card { padding: 28px 18px; }
          .photo-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .layer1 { width: 180px; } .layer2 { width: 200px; margin-left: -12px; } .layer3 { width: 220px; margin-left: -20px; }
          .title-name { font-size: clamp(26px, 8vw, 56px); }
          .hero-sub, .gallery-sub, .cake-hint { font-size: 14px; }
          .floating-heart, .particle { display: none; }
        }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden" }}>
        {hearts.map((h) => <FloatingHeart key={h.id} style={h.style} />)}
        {particles.map((p) => <Particle key={p.id} style={p.style} />)}
        <HeroSection name={name || GIRLFRIEND_NAME} />
        <MessageSection message={BIRTHDAY_MESSAGE} />
        <GallerySection photos={PHOTOS} />
        <CakeSection />
        <Footer name={name || GIRLFRIEND_NAME} />
      </div>
    </>
  );
}
