import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const internships = [
  { id: 1, title: 'React.js Intern', company: 'TechNova Solutions', location: 'Remote', stipend: '₹8,000/mo', type: 'Internship', skill: 'React' },
  { id: 2, title: 'PHP Developer Intern', company: 'WebCraft India', location: 'Surat', stipend: '₹7,000/mo', type: 'Internship', skill: 'PHP' },
  { id: 3, title: 'Node.js Intern', company: 'CodeBridge Labs', location: 'Ahmedabad', stipend: '₹10,000/mo', type: 'Internship', skill: 'Node.js' },
  { id: 4, title: 'Frontend Web Intern', company: 'PixelWorks', location: 'Remote', stipend: '₹6,000/mo', type: 'Internship', skill: 'HTML/CSS' },
  { id: 5, title: 'Full Stack Intern', company: 'DevSphere', location: 'Surat', stipend: '₹12,000/mo', type: 'Internship', skill: 'Full Stack' },
  { id: 6, title: 'Java Developer Intern', company: 'SoftCore Systems', location: 'Vadodara', stipend: '₹8,500/mo', type: 'Internship', skill: 'Java' }
];

function App() {
  const [page, setPage] = useState('home');
  const [menu, setMenu] = useState(false);
  const [applied, setApplied] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState('');

  const go = (p) => {
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const apply = (id) => {
    if (!loggedIn) {
      alert('Please login first.');
      go('login');
      return;
    }
    if (!applied.includes(id)) {
      setApplied([...applied, id]);
      alert('Application submitted successfully!');
    }
  };

  const filtered = internships.filter(i =>
    `${i.title} ${i.company} ${i.location} ${i.skill}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div className="nav container">
          <button className="logo" onClick={() => go('home')}>Intern<span>Hub</span></button>
          <button className="hamburger" onClick={() => setMenu(!menu)}>☰</button>
          <nav className={menu ? 'nav-links open' : 'nav-links'}>
            <button onClick={() => go('home')}>Home</button>
            <button onClick={() => go('internships')}>Internships</button>
            <button onClick={() => go('register')}>Register</button>
            {loggedIn && <button onClick={() => go('dashboard')}>Dashboard</button>}
            {!loggedIn ? <button className="login-btn" onClick={() => go('login')}>Login</button> :
              <button className="login-btn" onClick={() => {setLoggedIn(false); setApplied([]); go('home')}}>Logout</button>}
          </nav>
        </div>
      </header>

      {page === 'home' && (
        <>
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <p className="eyebrow">🎓 STUDENT CAREER PORTAL</p>
                <h1>Find Your <span>Dream Internship</span></h1>
                <p className="hero-text">Discover internships, build real-world skills and start your professional career with confidence.</p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => go('internships')}>Find Internships →</button>
                  <button className="secondary" onClick={() => go('register')}>Create Account</button>
                </div>
                <div className="stats">
                  <div><b>500+</b><small>Internships</small></div>
                  <div><b>100+</b><small>Companies</small></div>
                  <div><b>2K+</b><small>Students</small></div>
                </div>
              </div>
              <div className="hero-card">
                <div className="hero-icon">💼</div>
                <h3>Start Your Career</h3>
                <p>React • PHP • Node.js • Java • Web Development</p>
                <div className="mini-card">✨ New internship opportunities every week</div>
              </div>
            </div>
          </section>

          <section className="section container">
            <div className="section-head">
              <div><p className="eyebrow">EXPLORE</p><h2>Popular Internships</h2></div>
              <button className="text-btn" onClick={() => go('internships')}>View all →</button>
            </div>
            <div className="cards">
              {internships.slice(0, 3).map(i => <InternCard key={i.id} item={i} onApply={apply} applied={applied.includes(i.id)} />)}
            </div>
          </section>
        </>
      )}

      {page === 'internships' && (
        <section className="section container page-space">
          <p className="eyebrow">OPPORTUNITIES</p>
          <h1>Find Internships</h1>
          <p className="muted">Search internships by skill, company or location.</p>
          <div className="search-box">
            🔎 <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search React, PHP, Surat..." />
          </div>
          <div className="cards">
            {filtered.map(i => <InternCard key={i.id} item={i} onApply={apply} applied={applied.includes(i.id)} />)}
          </div>
          {filtered.length === 0 && <div className="empty">No internships found.</div>}
        </section>
      )}

      {page === 'register' && (
        <section className="form-page container page-space">
          <FormCard title="Create Student Account" subtitle="Register to apply for internships.">
            <form onSubmit={(e) => {e.preventDefault(); alert('Registration successful! You can now login.'); go('login')}}>
              <div className="form-grid">
                <Field label="Full Name" placeholder="Enter your name" required />
                <Field label="Email" type="email" placeholder="you@example.com" required />
                <Field label="Mobile" placeholder="Enter mobile number" required />
                <Field label="College" placeholder="Your college name" required />
                <Field label="Course" placeholder="BCA" />
                <Field label="Semester" placeholder="Semester 5" />
                <Field label="Password" type="password" placeholder="Create password" required />
                <Field label="Skills" placeholder="React, PHP, Java..." />
              </div>
              <button className="primary full" type="submit">Create Account</button>
            </form>
          </FormCard>
        </section>
      )}

      {page === 'login' && (
        <section className="form-page container page-space">
          <FormCard title="Welcome Back" subtitle="Login to manage your internship applications.">
            <form onSubmit={(e) => {e.preventDefault(); setLoggedIn(true); go('dashboard')}}>
              <Field label="Email" type="email" placeholder="you@example.com" required />
              <Field label="Password" type="password" placeholder="Enter password" required />
              <button className="primary full" type="submit">Login</button>
            </form>
            <p className="form-note">Don't have an account? <button onClick={() => go('register')}>Register now</button></p>
          </FormCard>
        </section>
      )}

      {page === 'dashboard' && (
        <section className="section container page-space">
          <div className="dashboard-head">
            <div><p className="eyebrow">STUDENT DASHBOARD</p><h1>Hello, Student 👋</h1><p className="muted">Track your internship applications here.</p></div>
            <button className="secondary" onClick={() => go('internships')}>Browse Internships</button>
          </div>
          <div className="dash-grid">
            <div className="dash-stat"><b>{applied.length}</b><span>Applications</span></div>
            <div className="dash-stat"><b>{internships.length}</b><span>Available Jobs</span></div>
            <div className="dash-stat"><b>0</b><span>Shortlisted</span></div>
          </div>
          <div className="panel">
            <h2>My Applications</h2>
            {applied.length === 0 ? <div className="empty">You have not applied to any internship yet.</div> :
              applied.map(id => {
                const i = internships.find(x => x.id === id);
                return <div className="application" key={id}><div><b>{i.title}</b><span>{i.company} • {i.location}</span></div><strong>Applied</strong></div>
              })
            }
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container footer-grid">
          <div><div className="logo footer-logo">Intern<span>Hub</span></div><p>Helping students start their careers through meaningful internship opportunities.</p></div>
          <div><h4>Quick Links</h4><button onClick={() => go('home')}>Home</button><button onClick={() => go('internships')}>Internships</button><button onClick={() => go('register')}>Register</button></div>
          <div><h4>For Students</h4><p>Build Skills</p><p>Get Experience</p><p>Start Your Career</p></div>
        </div>
        <div className="copyright">© 2026 InternHub. Student Internship Management System.</div>
      </footer>
    </div>
  );
}

function InternCard({item, onApply, applied}) {
  return <article className="intern-card">
    <div className="company-icon">💻</div>
    <div className="card-body">
      <div className="tag">{item.skill}</div>
      <h3>{item.title}</h3>
      <p className="company">{item.company}</p>
      <div className="details"><span>📍 {item.location}</span><span>💰 {item.stipend}</span></div>
      <button className={applied ? 'applied' : 'primary'} onClick={() => onApply(item.id)}>{applied ? '✓ Applied' : 'Apply Now'}</button>
    </div>
  </article>
}

function FormCard({title, subtitle, children}) {
  return <div className="form-card"><div className="form-top"><div className="hero-icon small">🎓</div><h1>{title}</h1><p>{subtitle}</p></div>{children}</div>
}

function Field({label, type='text', placeholder, required=false}) {
  return <label className="field"><span>{label}{required && ' *'}</span><input type={type} placeholder={placeholder} required={required} /></label>
}

createRoot(document.getElementById('root')).render(<App />);
