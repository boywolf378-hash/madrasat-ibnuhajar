const STORAGE_KEY = "madrasat-ibnuhajar-state";
const uiState = {
  activeTab: "dashboard",
  subjectEditId: null,
  examEditId: null,
  announcementEditId: null,
};

const defaultState = {
  users: [
    {
      id: "teacher-1",
      name: "Teacher Ahmed",
      role: "Teacher",
      email: "ahmed@madrasat.edu",
      passwordHash: "",
      childName: "",
    },
    {
      id: "parent-1",
      name: "Parent - Omar's Dad",
      role: "Parent",
      email: "omar@familymail.com",
      passwordHash: "",
      childName: "Omar Hassan",
    },
  ],
  subjects: [
    { id: "subject-1", name: "Mathematics", teacherId: "teacher-1" },
    { id: "subject-2", name: "Science", teacherId: "teacher-1" },
    { id: "subject-3", name: "Arabic", teacherId: "teacher-1" },
  ],
  exams: [
    {
      id: "exam-1",
      subjectId: "subject-1",
      title: "Midterm Mathematics",
      type: "Exam",
      date: "2026-10-08",
      description: "Algebra and geometry review.",
    },
    {
      id: "exam-2",
      subjectId: "subject-2",
      title: "Science Quiz 1",
      type: "Quiz",
      date: "2026-10-05",
      description: "Chapter 1 check-in activity.",
    },
  ],
  results: [
    {
      id: "result-1",
      subjectId: "subject-1",
      examId: "exam-1",
      studentName: "Omar Hassan",
      score: 92,
      grade: "A",
      date: "2026-10-08",
    },
    {
      id: "result-2",
      subjectId: "subject-2",
      examId: "exam-2",
      studentName: "Omar Hassan",
      score: 88,
      grade: "A-",
      date: "2026-10-05",
    },
    {
      id: "result-3",
      subjectId: "subject-3",
      examId: "exam-3",
      studentName: "Aisha Hassan",
      score: 95,
      grade: "A",
      date: "2026-10-06",
    },
  ],
  announcements: [
    {
      id: "announcement-1",
      title: "School Parent Meeting",
      message: "The parent-teacher meeting will take place this Saturday at 9:00 AM in the school hall.",
      author: "Teacher Ahmed",
      createdAt: "2026-10-05T09:00:00",
    },
    {
      id: "announcement-2",
      title: "Science Lab Update",
      message: "Students in Grade 5 will begin the practical science lab cycle next week with protective gear.",
      author: "Teacher Ahmed",
      createdAt: "2026-10-03T15:15:00",
    },
  ],
  chats: [
    {
      id: "chat-1",
      senderId: "teacher-1",
      senderName: "Teacher Ahmed",
      role: "Teacher",
      text: "Good morning parents. Please check the latest exam reports and review the updated schedule for this week.",
      timestamp: "2026-10-05T07:35:00",
    },
    {
      id: "chat-2",
      senderId: "parent-1",
      senderName: "Parent - Omar's Dad",
      role: "Parent",
      text: "Thank you, Teacher Ahmed. We appreciate the timely updates and the detailed score summaries.",
      timestamp: "2026-10-05T07:40:00",
    },
  ],
  currentUserId: null,
};

function createInitialState() {
  const state = JSON.parse(JSON.stringify(defaultState));
  const teacherPw = "teach123";
  const parentPw = "parent123";
  state.users[0].passwordHash = toHexString(generateHashSync(teacherPw));
  state.users[1].passwordHash = toHexString(generateHashSync(parentPw));
  return state;
}

function generateHashSync(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = new Uint8Array(32);
  for (let i = 0; i < bytes.length; i += 1) {
    hash[i % 32] = (hash[i % 32] + bytes[i] * (i + 1)) % 256;
  }
  return hash;
}

function toHexString(byteArray) {
  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initialState = createInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }
    const parsed = JSON.parse(saved);
    if (!parsed.users || !parsed.subjects || !parsed.exams || !parsed.announcements || !parsed.chats) {
      const initialState = createInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }
    return parsed;
  } catch (error) {
    console.warn("Unable to load state:", error);
    const initialState = createInitialState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }
}

function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getCurrentUser() {
  const state = loadState();
  return state.users.find((user) => user.id === state.currentUserId) || null;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(value) {
  if (!value) return "Now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function nameInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getSubjectName(subjectId, state) {
  const subject = state.subjects.find((item) => item.id === subjectId);
  return subject ? subject.name : "Unknown Subject";
}

function renderAuth() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="screen active auth-screen">
      <div class="auth-shell">
        <div class="brand-panel">
          <div class="logo-mark">MI</div>
          <h1>MADRASAT IBNUHAJAR</h1>
          <p>
            A trusted school communication platform where parents and teachers stay connected,
            monitor academic performance, and share all classroom updates in one place.
          </p>

          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-badge">✓</div>
              <span>Secure teacher and parent access</span>
            </div>
            <div class="feature-item">
              <div class="feature-badge">✓</div>
              <span>Modern school chat and announcements</span>
            </div>
            <div class="feature-item">
              <div class="feature-badge">✓</div>
              <span>Academic tracking for exam and quiz records</span>
            </div>
          </div>
        </div>

        <div class="auth-forms">
          <div class="auth-card">
            <h2>Sign In</h2>
            <form id="signinForm" class="form-grid">
              <div class="input-row">
                <label for="signinEmail">Email</label>
                <input id="signinEmail" name="email" type="email" placeholder="Enter your email" required />
              </div>
              <div class="input-row">
                <label for="signinPassword">Password</label>
                <input id="signinPassword" name="password" type="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" class="primary-btn">Sign In</button>
            </form>
          </div>

          <div class="auth-card">
            <h2>Create Account</h2>
            <form id="signupForm" class="form-grid">
              <div class="input-row">
                <label for="signupName">Full Name</label>
                <input id="signupName" name="name" type="text" placeholder="Your full name" required />
              </div>
              <div class="input-row">
                <label for="signupRole">Role</label>
                <select id="signupRole" name="role" required>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>
              <div class="input-row">
                <label for="signupChild">Child Name (Parent only)</label>
                <input id="signupChild" name="childName" type="text" placeholder="e.g. Omar Hassan" />
              </div>
              <div class="input-row">
                <label for="signupEmail">Email</label>
                <input id="signupEmail" name="email" type="email" placeholder="email@example.com" required />
              </div>
              <div class="input-row">
                <label for="signupPassword">Password</label>
                <input id="signupPassword" name="password" type="password" placeholder="Create secure password" required />
              </div>
              <button type="submit" class="secondary-btn">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("signinForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    const state = loadState();
    const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      alert("No account found for this email.");
      return;
    }

    const hashed = await hashPassword(password);
    if (user.passwordHash !== hashed) {
      alert("Incorrect password. Please try again.");
      return;
    }

    state.currentUserId = user.id;
    saveState(state);
    renderApp();
  });

  document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const role = form.role.value;
    const childName = form.childName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name || !email || !password) {
      alert("Please complete all required fields.");
      return;
    }

    const state = loadState();
    const userExists = state.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      role,
      email,
      passwordHash: await hashPassword(password),
      childName: role === "Parent" ? childName || "" : "",
    };

    state.users.push(newUser);
    state.currentUserId = newUser.id;
    saveState(state);
    renderApp();
  });
}

function renderApp() {
  const state = loadState();
  const currentUser = state.users.find((user) => user.id === state.currentUserId);

  if (!currentUser) {
    renderAuth();
    return;
  }

  const app = document.getElementById("app");
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "chat", label: "Chat" },
  ];

  if (currentUser.role === "Teacher") {
    tabs.push({ id: "subjects", label: "Subjects" }, { id: "exams", label: "Exams" });
  }

  const currentTab = uiState.activeTab;
  app.innerHTML = `
    <div class="screen active app-screen">
      <div class="app-shell">
        <header class="topbar">
          <div class="brand-wrap">
            <div class="brand-mini">MI</div>
            <div class="brand-text">
              <strong>MADRASAT IBNUHAJAR</strong>
              <small>School management portal</small>
            </div>
          </div>

          <div class="user-pill">
            <div class="user-avatar">${nameInitials(currentUser.name)}</div>
            <div class="user-meta">
              <strong>${currentUser.name}</strong>
              <small>${currentUser.role}</small>
            </div>
          </div>
        </header>

        <div class="tab-bar">
          ${tabs
            .map(
              (tab) => `
                <button class="tab-btn ${tab.id === currentTab ? "active" : ""}" data-tab="${tab.id}">
                  ${tab.label}
                </button>
              `
            )
            .join("")}
          <button class="tab-btn" id="signOutBtn">Sign Out</button>
        </div>

        <div class="dashboard-layout">
          <aside class="sidebar">
            <div class="sidebar-panel">
              <h3>Quick Overview</h3>
              <div class="metric-list">
                <div class="metric-item">
                  <span>Subjects</span>
                  <strong>${state.subjects.length}</strong>
                </div>
                <div class="metric-item">
                  <span>Exams</span>
                  <strong>${state.exams.length}</strong>
                </div>
                <div class="metric-item">
                  <span>Announcements</span>
                  <strong>${state.announcements.length}</strong>
                </div>
              </div>
            </div>

            <div class="sidebar-panel">
              <h3>Profile</h3>
              <div class="list-plain">
                <span class="badge ${currentUser.role === "Teacher" ? "teachers" : "parents"}">
                  ${currentUser.role}
                </span>
                <div class="info-card">
                  <strong>${currentUser.name}</strong>
                  <small>${currentUser.email}</small>
                  ${currentUser.role === "Parent" ? `<small>Child: ${currentUser.childName || "Not assigned"}</small>` : ""}
                </div>
              </div>
            </div>
          </aside>

          <main class="content-area" id="contentArea"></main>
        </div>
      </div>
    </div>
  `;

  document.getElementById("signOutBtn").addEventListener("click", () => {
    const state = loadState();
    state.currentUserId = null;
    saveState(state);
    renderApp();
  });

  document.querySelectorAll(".tab-btn[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.activeTab = button.dataset.tab;
      renderApp();
    });
  });

  const contentArea = document.getElementById("contentArea");
  if (currentUser.role === "Teacher") {
    if (currentTab === "dashboard") {
      renderTeacherDashboard(contentArea, state, currentUser);
    } else if (currentTab === "chat") {
      renderChat(contentArea, state, currentUser);
    } else if (currentTab === "subjects") {
      renderSubjects(contentArea, state, currentUser);
    } else if (currentTab === "exams") {
      renderExams(contentArea, state, currentUser);
    }
  } else {
    if (currentTab === "dashboard") {
      renderParentDashboard(contentArea, state, currentUser);
    } else {
      renderChat(contentArea, state, currentUser);
    }
  }
}

function renderTeacherDashboard(container, state, currentUser) {
  const totalSubjects = state.subjects.filter((subject) => subject.teacherId === currentUser.id).length;
  const totalExams = state.exams.filter((exam) => {
    const subject = state.subjects.find((item) => item.id === exam.subjectId);
    return subject && subject.teacherId === currentUser.id;
  }).length;
  const recentAnnouncement = [...state.announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="label">Subjects</div>
        <div class="value">${totalSubjects}</div>
        <div class="trend">Active teaching list</div>
      </div>
      <div class="stat-card">
        <div class="label">Assessments</div>
        <div class="value">${totalExams}</div>
        <div class="trend">Exam and quiz entries</div>
      </div>
      <div class="stat-card">
        <div class="label">Announcements</div>
        <div class="value">${state.announcements.length}</div>
        <div class="trend">Shared with families</div>
      </div>
      <div class="stat-card">
        <div class="label">Students</div>
        <div class="value">${new Set(state.results.map((result) => result.studentName)).size}</div>
        <div class="trend">Tracked learners</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Post a school update</h3>
      </div>
      <form id="announcementForm" class="announcement-form">
        <div class="input-row">
          <label for="announcementTitle">Title</label>
          <input id="announcementTitle" name="title" type="text" placeholder="e.g. Holiday revision plan" required />
        </div>
        <div class="input-row">
          <label for="announcementText">Message</label>
          <textarea id="announcementText" name="message" rows="4" placeholder="Write an important school/class update here..." required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="primary-btn">Publish Announcement</button>
        </div>
      </form>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Latest announcements</h3>
      </div>
      <div class="timeline">
        ${state.announcements
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(
            (announcement) => `
              <div class="timeline-item">
                <strong>${announcement.title}</strong>
                <p>${announcement.message}</p>
                <div class="meta-row">
                  <span>By ${announcement.author}</span>
                  <span>${formatDate(announcement.createdAt)}</span>
                </div>
                <div class="card-actions">
                  <button class="ghost-btn" data-action="edit-announcement" data-id="${announcement.id}">Edit</button>
                  <button class="danger-btn" data-action="delete-announcement" data-id="${announcement.id}">Delete</button>
                </div>
              </div>
            `
          )
          .join("") || '<div class="empty-state">No announcements yet.</div>'}
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Recent performance snapshot</h3>
      </div>
      <div class="card-list">
        ${state.results
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4)
          .map((result) => {
            const subjectName = getSubjectName(result.subjectId, state);
            const scoreClass =
              result.score >= 90 ? "excellent" : result.score >= 80 ? "good" : result.score >= 70 ? "average" : "low";
            return `
              <div class="info-card">
                <div class="title-row">
                  <h4>${result.studentName}</h4>
                  <span class="score-badge ${scoreClass}">${result.score}%</span>
                </div>
                <div class="meta-row">
                  <span>${subjectName}</span>
                  <span>${result.grade}</span>
                  <span>${formatDate(result.date)}</span>
                </div>
              </div>
            `;
          })
          .join("") || '<div class="empty-state">No student results have been posted yet.</div>'}
      </div>
    </div>
  `;

  document.getElementById("announcementForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = form.title.value.trim();
    const message = form.message.value.trim();
    const state = loadState();

    if (!title || !message) return;

    state.announcements.unshift({
      id: `announcement-${Date.now()}`,
      title,
      message,
      author: currentUser.name,
      createdAt: new Date().toISOString(),
    });
    saveState(state);
    renderApp();
  });

  document.querySelectorAll("[data-action='delete-announcement']").forEach((button) => {
    button.addEventListener("click", () => {
      const state = loadState();
      state.announcements = state.announcements.filter((item) => item.id !== button.dataset.id);
      saveState(state);
      renderApp();
    });
  });

  document.querySelectorAll("[data-action='edit-announcement']").forEach((button) => {
    button.addEventListener("click", () => {
      const state = loadState();
      const announcement = state.announcements.find((item) => item.id === button.dataset.id);
      if (!announcement) return;
      const form = document.getElementById("announcementForm");
      form.title.value = announcement.title;
      form.message.value = announcement.message;
      form.dataset.editId = announcement.id;
      form.querySelector("button[type='submit']").textContent = "Update Announcement";
      form.onsubmit = (event) => {
        event.preventDefault();
        const updatedState = loadState();
        const id = form.dataset.editId;
        const item = updatedState.announcements.find((entry) => entry.id === id);
        if (!item) return;
        item.title = form.title.value.trim();
        item.message = form.message.value.trim();
        item.author = currentUser.name;
        saveState(updatedState);
        form.reset();
        delete form.dataset.editId;
        form.querySelector("button[type='submit']").textContent = "Publish Announcement";
        renderApp();
      };
    });
  });
}

function renderParentDashboard(container, state, currentUser) {
  const childName = currentUser.childName || "Your Child";
  const childResults = state.results
    .filter((result) => result.studentName.toLowerCase() === childName.toLowerCase())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  container.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3>${childName}'s Latest Results</h3>
      </div>
      <div class="card-list">
        ${childResults.length
          ? childResults
              .map((result) => {
                const scoreClass =
                  result.score >= 90 ? "excellent" : result.score >= 80 ? "good" : result.score >= 70 ? "average" : "low";
                return `
                  <div class="info-card">
                    <div class="title-row">
                      <h4>${getSubjectName(result.subjectId, state)}</h4>
                      <span class="score-badge ${scoreClass}">${result.score}%</span>
                    </div>
                    <div class="meta-row">
                      <span>${result.grade}</span>
                      <span>${result.examId ? "Assessment" : "Record"}</span>
                      <span>${formatDate(result.date)}</span>
                    </div>
                  </div>
                `;
              })
              .join("")
          : '<div class="empty-state">No results published yet for this child.</div>'}
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Announcements</h3>
      </div>
      <div class="timeline">
        ${state.announcements
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(
            (item) => `
              <div class="timeline-item">
                <strong>${item.title}</strong>
                <p>${item.message}</p>
                <div class="meta-row">
                  <span>Posted by ${item.author}</span>
                  <span>${formatDate(item.createdAt)}</span>
                </div>
              </div>
            `
          )
          .join("") || '<div class="empty-state">No announcements from the school.</div>'}
      </div>
    </div>
  `;
}

function renderChat(container, state, currentUser) {
  container.innerHTML = `
    <div class="chat-shell">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">SC</div>
          <div>
            <h3>School Community Chat</h3>
            <small>${state.users.filter((user) => user.role === "Teacher").length + state.users.filter((user) => user.role === "Parent").length} members</small>
          </div>
        </div>
        <span class="badge teachers">Live</span>
      </div>

      <div class="messages" id="chatMessages">
        ${state.chats
          .slice()
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((message) => {
            const isMine = message.senderId === currentUser.id;
            return `
              <div class="message-row ${isMine ? "me" : ""}">
                <div class="message-bubble">
                  <div class="sender-meta">
                    <strong>${message.senderName}</strong>
                    <span>${message.role}</span>
                  </div>
                  <p>${message.text}</p>
                  <div class="sender-meta" style="margin-top: 8px; margin-bottom: 0; justify-content: flex-end;">
                    <span>${formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>

      <form id="chatForm" class="chat-form">
        <input class="form-control chat-input" type="text" name="text" placeholder="Write a message to the school community..." required />
        <button type="submit" class="primary-btn">Send</button>
      </form>
    </div>
  `;

  const messages = document.getElementById("chatMessages");
  messages.scrollTop = messages.scrollHeight;

  document.getElementById("chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = form.text.value.trim();
    if (!text) return;

    const state = loadState();
    state.chats.push({
      id: `chat-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      role: currentUser.role,
      text,
      timestamp: new Date().toISOString(),
    });
    saveState(state);
    renderApp();
  });
}

function renderSubjects(container, state, currentUser) {
  const teacherSubjects = state.subjects.filter((subject) => subject.teacherId === currentUser.id);

  container.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3>Subjects</h3>
      </div>
      <form id="subjectForm" class="subject-form">
        <div class="input-row">
          <label for="subjectName">Subject Name</label>
          <input id="subjectName" name="subjectName" type="text" placeholder="e.g. Computer Science" value="${uiState.subjectEditId ? teacherSubjects.find((subject) => subject.id === uiState.subjectEditId)?.name || "" : ""}" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="primary-btn">${uiState.subjectEditId ? "Update Subject" : "Add Subject"}</button>
          ${uiState.subjectEditId ? '<button type="button" class="ghost-btn" id="cancelSubjectEdit">Cancel</button>' : ""}
        </div>
      </form>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Current Subject List</h3>
      </div>
      <div class="subject-grid">
        ${teacherSubjects.length
          ? teacherSubjects
              .map(
                (subject) => `
                  <div class="subject-card">
                    <strong>${subject.name}</strong>
                    <div class="card-actions">
                      <button class="ghost-btn" data-action="edit-subject" data-id="${subject.id}">Edit</button>
                      <button class="danger-btn" data-action="delete-subject" data-id="${subject.id}">Delete</button>
                    </div>
                  </div>
                `
              )
              .join("")
          : '<div class="empty-state">No subjects added yet.</div>'}
      </div>
    </div>
  `;

  document.getElementById("subjectForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.subjectName.value.trim();
    const state = loadState();

    if (!name) return;

    if (uiState.subjectEditId) {
      const subject = state.subjects.find((item) => item.id === uiState.subjectEditId);
      if (!subject) return;
      subject.name = name;
    } else {
      state.subjects.push({
        id: `subject-${Date.now()}`,
        name,
        teacherId: currentUser.id,
      });
    }

    uiState.subjectEditId = null;
    saveState(state);
    renderApp();
  });

  const cancelButton = document.getElementById("cancelSubjectEdit");
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      uiState.subjectEditId = null;
      renderApp();
    });
  }

  document.querySelectorAll("[data-action='edit-subject']").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.subjectEditId = button.dataset.id;
      renderApp();
    });
  });

  document.querySelectorAll("[data-action='delete-subject']").forEach((button) => {
    button.addEventListener("click", () => {
      const state = loadState();
      const subjectId = button.dataset.id;
      state.subjects = state.subjects.filter((item) => item.id !== subjectId);
      state.exams = state.exams.filter((exam) => exam.subjectId !== subjectId);
      state.results = state.results.filter((result) => result.subjectId !== subjectId);
      saveState(state);
      renderApp();
    });
  });
}

function renderExams(container, state, currentUser) {
  const teacherSubjects = state.subjects.filter((subject) => subject.teacherId === currentUser.id);

  const existingExams = state.exams.filter((exam) => {
    const subject = state.subjects.find((item) => item.id === exam.subjectId);
    return subject && subject.teacherId === currentUser.id;
  });

  container.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h3>${uiState.examEditId ? "Update" : "Create"} Exam or Quiz</h3>
      </div>
      <form id="examForm" class="exam-form">
        <div class="input-row">
          <label for="examSubject">Subject</label>
          <select id="examSubject" name="subjectId" required>
            <option value="">Select a subject</option>
            ${teacherSubjects
              .map(
                (subject) => `
                  <option value="${subject.id}" ${uiState.examEditId && existingExams.find((exam) => exam.id === uiState.examEditId)?.subjectId === subject.id ? "selected" : ""}>
                    ${subject.name}
                  </option>
                `
              )
              .join("")}
          </select>
        </div>
        <div class="input-row">
          <label for="examType">Assessment Type</label>
          <select id="examType" name="type" required>
            <option value="Exam" ${uiState.examEditId && existingExams.find((exam) => exam.id === uiState.examEditId)?.type === "Exam" ? "selected" : ""}>Exam</option>
            <option value="Quiz" ${uiState.examEditId && existingExams.find((exam) => exam.id === uiState.examEditId)?.type === "Quiz" ? "selected" : ""}>Quiz</option>
          </select>
        </div>
        <div class="input-row">
          <label for="examTitle">Title</label>
          <input id="examTitle" name="title" type="text" placeholder="e.g. Midterm English" value="${uiState.examEditId ? existingExams.find((exam) => exam.id === uiState.examEditId)?.title || "" : ""}" required />
        </div>
        <div class="input-row">
          <label for="examDate">Date</label>
          <input id="examDate" name="date" type="date" value="${uiState.examEditId ? existingExams.find((exam) => exam.id === uiState.examEditId)?.date || "" : ""}" required />
        </div>
        <div class="input-row">
          <label for="examDescription">Description</label>
          <textarea id="examDescription" name="description" rows="3" placeholder="Assessment notes...">${uiState.examEditId ? existingExams.find((exam) => exam.id === uiState.examEditId)?.description || "" : ""}</textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="primary-btn">${uiState.examEditId ? "Update" : "Add"} Assessment</button>
          ${uiState.examEditId ? '<button type="button" class="ghost-btn" id="cancelExamEdit">Cancel</button>' : ""}
        </div>
      </form>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Uploaded assessments</h3>
      </div>
      <div class="card-list">
        ${existingExams.length
          ? existingExams
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((exam) => {
                const subjectName = getSubjectName(exam.subjectId, state);
                const relatedResults = state.results.filter((result) => result.examId === exam.id);
                return `
                  <div class="info-card">
                    <div class="title-row">
                      <h4>${exam.title}</h4>
                      <span class="badge ${exam.type === "Quiz" ? "parents" : "teachers"}">${exam.type}</span>
                    </div>
                    <div class="meta-row">
                      <span>${subjectName}</span>
                      <span>${formatDate(exam.date)}</span>
                    </div>
                    <p class="inline-note">${exam.description || "No description available."}</p>
                    <div class="card-actions">
                      <button class="ghost-btn" data-action="edit-exam" data-id="${exam.id}">Edit</button>
                      <button class="danger-btn" data-action="delete-exam" data-id="${exam.id}">Delete</button>
                    </div>
                    <div class="result-form-block">
                      <h4>Student Results</h4>
                      <form class="result-form" data-exam-id="${exam.id}">
                        <div class="input-row">
                          <label>Student Name</label>
                          <input name="studentName" type="text" placeholder="Enter student name" required />
                        </div>
                        <div class="input-row">
                          <label>Score (%)</label>
                          <input name="score" type="number" min="0" max="100" placeholder="0-100" required />
                        </div>
                        <div class="form-actions">
                          <button type="submit" class="secondary-btn">Post Result</button>
                        </div>
                      </form>
                      <div class="card-list">
                        ${relatedResults.length
                          ? relatedResults
                              .map(
                                (result) => `
                                  <div class="info-card">
                                    <div class="title-row">
                                      <h4>${result.studentName}</h4>
                                      <span class="score-badge ${result.score >= 90 ? "excellent" : result.score >= 80 ? "good" : result.score >= 70 ? "average" : "low"}">${result.score}%</span>
                                    </div>
                                    <div class="meta-row">
                                      <span>${result.grade}</span>
                                      <span>${formatDate(result.date)}</span>
                                    </div>
                                    <div class="card-actions">
                                      <button class="danger-btn" data-action="delete-result" data-id="${result.id}">Remove</button>
                                    </div>
                                  </div>
                                `
                              )
                              .join("")
                          : '<div class="empty-state">No student results posted yet.</div>'}
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")
          : '<div class="empty-state">No assessments have been created.</div>'}
      </div>
    </div>
  `;

  document.getElementById("examForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const state = loadState();
    const payload = {
      subjectId: form.subjectId.value,
      type: form.type.value,
      title: form.title.value.trim(),
      date: form.date.value,
      description: form.description.value.trim(),
    };

    if (!payload.subjectId || !payload.title || !payload.date) return;

    if (uiState.examEditId) {
      const item = state.exams.find((exam) => exam.id === uiState.examEditId);
      if (!item) return;
      Object.assign(item, payload);
    } else {
      state.exams.push({ id: `exam-${Date.now()}`, ...payload });
    }

    uiState.examEditId = null;
    saveState(state);
    renderApp();
  });

  const cancelButton = document.getElementById("cancelExamEdit");
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      uiState.examEditId = null;
      renderApp();
    });
  }

  document.querySelectorAll("[data-action='edit-exam']").forEach((button) => {
    button.addEventListener("click", () => {
      uiState.examEditId = button.dataset.id;
      renderApp();
    });
  });

  document.querySelectorAll("[data-action='delete-exam']").forEach((button) => {
    button.addEventListener("click", () => {
      const state = loadState();
      const examId = button.dataset.id;
      state.exams = state.exams.filter((item) => item.id !== examId);
      state.results = state.results.filter((result) => result.examId !== examId);
      saveState(state);
      renderApp();
    });
  });

  document.querySelectorAll(".result-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const state = loadState();
      const examId = event.currentTarget.dataset.examId;
      const studentName = event.currentTarget.studentName.value.trim();
      const score = Number(event.currentTarget.score.value);
      if (!studentName || Number.isNaN(score)) return;
      const exam = state.exams.find((item) => item.id === examId);
      if (!exam) return;
      const result = {
        id: `result-${Date.now()}`,
        subjectId: exam.subjectId,
        examId,
        studentName,
        score: Math.max(0, Math.min(100, score)),
        grade: getGrade(score),
        date: exam.date,
      };
      state.results.push(result);
      saveState(state);
      renderApp();
    });
  });

  document.querySelectorAll("[data-action='delete-result']").forEach((button) => {
    button.addEventListener("click", () => {
      const state = loadState();
      state.results = state.results.filter((result) => result.id !== button.dataset.id);
      saveState(state);
      renderApp();
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderApp();
});

window.addEventListener("storage", () => {
  renderApp();
});

if (typeof window !== "undefined") {
  window.MADRASAT_IBNUHAJAR = { loadState, saveState };
}


