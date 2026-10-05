* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f7fb;
  --panel: #ffffff;
  --panel-alt: #eef4ff;
  --line: #dde7f5;
  --navy: #0a2540;
  --navy-soft: #173d63;
  --blue: #2563eb;
  --blue-soft: #edf5ff;
  --emerald: #10b981;
  --emerald-soft: #ecfdf5;
  --amber: #f59e0b;
  --red: #ef4444;
  --text: #122033;
  --muted: #64748b;
  --shadow: 0 22px 60px rgba(25, 55, 98, 0.12);
  --radius: 18px;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #eef5ff 0%, #f8fbff 20%, #f4f7fb 100%);
  color: var(--text);
}

button, input, select, textarea {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
}

#app {
  min-height: 100vh;
}

.screen {
  display: none;
}

.screen.active {
  display: block;
}

.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.18), transparent 30%),
    linear-gradient(135deg, #f5f9ff 0%, #edf6ff 100%);
  padding: 32px 16px;
}

.auth-shell {
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
  align-items: stretch;
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 32px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.brand-panel {
  padding: 52px 46px;
  background: linear-gradient(135deg, #0b1f38 0%, #163d68 40%, #1d4f7d 100%);
  color: white;
  position: relative;
}

.brand-panel::after {
  content: "";
  position: absolute;
  inset: auto -80px -80px auto;
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
}

.logo-mark {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.14);
  color: #fff;
  font-weight: 800;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
}

.brand-panel h1 {
  margin: 22px 0 10px;
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: 0.04em;
}

.brand-panel p {
  max-width: 460px;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  font-size: 1rem;
}

.feature-list {
  margin-top: 28px;
  display: grid;
  gap: 14px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.9);
}

.feature-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.2);
  color: #d1fae5;
  font-weight: 700;
}

.auth-forms {
  background: rgba(255,255,255,0.92);
  padding: 36px 30px;
  display: grid;
  align-content: start;
  gap: 28px;
}

.auth-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 22px 18px;
}

.auth-card h2 {
  margin: 0 0 20px;
  font-size: 1.3rem;
  color: var(--navy);
}

.form-grid {
  display: grid;
  gap: 14px;
}

.input-row {
  display: grid;
  gap: 8px;
}

.input-row label {
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 600;
}

.input-row input,
.input-row select,
.input-row textarea,
.form-control {
  width: 100%;
  padding: 0.86rem 0.95rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #f8fbff;
  color: var(--text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-row input:focus,
.input-row select:focus,
.input-row textarea:focus,
.form-control:focus {
  outline: none;
  border-color: rgba(37, 99, 235, 0.5);
  box-shadow: 0 0 0 4px rgba(37,99,235,0.1);
}

.primary-btn,
.secondary-btn,
.ghost-btn,
.danger-btn {
  padding: 0.8rem 1.1rem;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.danger-btn:hover {
  transform: translateY(-1px);
}

.primary-btn {
  background: linear-gradient(135deg, var(--blue) 0%, #1e5fd6 100%);
  color: white;
}

.secondary-btn {
  background: linear-gradient(135deg, var(--emerald) 0%, #0ca975 100%);
  color: white;
}

.ghost-btn {
  background: #edf5ff;
  color: var(--navy);
  border: 1px solid var(--line);
}

.danger-btn {
  background: #fff1f2;
  color: #b91c1c;
  border: 1px solid rgba(239,68,68,0.15);
}

.tab-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px 18px 0;
}

.tab-btn {
  background: transparent;
  color: var(--muted);
  border-radius: 999px;
  padding: 0.72rem 0.95rem;
  font-weight: 700;
}

.tab-btn.active {
  background: rgba(37, 99, 235, 0.12);
  color: var(--blue);
}

.app-shell {
  max-width: 1360px;
  margin: 0 auto;
  padding: 16px 18px 42px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(17, 24, 39, 0.96);
  border: 1px solid rgba(148,163,184,0.1);
  border-radius: 22px;
  padding: 18px 18px 14px;
  color: white;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.25);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mini {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 800;
  letter-spacing: 0.06em;
}

.brand-text strong {
  display: block;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.brand-text small {
  color: rgba(255,255,255,0.68);
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 8px 12px;
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  font-weight: 700;
  color: white;
}

.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-meta strong {
  font-size: 0.9rem;
}

.user-meta small {
  color: rgba(255,255,255,0.72);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  gap: 18px;
  margin-top: 18px;
}

.sidebar {
  display: grid;
  gap: 18px;
  align-content: start;
}

.sidebar-panel,
.panel {
  background: rgba(255,255,255,0.8);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.sidebar-panel h3,
.panel h3 {
  margin: 0 0 16px;
  color: var(--navy);
}

.metric-list,
.knob-list,
.list-plain {
  display: grid;
  gap: 12px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-radius: 12px;
  background: var(--blue-soft);
  border: 1px solid rgba(37,99,235,0.08);
}

.metric-item strong {
  font-size: 1.2rem;
  color: var(--navy);
}

.metric-item span {
  color: var(--muted);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.badge.teachers {
  background: rgba(37, 99, 235, 0.08);
  color: #1d4ed8;
}

.badge.parents {
  background: rgba(16, 185, 129, 0.09);
  color: #047857;
}

.content-area {
  min-width: 0;
  display: grid;
  gap: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, white 0%, #f8fbff 100%);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 16px;
}

.stat-card .label {
  color: var(--muted);
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.stat-card .value {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--navy);
}

.stat-card .trend {
  margin-top: 6px;
  color: var(--emerald);
  font-size: 0.8rem;
  font-weight: 700;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.panel-header h3 {
  margin: 0;
}

.card-list {
  display: grid;
  gap: 14px;
}

.info-card {
  display: grid;
  gap: 10px;
  border: 1px solid var(--line);
  background: rgba(248,250,252,0.7);
  border-radius: 16px;
  padding: 16px;
}

.info-card .title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.info-card h4 {
  margin: 0;
  font-size: 1rem;
  color: var(--navy);
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--muted);
  font-size: 0.78rem;
}

.score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  font-weight: 800;
}

.score-badge.excellent { background: rgba(16,185,129,0.12); color: #047857; }
.score-badge.good { background: rgba(59,130,246,0.12); color: #1d4ed8; }
.score-badge.average { background: rgba(245,158,11,0.12); color: #b45309; }
.score-badge.low { background: rgba(239,68,68,0.12); color: #b91c1c; }

.announcement-form,
.subject-form,
.exam-form,
.chat-form,
.result-form {
  display: grid;
  gap: 14px;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.timeline {
  display: grid;
  gap: 10px;
}

.timeline-item {
  border-left: 3px solid rgba(37,99,235,0.2);
  padding: 10px 0 10px 14px;
  display: grid;
  gap: 8px;
}

.timeline-item strong {
  color: var(--navy);
}

.timeline-item p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.subject-grid,
.exam-grid {
  display: grid;
  gap: 14px;
}

.subject-card,
.exam-card {
  border: 1px solid var(--line);
  background: rgba(250,252,255,0.9);
  border-radius: 16px;
  padding: 16px;
}

.subject-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.subject-card strong {
  color: var(--navy);
  font-size: 1.04rem;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.inline-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.chat-shell {
  display: grid;
  grid-template-rows: auto minmax(260px, 1fr) auto;
  min-height: 620px;
  background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(240,247,255,0.92));
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
  background: rgba(255,255,255,0.9);
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
  color: white;
  font-weight: 700;
}

.chat-header h3 {
  margin: 0;
  font-size: 1.08rem;
  color: var(--navy);
}

.chat-header small {
  color: var(--muted);
}

.messages {
  padding: 18px 22px;
  background: linear-gradient(180deg, #f3f8ff 0%, #f7fbff 100%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.message-row {
  display: flex;
}

.message-row.me {
  justify-content: flex-end;
}

.message-bubble {
  max-width: min(78%, 520px);
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 12px 14px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
}

.message-row.me .message-bubble {
  background: linear-gradient(135deg, #0a2540 0%, #163d63 100%);
  border-color: transparent;
  color: white;
}

.sender-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.74rem;
  line-height: 1.2;
}

.sender-meta strong {
  font-size: 0.76rem;
  letter-spacing: 0.01em;
}

.message-row.me .sender-meta {
  color: rgba(255,255,255,0.75);
}

.message-bubble p {
  margin: 0;
  line-height: 1.6;
}

.chat-form {
  display: flex;
  gap: 12px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--line);
  background: rgba(255,255,255,0.85);
}

.chat-input {
  flex: 1;
  min-width: 0;
}

.empty-state {
  display: grid;
  place-items: center;
  color: var(--muted);
  padding: 20px;
  border: 1px dashed var(--line);
  background: rgba(248,250,252,0.8);
  border-radius: 14px;
}

@media (max-width: 980px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }

  .dashboard-layout {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding: 12px 12px 26px;
  }

  .topbar {
    padding: 14px 12px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tab-bar {
    padding: 8px 12px 0;
  }

  .brand-panel {
    padding: 30px 22px;
  }

  .auth-forms {
    padding: 18px 16px 22px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .chat-shell {
    min-height: 510px;
  }

  .messages {
    padding: 14px 12px;
  }

  .message-bubble {
    max-width: 88%;
  }

  .btn-stack {
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions > * {
    width: 100%;
  }
}
