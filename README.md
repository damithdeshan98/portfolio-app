# Portfolio Website — React + Firebase

A personal portfolio with a **public site** and a login-protected **admin panel**, in a
single React (Vite) app. The UI matches the original dark / teal "constellation" design
(Syne · DM Mono · Outfit, custom cursor, animated hero).

- `/` … `/contact` → Public site (read-only, no login)
- `/admin/*` → Admin panel (Firebase Auth login required)

## Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Frontend       | React 18 + Vite + React Router 6         |
| Styling        | Tailwind CSS + ported design-system CSS  |
| Database       | Firebase Firestore                       |
| Auth           | Firebase Authentication (Email/Password) |
| File storage   | Firebase Storage (CV, project/cert images) |
| Hosting / CI   | Firebase Hosting + GitHub Actions        |

The public site ships with **seed content** (`src/data/seed.js`) so it looks complete
before the database is populated. Once Firestore has data, the live data takes over.

---

## 1. Local setup

```bash
npm install
cp .env.example .env   # then fill in your Firebase web config
npm run dev            # http://localhost:5173
```

> The `VITE_` prefix is required by Vite for env vars to reach the browser.
> These are frontend keys and are safe to expose — the real protection is the
> Firestore/Storage **security rules**.

## 2. Firebase project setup

In the [Firebase Console](https://console.firebase.google.com):

1. Create a project.
2. **Authentication → Sign-in method →** enable **Email/Password**.
3. **Authentication → Users →** add your admin user (email + password). This is your login.
4. **Firestore Database →** Create database (Production mode).
5. **Storage →** Get started.
6. **Project Settings →** register a Web app, copy the config into `.env`.

### Seed the database

Log in at `/admin/login`, open the **Dashboard**, and click **Import seed content** to
push the bundled default data into Firestore. After that, edit everything from the admin
panel.

## 3. Firestore data model

- `profile/main` — name, title, about, contact, social links, `cvUrl`, `profileImageUrl`
- `projects` — title, description, techStack[], imageUrl, liveUrl, githubUrl, order
- `experience` — role, company, dates, bullets[], order
- `skills` — name, category (`Core`/`Tools`), level (0–100), icon, order
- `qualifications` — degree, institution, year, description, order
- `certificates` — title, issuer, credentialUrl, imageUrl, order

## 4. Storage layout

```
/cv/cv.pdf                  current CV (overwritten on update)
/projects/{file}            project images
/certificates/{file}        certificate images
/profile/{file}             profile picture
```

## 5. Security rules

`firestore.rules` and `storage.rules` both allow public **read** and authenticated-only
**write** — visitors view everything, only the logged-in admin can edit.

Deploy them with:

```bash
firebase deploy --only firestore,storage
```

## 6. Build & deploy

```bash
npm run build           # outputs to dist/
firebase login
firebase init           # choose Hosting (+ Firestore, Storage for rules)
                        #   public dir: dist
                        #   single-page app: YES   (required for React Router)
firebase deploy
```

Live URL: `https://<your-project>.web.app`

> The `rewrites` rule in `firebase.json` is mandatory — without it, routes like
> `/admin` 404 on refresh.

## 7. CI/CD (GitHub Actions)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

The easiest way to wire it up:

```bash
firebase init hosting:github
```

This connects the repo, creates the workflow, and sets the
`FIREBASE_SERVICE_ACCOUNT` secret automatically.

**Repo secrets to add** (Settings → Secrets and variables → Actions):

- All six `VITE_FIREBASE_*` values (needed at build time).
- `FIREBASE_SERVICE_ACCOUNT` — service-account JSON
  (Firebase Console → Project Settings → Service accounts → Generate new private key).

To also deploy rules from CI, run `firebase deploy --only hosting,firestore,storage`
with the Firebase CLI, or deploy rules manually the few times they change.

---

## Project structure

```
src/
├── firebase/config.js        Firebase init
├── context/
│   ├── AuthContext.jsx       login / logout / currentUser
│   └── DataContext.jsx       loads all collections (seed fallback)
├── components/
│   ├── Navbar, Footer, Loader, ProtectedRoute
│   ├── CustomCursor, Constellation, StatsBand
│   └── sections/             Hero, About, Experience, Projects, Skills, Education, Certificates, Contact
├── layouts/                  PublicLayout, AdminLayout
├── pages/
│   ├── public/               Home + one page per section
│   └── admin/                Login, Dashboard, Manage* CRUD pages
├── services/firestoreService.js   getAll/add/update/remove/uploadFile
├── hooks/                    useReveal, useCollectionManager
└── data/seed.js              bundled default content
```
