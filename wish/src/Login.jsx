import { useState, useRef } from 'react';

// Change this to whatever password you want to require
const REQUIRED_PASSWORD = 'Rasmalai';

export default function Login({ onLogin }) {
  const [step, setStep] = useState('question'); // 'question' or 'form'
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // position state for the evasive No button (percentages)
  const [noPos, setNoPos] = useState({ left: 60, top: 50 });
  const wrapRef = useRef(null);

  const moveNo = () => {
    // pick random positions within [5, 85] percent to stay inside view
    const left = 8 + Math.random() * 84;
    const top = 20 + Math.random() * 60;
    setNoPos({ left, top });
  };

  const handleYes = () => setStep('form');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (name.trim().length === 0) { setError('Please enter your name'); return; }
    if (password.trim().length === 0) { setError('What I call you?'); return; }
    if (password !== REQUIRED_PASSWORD) {
      setError('Incorrect password');
      setPopupMessage('Incorrect password. Please try again.');
      setShowPopup(true);
      return;
    }
    onLogin(name.trim());
  };

  return (
    <div ref={wrapRef} style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#2b0022,#0f0010)'}}>
      {step === 'question' ? (
        <div style={{width: 'min(620px, 96%)', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))', borderRadius: 20, padding: 36, boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', position: 'relative'}}>
          <div style={{fontSize: 18, opacity: 0.9}}>Hey there 💫</div>
          <h2 style={{marginTop: 8, marginBottom: 6, fontSize: 32}}>Do you love me?</h2>
          <p style={{opacity: 0.8, marginBottom: 18}}>Answer honestly — only the truth opens the surprise 🎁</p>

          <div style={{height: 120, position: 'relative'}}>
            <button onClick={handleYes} style={{position: 'absolute', left: '30%', top: '40%', transform: 'translate(-50%,-50%)', padding: '12px 22px', borderRadius: 12, background: 'linear-gradient(90deg,#ff6eb4,#ffd6e8)', border: 'none', cursor: 'pointer', fontWeight: 700}}>Yes ❤️</button>

            <button
              onClick={(e)=>e.preventDefault()}
              onMouseEnter={moveNo}
              onMouseMove={moveNo}
              style={{position: 'absolute', left: `${noPos.left}%`, top: `${noPos.top}%`, transform: 'translate(-50%,-50%)', padding: '10px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'not-allowed'}}
            >No 💔</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{width: 'min(520px, 92%)', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))', borderRadius: 20, padding: 28, boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'Cormorant Garamond, serif'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
            <div style={{width: 64, height: 64, borderRadius: 14, background: 'linear-gradient(135deg,#ff6eb4,#ffd6e8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28}}>🎂</div>
            <div>
              <h2 style={{margin: 0, fontSize: 22}}>Yay! 💕</h2>
              <div style={{opacity: 0.8, fontSize: 13}}>Tell me your name so I can personalize it</div>
            </div>
          </div>

          <label style={{display: 'block', fontSize: 13, marginBottom: 6}}>Your name</label>
          <input autoFocus value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Sara" style={{width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#fff', marginBottom: 12}} />

          <label style={{display: 'block', fontSize: 13, marginBottom: 6}}>Password (optional)</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="What I call you?" style={{width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#fff', marginBottom: 18}} />

          <div style={{display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between'}}>
            <button type="submit" style={{padding: '10px 18px', borderRadius: 12, background: 'linear-gradient(90deg,#ff6eb4,#ffd6e8)', border: 'none', cursor: 'pointer', fontWeight: 600}}>Enter</button>
            <button type="button" onClick={()=>setStep('question')} style={{padding: '8px 12px', borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#fff'}}>Back</button>
          </div>
        </form>
      )}
      {showPopup && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60}}>
          <div onClick={()=>setShowPopup(false)} style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)'}} />
          <div style={{position: 'relative', background: '#1c0016', color: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.7)', width: 'min(420px, 92%)', textAlign: 'center'}}>
            <div style={{fontSize: 18, marginBottom: 8}}>🔒 Authentication</div>
            <div style={{opacity: 0.9, marginBottom: 14}}>{popupMessage}</div>
            <button onClick={()=>setShowPopup(false)} style={{padding: '8px 14px', borderRadius: 10, background: 'linear-gradient(90deg,#ff6eb4,#ffd6e8)', border: 'none', cursor: 'pointer'}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
