function LandingPage({ onGetStarted }) {
  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid #f0f0f5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>T</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '20px', color: '#1a1a2e', letterSpacing: '-0.5px' }}>Tabili</span>
        </div>
        <button
          onClick={onGetStarted}
          style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          Get Started →
        </button>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '90px 24px 60px', background: 'linear-gradient(180deg, #f5f5ff 0%, white 100%)' }}>
        <div style={{ display: 'inline-block', background: '#ede9fe', color: '#4f46e5', fontSize: '13px', fontWeight: '600', padding: '5px 14px', borderRadius: '99px', marginBottom: '20px', letterSpacing: '0.05em' }}>
          ★ Free & easy to use
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1a1a2e', letterSpacing: '-1px', lineHeight: '1.1', marginBottom: '20px', maxWidth: '700px', margin: '0 auto 20px' }}>
          Build beautiful<br />
          <span style={{ color: '#4f46e5' }}>timetables</span> in minutes
        </h1>
        <p style={{ fontSize: '18px', color: '#888', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          Tabili helps students, teachers, and teams create clean, organized schedules — no spreadsheets needed.
        </p>
        <button
          onClick={onGetStarted}
          style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '14px', padding: '16px 40px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          Start building for free →
        </button>
        <div style={{ marginTop: '16px', fontSize: '13px', color: '#bbb' }}>No sign up required · Works in your browser</div>
      </div>

      {/* PREVIEW CARDS */}
      <div style={{ padding: '0 60px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: '#f5f5ff', borderRadius: '20px', padding: '32px', border: '1px solid #ebebf0', boxShadow: '0 8px 40px rgba(79,70,229,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Daily Agenda', color: '#4f46e5', rows: ['Morning Standup · 9:00', 'Math Class · 10:00', 'Science Lab · 13:00'] },
              { label: 'Exam Schedule', color: '#ef4444', rows: ['21-05 · CSE, AIE, CYS', '26-05 · All Departments', '29-05 · Final Exams'] },
              { label: 'Weekly Schedule', color: '#10b981', rows: ['Mon → 7 subjects', 'Tue → 6 subjects', 'Wed → 7 subjects'] },
            ].map((card) => (
              <div key={card.label} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #ebebf0' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: card.color, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
                {card.rows.map((row, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#555', padding: '6px 0', borderBottom: i < 2 ? '1px solid #f3f3f7' : 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: card.color, flexShrink: 0 }} />
                    {row}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: '60px 60px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.5px' }}>Everything you need</h2>
          <p style={{ color: '#888', fontSize: '16px', marginTop: '10px' }}>Powerful features, zero complexity</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { icon: '📅', title: '3 Template Types', desc: 'Daily agenda, exam schedule, or weekly class timetable — pick what fits your needs.' },
            { icon: '🎨', title: 'Color Coded', desc: 'Assign colors to subjects and entries so your schedule is easy to read at a glance.' },
            { icon: '💾', title: 'Auto Save Drafts', desc: 'Your timetables are saved automatically. Come back and edit anytime.' },
            { icon: '✏️', title: 'Easy Editing', desc: 'Click any entry to edit it. Change the title, time, date, or color instantly.' },
            { icon: '👁', title: 'Template Previews', desc: 'Not sure which template to pick? Preview how each one looks before you start.' },
            { icon: '⚡', title: 'No Sign Up', desc: 'Jump straight in. No account, no email, no fuss. Just build your timetable.' },
          ].map((f) => (
            <div key={f.title} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #ebebf0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a2e', marginBottom: '6px' }}>{f.title}</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#4f46e5', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>Ready to plan smarter?</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '32px' }}>Build your first timetable in under 2 minutes.</p>
        <button
          onClick={onGetStarted}
          style={{ background: 'white', color: '#4f46e5', border: 'none', borderRadius: '14px', padding: '16px 40px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          Get started for free →
        </button>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '24px 60px', borderTop: '1px solid #f0f0f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', background: '#4f46e5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '12px' }}>T</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#1a1a2e' }}>Tabili</span>
        </div>
        <div style={{ fontSize: '13px', color: '#bbb' }}>Made with 💜 · Free to use</div>
      </div>

    </div>
  )
}

export default LandingPage