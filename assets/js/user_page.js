'use strict';

/**
 * Demo-only in-memory “database”.
 * - Signups are kept here as JSON objects.
 * - Refreshing the page resets everything.
 */
const state = {
  accounts: [
    { id: 1, email: 'renters@gmail.com', password: 'rent123' },
    { id: 2, email: 'admin@gmail.com', password: 'admin123' },
  ],
  currentUser: null,
  rentalRequests: [],
};

// --- Elements
const authHeader = document.getElementById('reg_log-home');
const dashboardHeader = document.getElementById('user_page');

const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const authAlert = document.getElementById('authAlert');

const currentUserEmail = document.getElementById('currentUserEmail');
const logoutBtn = document.getElementById('logoutBtn');

const overlay = document.getElementById('overlay');
const rentModal = document.getElementById('rentModal');
const closeModalBtn = document.getElementById('closeModalBtn');

const selectedModelEl = document.getElementById('selectedModel');
const rentForm = document.getElementById('rentForm');
const rentAlert = document.getElementById('rentAlert');

// --- Utils
function setAlert(el, message, type) {
  el.textContent = message;
  el.classList.remove('hidden', 'error', 'success');
  if (type === 'error') el.classList.add('error');
  if (type === 'success') el.classList.add('success');
}

function hideAlert(el) {
  el.classList.add('hidden');
  el.textContent = '';
  el.classList.remove('error', 'success');
}

function isValidEmail(email) {
  // Simple check (good enough for demo)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function switchTab(target) {
  const isLogin = target === 'login';

  tabLogin.classList.toggle('active', isLogin);
  tabSignup.classList.toggle('active', !isLogin);

  tabLogin.setAttribute('aria-selected', String(isLogin));
  tabSignup.setAttribute('aria-selected', String(!isLogin));

  loginForm.classList.toggle('hidden', !isLogin);
  signupForm.classList.toggle('hidden', isLogin);

  hideAlert(authAlert);
}

function showDashboard() {
  // Show user
  currentUserEmail.textContent = state.currentUser.email;

  // Switch backgrounds / sections
  authHeader.classList.add('hidden');
  dashboardHeader.classList.remove('hidden');

  // Console debug for GitHub reviewers
  console.log('Current user:', state.currentUser);
  console.log('Accounts (demo JSON):', JSON.stringify(state.accounts, null, 2));
}

// --- Tabs
if (tabLogin && tabSignup) {
  tabLogin.addEventListener('click', () => switchTab('login'));
  tabSignup.addEventListener('click', () => switchTab('signup'));
}

// --- Signup
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = String(signupForm.email.value || '').trim().toLowerCase();
    const password = String(signupForm.password.value || '');
    const password2 = String(signupForm.password2.value || '');

    if (!isValidEmail(email)) {
      setAlert(authAlert, 'Please enter a valid email.', 'error');
      return;
    }
    if (password.length < 6) {
      setAlert(authAlert, 'Password must be at least 6 characters.', 'error');
      return;
    }
    if (password !== password2) {
      setAlert(authAlert, 'Passwords do not match.', 'error');
      return;
    }

    const exists = state.accounts.some((a) => a.email === email);
    if (exists) {
      setAlert(authAlert, 'This email is already registered (demo).', 'error');
      return;
    }

    const newAccount = {
      id: state.accounts.length ? Math.max(...state.accounts.map((a) => a.id)) + 1 : 1,
      email,
      password,
    };

    state.accounts.push(newAccount);

    // For “showcase”: print JSON to console
    console.log('New signup:', newAccount);
    console.log('Accounts (demo JSON):', JSON.stringify(state.accounts, null, 2));

    setAlert(authAlert, 'Account created. You can login now (refresh clears it).', 'success');

    // Convenience: switch to login and prefill email
    loginForm.email.value = email;
    loginForm.password.value = '';
    signupForm.reset();
    switchTab('login');
  });
}

// --- Login
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = String(loginForm.email.value || '').trim().toLowerCase();
    const password = String(loginForm.password.value || '');

    const match = state.accounts.find((a) => a.email === email && a.password === password);
    if (!match) {
      setAlert(authAlert, 'Invalid email or password (demo).', 'error');
      return;
    }

    state.currentUser = { id: match.id, email: match.email };
    hideAlert(authAlert);

    showDashboard();
  });
}

// --- Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // simplest for demo: reload (resets in-memory JSON)
    window.location.reload();
  });
}

// --- Modal
let selectedModel = null;

function openModal(modelName) {
  selectedModel = modelName;
  selectedModelEl.textContent = modelName;

  rentModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  hideAlert(rentAlert);

  // basic focus hint
  document.getElementById('rentName')?.focus();
}

function closeModal() {
  rentModal.classList.add('hidden');
  overlay.classList.add('hidden');
  rentForm?.reset();
  selectedModel = null;
  selectedModelEl.textContent = '—';
  hideAlert(rentAlert);
}

document.querySelectorAll('.rentBtn').forEach((btn) => {
  btn.addEventListener('click', () => openModal(btn.dataset.model));
});

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !rentModal.classList.contains('hidden')) closeModal();
});

// --- Rent submit
if (rentForm) {
  rentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!state.currentUser) {
      setAlert(rentAlert, 'You must be logged in (demo).', 'error');
      return;
    }
    if (!selectedModel) {
      setAlert(rentAlert, 'Please select a model.', 'error');
      return;
    }

    const name = String(rentForm.name.value || '').trim();
    const phone = String(rentForm.phone.value || '').trim();
    const address = String(rentForm.address.value || '').trim();
    const note = String(rentForm.note.value || '').trim();

    if (!name || !phone || !address) {
      setAlert(rentAlert, 'Please fill in name, phone, and address.', 'error');
      return;
    }

    const request = {
      userId: state.currentUser.id,
      userEmail: state.currentUser.email,
      model: selectedModel,
      name,
      phone,
      address,
      note,
      createdAt: new Date().toISOString(),
    };

    state.rentalRequests.push(request);

    console.log('Rental request (demo JSON):', JSON.stringify(request, null, 2));

    // UI feedback + redirect
    setAlert(rentAlert, 'Request submitted. Redirecting…', 'success');
    setTimeout(() => {
      window.location.href = 'request-submitted.html';
    }, 550);
  });
}

// Initial debug (useful for GitHub)
console.log('Initial accounts (demo JSON):', JSON.stringify(state.accounts, null, 2));
