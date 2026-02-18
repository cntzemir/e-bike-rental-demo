# E-Bike Rental Demo (Static)

A front-end **e-bike rental demo website** built with **HTML / CSS / Vanilla JavaScript**.  
The project focuses on **clean structure**, **responsive UI**, and a simple but complete **login → dashboard → rent flow**.

> **Scope note (intentional):** Authentication and data are **in-memory only** (a small JS state object).  
> Refreshing the page resets newly created accounts and requests — this is expected for a static demo.

---

## Demo
- ➡️ Live: https://cntzemir.github.io/e-bike-rental-demo/

---

## Screenshots
Project flow (click to enlarge):
1. **Home**
   - ![Home](docs/screenshots/home.png)
2. **Login**
   - ![Login](docs/screenshots/login.png)
3. **Register**
   - ![Register](docs/screenshots/register.png)
4. **Rent Page (Dashboard)**
   - ![Rent Page](docs/screenshots/rent-page.png)
5. **Rent Request (Modal / Confirmation step)**
   - ![Rent Request](docs/screenshots/rent-request.png)
6. **About**
   - ![About](docs/screenshots/about.png)

---

## Key Features

### UI & UX
- Responsive layout (grid/cards) with consistent spacing
- Clear navigation and a simple multi-page flow
- “About” section **scroll-reveal** animation using `IntersectionObserver`

### Auth (Demo)
- Login / Sign up experience
- Users stored in an **in-memory JS state**
- Minimal validation:
  - email format
  - password length
  - confirm password match

### Rental Flow
- Dashboard page with a **Rent modal**
- Submitting a rent request creates a **request object** in memory
- Redirects to a **confirmation page** (`request-submitted.html`)

### Code Quality / Maintenance
- Standardized structure with `assets/` folder
- Removed unused/broken dependencies and fixed broken links
- Clear separation: layout (HTML) / styling (CSS) / behavior (JS)

---

## Demo Credentials
Use the demo account:
- Email: `renters@gmail.com`
- Password: `rent123`

Or create a new account via **Sign up** (resets on refresh).

---

## Tech Stack
- **HTML5**
- **CSS3** (variables, responsive layout)
- **Vanilla JavaScript** (DOM events, state management, `IntersectionObserver`)

---

## Project Structure
```txt
.
├─ index.html
├─ models.html
├─ user_page.html
├─ request-submitted.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ user_page.js
│  │  └─ reveal.js
│  └─ img/
├─ docs/
│  └─ screenshots/
├─ CHANGELOG.md
└─ LICENSE
```
